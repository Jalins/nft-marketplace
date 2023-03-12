import '@/styles/globals.css'
import { NavBar } from '@/components'

const  App = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />
  </div> 
)
  


export default App;
