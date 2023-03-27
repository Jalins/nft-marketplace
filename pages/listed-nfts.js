import React, { useState, useContext, useEffect } from 'react'
import { NFTContext } from '@/context/context';
import { NFTCard, Loader } from '@/components';

const ListedNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items)=>{
      setNfts(items);
      setIsLoading(false);
    })
  },[]);

  // 加载页面
  if (isLoading) {
    return (
      <div className="flexStart">
        <Loader />
      </div>
    );
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold mt-10">No NFTs listed for sale!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="minmd:w-4/5 w-full">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-10 ml-4 sm:ml-2">NFTs Listed For Sale</h2>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListedNFTs
