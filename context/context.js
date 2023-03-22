
import React, { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { create as ipfsHttpClient } from "ipfs-http-client";
import { MarketAddress, MarketAddressABI } from "./abi";

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
    const [currentAccout, setCurrentAccout] = useState()

    const nftCurrency = `${process.env.NEXT_PUBLIC_NFT_CURRENCY}`

    // 检查钱包是否已连接
    const checkWalletIsConnected = async () => {
        if (!window.ethereum) return alert("Please install wallet")

        const accounts = await window.ethereum.request({ method: 'eth_accounts' })

        if (accounts.length) {
            setCurrentAccout(accounts[0]);
        } else {
            console.log("No account available ");
        }
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    // 钱包主动连接函数，用户点击navbar的connect按钮后会先获取到当前的钱包用户地址，并reload页面，将地址传递给navbar页面
    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install wallet")

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccout(accounts[0]);
        console.log(accounts[0])

        window.location.reload();
    }

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

    const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress,MarketAddressABI,signerOrProvider);

    // 提交信息到区块链
    const createNFT = async (formInput, fileUrl, router) =>{
        // 1.从表单中获取数据
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;

        const data = JSON.stringify({name, description, image:fileUrl});

        // 2.将nft的metadata存储到ipfs中
        try {
            const added  = await client.add(data);
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

    const createSale = async (url, formInputPrice) => {
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
        const transaction = await contract.createToken(url, price, {value: listingPrice.toString()});

        // 发送交易
        await transaction.wait();


    }
    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccout, uploadToIPFS,createNFT }}>
            {children}
        </NFTContext.Provider>
    )
}
