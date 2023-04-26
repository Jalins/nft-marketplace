import React, { useContext, useState } from 'react'
import Image from "next/image"
import images from "../images"
import { shortAddress } from '../utils/shortAddress'
import { NFTContext } from '@/context/context'
import { CiEdit } from "react-icons/ci"

const Avatar = () => {
    const { currentAccount } = useContext(NFTContext)
    const [showMask, setShowMask] = useState(false)

    
    return (
        <div className="w-full flexCenter flex-col">
            <div className="flexCenter flex-col -mt-20 z-0">
                <div
                    className="relative"
                    onMouseEnter={() => setShowMask(true)}
                    onMouseLeave={() => setShowMask(false)}
                >
                    <div className="flex items-center justify-center w-40 h-40 sm:w-36 sm:h-36 p-2 bg-gray-400 rounded-full shadow-lg">
                        <Image
                            className="rounded-full object-cover w-full h-full"
                            src={images.avatar}
                            alt="creator"
                            width={144}
                            height={144}
                        />
                    </div>

                    {showMask && (
                        <div className="absolute inset-0 bg-black opacity-50 rounded-full flex items-center justify-center">
                            <CiEdit className="w-8 h-8" />
                        </div>
                    )}


                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortAddress(currentAccount)}</p>
            </div>
        </div>
    )
}

export default Avatar