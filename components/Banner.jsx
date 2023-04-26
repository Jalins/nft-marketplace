import React, {useContext} from 'react'
import Image from 'next/image'
import images from '@/images'
import { useRouter } from 'next/router';
import { NFTContext } from '@/context/context'



const Banner = () => {
  const { currentAccount } = useContext(NFTContext);
  const router = useRouter()
  return (
    <div className="relative w-full flex items-center overflow-hidden z-0 shadow-md justify-start mb-7 mt-10 p-12 xs:p-4 xs:h-44 rounded-3xl">

      <div className="flex flex-col items-center justify-center w-full   flex-1  text-center">
        <div className="rounded-lg  max-w-screen-lg mx-auto">
          <div className="flex flex-row sm:flex-col justify-between   items-center">
            <div className='mb-4'>
              <Image
                src={images.banner1}
                width={500}
                height={500}
                alt="banner"
              />
            </div>

            <div className="text-left w-1/2">
              <h1 className="text-5xl sm:text-2xl font-bold">Discover Collect And </h1>
              <h1 style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className=" text-5xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 ">Sell Rare NFTs</h1>
              <p className=" mt-10 text-lg sm:text-sm mr-10">Let's start to explore One of the largest NFT marketplace and find the extraordinary NFT collection</p>


              {currentAccount ? (
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 mt-8 mx-2 md:py-1 md:px-3"
                onClick={() => {
                  router.push('/create-nft');
                }}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Create NFT
                </span>
              </button>
              ):(
                <></>
              )}
              {/* <Button 
                    btnName="Create" 
                    classStyles="mt-8 mx-2 rounded-xl md:py-1 md:px-3"
                    handleClick={()=>{
                        setActive('');
                        setIsOpen(false);
                        router.push('/create-nft');
                      }}
                /> */}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Banner