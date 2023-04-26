import React, { useContext, useEffect, useState } from 'react'


import { NFTCard, Loader, SearchBar, Avatar } from '@/components'

import { NFTContext } from '@/context/context'
const MyNFTs = () => {
    const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext);
    const [nfts, setNfts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // 创建nft列表副本，防止数据干扰
    const [nftsCopy, setNftsCopy] = useState([]);
    const [activeSelect, setActiveSelect] = useState('Recently Added');


    useEffect(() => {
        fetchMyNFTsOrListedNFTs('none').then((items) => {
            if (items === undefined) {
                setNfts([]);
                setIsLoading(false);
            } else {
                setNfts(items);
                setIsLoading(false);
                setNftsCopy(items);
            }
        })
    }, [])

    // 对nft进行按照需求进行排序
    useEffect(() => {
        const sortedNfts = [...nfts];

        switch (activeSelect) {
            case 'Price (low to high)':
                setNfts(sortedNfts.sort((a, b) => a.price - b.price));
                break;
            case 'Price (high to low)':
                setNfts(sortedNfts.sort((a, b) => b.price - a.price));
                break;
            case 'Recently added':
                setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
                break;
            default:
                setNfts(nfts);
                break;
        }
    }, [activeSelect]);

    // 点击搜索时过滤匹配数据
    const onHandleSearch = (value) => {
        const filteredNFTs = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

        if (filteredNFTs.length) {
            setNfts(filteredNFTs);
        } else {
            setNfts(nftsCopy);
        }
    };

    // 恢复原来的nft列表数据
    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };

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
            
            <Avatar/>

            {!isLoading && !nfts.length && !nftsCopy.length
                ? (
                    <div className="flexCenter sm:p-4 p-16">
                        <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">You don&apos;t own any NFTS</h1>
                    </div>
                )
                : (
                    <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                        <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                            <SearchBar
                                activeSelect={activeSelect}
                                setActiveSelect={setActiveSelect}
                                handleSearch={onHandleSearch}
                                clearSearch={onClearSearch}
                            />
                        </div>
                        <div className="mt-3 w-full flex flex-wrap">
                            {nfts.map((nft) => <NFTCard onProfilePage key={nft.tokenId} nft={nft} />)}
                        </div>
                    </div>
                )}


        </div>
    )
}

export default MyNFTs