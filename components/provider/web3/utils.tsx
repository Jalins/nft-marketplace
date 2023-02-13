import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";

declare global {
    interface Window{
        ethereum: MetaMaskInpageProvider;
    }
}

export type Web3Params = {
    ethereum: MetaMaskInpageProvider | null;
    provider: providers.Web3Provider | null;
    contract: Contract | null;
}


export type Web3State = {
    isLoading: boolean;
} & Web3Params               // 这种写法是在Web3Params机构体中添加isLoading属性，机构体继承

export const createDefaultState = () => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
    }
};