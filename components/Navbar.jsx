import React,{useEffect, useContext,useState} from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useTheme } from "next-themes"
import { useRouter } from 'next/router';

import images from "../images"
import { Button } from './';
import { NFTContext } from '@/context/context';

import { ConnectButton } from "@rainbow-me/rainbowkit";

const MenuItems = ({isMobile, active, setActive, setIsOpen}) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/listed-nfts';
      case 2:
        return '/my-nfts';
      default: return '/';
    }
   };

    return (
      <ul className={`list-none flex-row flexCenter ${isMobile && 'flex-col h-full'}`}>
        {['Explore NFTs', 'Listed NFTs', 'My NFTS'].map((item, i)=>(
          <li key={i} onClick={()=>{
            setActive(item);
            if (isMobile) {
              setIsOpen(false);
            }
          }} className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
          ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'}
            `}>
            <Link href={generateLink(i)}>{item}</Link>
          </li>
        ))}
      </ul>
    );
};

const ButtonGroup = ({setActive, router, setIsOpen}) => {
   const { connectWallet, currentAccount } = useContext(NFTContext);
   return currentAccount ? (
    <Button 
      btnName="Create" 
      classStyles="mx-2 rounded-xl"  
      handleClick={()=>{
        setActive('');
        setIsOpen(false);
        router.push('/create-nft');
      }}/> 
   ):(
    <Button 
        btnName="Connect" 
        classStyles="mx-2 rounded-xl" 
        handleClick={connectWallet}/>
   )
};

// 使按钮的活动属性与路由绑定
const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') {
        setActive('Explore NFTs');
      }
      break;
    case '/listed-nfts':
      if (active !== 'Listed NFTs') {
        setActive('Listed NFTs');
      }
      break;
    case '/my-nfts':
      if (active !== 'My NFTS') {
        setActive('My NFTS');
      }
      break;
    case '/create-nft':
      setActive('');
      break;
    default:
      setActive('');
      break;
  }
};



const Navbar = () => {
  const {theme, setTheme} = useTheme()
  const router = useRouter()
  const [active, setActive] = useState('Explore NFTs')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);


  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      {/* logo布局 */}
      <div className="flex flex-1 flex-row justify-start">
        {/* 为pc端时的展示 */}
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer">
            <Image src={images.logo} width={32} height={32} alt="Logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">FOX<span className="text-nft-green-violet">MANOR</span></p>
          </div>
        </Link>

        {/* 这里是页面自适应logo的切换 */}
        <Link href="/">
          <div
            className="cursor-pointer hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs');
              setIsOpen(false);
            }}
          ><Image src={images.logo} width={32} height={32} alt="Logo" />
          </div>
        </Link>
      </div>

      {/* 主题切换按钮布局 */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label className="flexBetween w-9 h-5 bg-black rounded-2xl p-1 relative label" htmlFor="checkbox">
            <i className="fas fa-sun w-3 h-3" />
            <i className="fas fa-moon w-3 h-3" />
            <div className="bg-white rounded-full ball w-4 h-4 absolute" />
          </label>
        </div>
      </div>

      {/* 菜单布局 */}
      <div className='md:hidden flex'>
          <MenuItems active={active} setActive={setActive} setIsOpen={setIsOpen} />
          <div className="ml-4">
          <ConnectButton chainStatus="icon" showBalance={false} />
          </div>
      </div>

      {/* 移动设备菜单布局 */}
      <div className="hidden md:flex ml-2">
          {isOpen ?
              (<Image 
                  src={images.close}
                  width={20}
                  height={20}
                  alt="close"
                  onClick={()=>setIsOpen(false)}
                  className={theme === 'light' ? 'filter invert' : ''}
              />)
              : (<Image 
                  src={images.menu}
                  width={25}
                  height={25}
                  alt="menu"
                  onClick={()=>setIsOpen(true)}
                  className={theme === 'light' ? 'filter invert' : ''}
                />
          )}

          {isOpen && (
            <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10  nav-h flex justify-between flex-col">
              <div className="flex-1 p-4">
                <MenuItems active={active} setIsOpen={setIsOpen} setActive= {setActive} isMobile />
              </div>
              <div className="p-4 border-t dark:border-nft-black-1    border-nft-gray-1">
              <ConnectButton chainStatus="icon" showBalance={false} />
              </div>
            </div>
          )}
      </div>
    </nav>
  )
}

export default Navbar