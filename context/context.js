
import React, { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { create as ipfsHttpClient } from "ipfs-http-client";
import { MarketAddress, MarketAddressABI } from "./abi";

import { getAccount } from '@wagmi/core'

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = ipfsHttpClient({
    host: process.env.NEXT_PUBLIC_IPFS_API_ENDPOINT,
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
})

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setcurrentAccount] = useState()
    const [isLoadingNFT, setIsLoadingNFT] = useState(false);
    const nftCurrency = `${process.env.NEXT_PUBLIC_NFT_CURRENCY}`


    useEffect(() => {
        setcurrentAccount(getAccount().address)
    }, [])

    //上传图片到ipfs
    const uploadToIPFS = async (file) => {
        const subdomain = 'https://fox-nft-marketplace.infura-ipfs.io';
        try {
            const added = await client.add({ content: file });

            const url = `${subdomain}/ipfs/${added.path}`;

            return url;
        } catch (error) {
            console.log(error)
        }
    }

    const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

    //======================================== 创建nft ======================
    // 提交信息到区块链
    const createNFT = async (formInput, fileUrl, router) => {
        // 1.从表单中获取数据
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;

        const data = JSON.stringify({ name, description, image: fileUrl });

        // 2.将nft的metadata存储到ipfs中
        try {
            const added = await client.add(data);
            const subdomain = 'https://fox-nft-marketplace.infura-ipfs.io';
            const url = `${subdomain}/ipfs/${added.path}`;

            // 3.将返回的url以及price存储到区块链上
            await createSale(url, price);

            // 4.跳转页面到首页
            router.push('/')
        } catch (error) {
            console.log(`Error uploading file to ipfs: ${error}`);
        }

    }

    const createSale = async (url, formInputPrice, isReselling, id) => {
        // 这里使用Web3Modal这个组件与用户的钱包进行交互
        const web3modal = new Web3Modal();
        // 连接获得句柄
        const connection = await web3modal.connect();
        // 创建一个provider实例,Web3Provider会自动使用用户选择的钱包提供的节点进行连接
        const provider = new ethers.providers.Web3Provider(connection);
        // 从provider获取签名用户
        const signer = provider.getSigner();
        // 根据当前用户、合约地址、合约abi创建合约对象实例
        const contract = fetchContract(signer)

        // 计算价格
        const price = ethers.utils.parseUnits(formInputPrice, 'ether');
        // 获取nft上币服务的价格
        const listingPrice = await contract.getListingPrice();

        // 组装一笔交易。当用户创建一个nft时，需要向市场合约拥有者发送服务费
        // 这里需判断是第一次上架还是第二次上架销售
        const transaction = !isReselling
            ? await contract.createToken(url, price, { value: listingPrice.toString() })
            : await contract.sellToken(id, price, { value: listingPrice.toString() });

        // 发送交易
        setIsLoadingNFT(true);
        await transaction.wait();

    }

    // ================================= 查询NFT =========================
    // 查询交易所上所有已上架的NFT
    const fetchNFTs = async () => {
        setIsLoadingNFT(false);
        try {
            // 这里使用JsonRpcProvider的原因：业务逻辑是所有人都可以查看交易所上的NFT列表，而不是列出个人的NFT，所以不需要跟钱包进行交互
            const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ACHEMY_NODE_URL + process.env.NEXT_PUBLIC_ACHEMY_KEY);
            const contract = fetchContract(provider);

            // 获取nft列表
            const data = await contract.fetchMarketItems();

            // 将数据列表返回，这里因为数据是异步从区块链上获取，故使用promise来返回；data中的每个数据都包含tokenId, seller,owner,price这数据属性

            const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price }) => {
                console.log("tokenid:", tokenId.toNumber())
                // tokenURI函数继承自ERC721URIStorage合约
                const tokenURI = await contract.tokenURI(tokenId);

                // 从ipfs上将nft的元数据获取，然后对数据进行解构
                const { data: { image, name, description } } = await axios.get(tokenURI)

                const NftPrice = ethers.utils.formatUnits(price.toString(), 'ether');

                return { price: NftPrice, description: description, image: image, name: name, tokenId: tokenId.toNumber(), seller: seller, owner: owner, tokenURI: tokenURI }
            }));
            return items;
        } catch (error) {
            console.log(`get market items failed: ${error}`)
        }
    }

    // 获取个人NFT或者当前待售的NFT
    const fetchMyNFTsOrListedNFTs = async (type) => {
        setIsLoadingNFT(false);
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            const contract = fetchContract(signer);

            const data = type === "fetchItemsListed" ? await contract.fetchItemsListed() : await contract.fetchMyNFTs()

            const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price }) => {
                // tokenURI函数继承自ERC721URIStorage合约
                const tokenURI = await contract.tokenURI(tokenId);

                // 从ipfs上将nft的元数据获取，然后对数据进行解构
                const { data: { image, name, description } } = await axios.get(tokenURI)

                const NftPrice = ethers.utils.formatUnits(price.toString(), 'ether');

                return { price: NftPrice, description: description, image: image, name: name, tokenId: tokenId.toNumber(), seller: seller, owner: owner, tokenURI: tokenURI }
            }));

            return items;
        } catch (error) {
            console.log(`get market list items failed: ${error}`)
        }
    }

    // ================================= 购买NFT ======================
    const buyNFT = async (nft) => {
       
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const price = ethers.utils.parseUnits(nft.price.toString(),'ether');
        try {    
            const transaction = await contract.purchase(nft.tokenId, { value: price });
            setIsLoadingNFT(true);
            await transaction.wait();
            setIsLoadingNFT(false);
        } catch (error) {
            console.log("buy nft failed:", error)
            return
        }
    }
    return (
        <NFTContext.Provider value={{ nftCurrency, currentAccount, uploadToIPFS, createNFT, fetchNFTs, fetchMyNFTsOrListedNFTs, buyNFT, createSale, isLoadingNFT }}>
            {children}
        </NFTContext.Provider>
    )
}
