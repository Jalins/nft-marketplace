import '@/styles/globals.css'
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '@/components';
import { NFTProvider } from "../context/context"

const App = ({ Component, pageProps }) => (
  <NFTProvider>
     <ThemeProvider attribute='class'>
      <div className='dark:bg-nft-dark bg-white min-h-screen'>
        <Navbar />
          <Component {...pageProps} />
        <Footer />
      </div>
 
      {/* 用于主题的一些图标跟字体 */}
      <Script src="https://kit.fontawesome.com/266ace045b.js"    crossOrigin="anonymous" />
     </ThemeProvider>
  </NFTProvider>
  
  
) 
  

export default App; 