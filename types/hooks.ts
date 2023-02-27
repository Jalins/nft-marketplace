import {Contract, providers} from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { SWRResponse } from "swr";

export type Web3Dependencies = {
    provider: providers.Web3Provider;
    contract: Contract;
    ethereum: MetaMaskInpageProvider;
}

// Partial部分依赖
export type CryptoHookFactory<D = any, P = any> = {
    (d: Partial<Web3Dependencies>): CryptoHandlerHook<D,P>
}

export type CryptoHandlerHook<D = any, P = any> = (params?: P) => CryptoSWRResponse<D>


export type CryptoSWRResponse<D = any> = SWRResponse<D>;

