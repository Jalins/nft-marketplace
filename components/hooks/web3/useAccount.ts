import { CryptoHookFactory } from "@_types/hooks"
import useSWR from "swr"


type AccountHookFactory = CryptoHookFactory<string, string>

export type UseAccountHook = ReturnType<AccountHookFactory>


// 包括provider、ethereum、contract（web3State）
// 调用useAccount函数的时候会调用hookFactory，进而调用swr，swr返回，然后hookFactory再返回swr的返回
export const hookFactory: AccountHookFactory = (deps) => (params) => {
    
    const swrResp = useSWR("web3/useAccount", () => {
        return "Test User"
    })

    return swrResp;
}

