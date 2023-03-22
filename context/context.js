
import React, { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children}) =>{
    const [currentAccout, setCurrentAccout] = useState()

    const nftCurrency = `${process.env.NEXT_PUBLIC_NFT_CURRENCY}`

    // 检查钱包是否已连接
    const checkWalletIsConnected = async () =>{
        if (!window.ethereum) return alert("Please install wallet")
        
        const accounts = await window.ethereum.request({method:'eth_accounts'})
        
        if (accounts.length){
            setCurrentAccout(accounts[0]); 
        }else{
            console.log("No account available ");
        }
    }

    useEffect(()=>{
        checkWalletIsConnected();
    },[])

    // 钱包主动连接函数，用户点击navbar的connect按钮后会先获取到当前的钱包用户地址，并reload页面，将地址传递给navbar页面
    const connectWallet = async () =>{
        if (!window.ethereum) return alert("Please install wallet")
        
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        setCurrentAccout(accounts[0]);
        console.log(accounts[0])

        window.location.reload();
    }
    return (
        <NFTContext.Provider value={{nftCurrency, connectWallet, currentAccout}}>
            {children}
        </NFTContext.Provider>
    )
}
