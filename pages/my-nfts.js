import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image"
import images from "../images"
import { shortAddress } from '../utils/shortAddress'
import { NFTCard, Loader } from '@/components'

import { NFTContext } from '@/context/context'
const MyNFTs = () => {
    const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
    const [nfts, setNfts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        fetchMyNFTsOrListedNFTs('none').then((items) => {
            setNfts(items);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <div className="flexStart">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full flex justify-start items-center flex-col">
            <div className='relative w-full flex items-center overflow-hidden z-0 nft-gradient justify-center h-80'>
                <p className={`font-bold text-white text-5xl font-poppins leading-70 text-center`}>Your NFTS</p>
                <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full white-bg -top-9 -left-16 -z-5" />
                <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full white-bg -top-9 -right-16 -z-5" />
                <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5" />
                <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5" />

            </div>
            <div className="w-full flexCenter flex-col">
                <div className="flexCenter flex-col -mt-20 z-0">
                    <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-2 bg-nft-black-2 rounded-full">
                        <Image
                            className="rounded-full object-cover"
                            src={images.creator2}
                        />

                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortAddress(currentAccount)}</p>
                </div>
            </div>

            {!isLoading && !nfts.length
                ? (
                    <div className="flexCenter sm:p-4 p-16">
                        <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">You don&apos;t own any NFTS</h1>
                    </div>
                )
                : (
                    <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                        <div className="mt-3 w-full flex flex-wrap">
                            {nfts.map((nft) => <NFTCard onProfilePage key={nft.tokenId} nft={nft}/>)}
                        </div>
                    </div>
                )}

            
        </div>
    )
}

export default MyNFTs