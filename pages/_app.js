import '@/styles/globals.css'
import { NavBar } from '@/components'
import { Footer } from '@/components';

const  App = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </div> 
)
  


export default App;
