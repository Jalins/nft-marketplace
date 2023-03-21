import React from 'react'
import Image from 'next/image'
import images from '@/images'
import { Button } from './'


const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 py-2">

       <div className="flex flex-col items-center justify-center w-full   flex-1 px-10 text-center">
          <div className="rounded-lg shadow-md p-10 max-w-screen-lg mx-auto">
            <div className="flex flex-row sm:flex-col justify-between   items-center">
              <div className="w-1/2 text-left">
                <h1 className="text-5xl sm:text-2xl font-bold text-left">Discover Collect And </h1>
                <h1 style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className=" text-5xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 text-left mt-">Sell Rare NFTs</h1>
                <p className="text-left mt-10 text-lg sm:text-sm">Let's start to explore One of the largest NFT marketplace and find the extraordinary NFT collection</p>
                <Button btnName="Create" classStyles="mt-8 mx-2 rounded-xl md:py-1 md:px-3"/>
              </div>
              <div>
                <Image 
                    src={images.banner1}
                    width={500}
                    height={500}
                    alt="banner"
                />
              </div>
            </div>
           </div>
        </div>

    </div>
  )
}

export default Banner