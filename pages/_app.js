import '@/styles/globals.css'
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '@/components';
import { NFTProvider } from "../context/context"

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { configureChains } from "@wagmi/core";

import { createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai} from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'


const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon, polygonMumbai
  ],
  [publicProvider()],
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider attribute='class'>
          <div className='dark:bg-nft-dark bg-white min-h-screen'>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>

          {/* 用于主题的一些图标跟字体 */}
          <Script src="https://kit.fontawesome.com/266ace045b.js" crossOrigin="anonymous" />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </NFTProvider>


)


export default App; 