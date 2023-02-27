import { useHooks } from "@provider/web3";


export const useAccount = () => {
    const hooks = useHooks();
    const swrResp = hooks.useAccount();

    return {
        account: swrResp
    }
}