import { useEffect, useState, useRef, useContext } from 'react';
import { Banner, CreatorCard, NFTCard, Loader, SearchBar } from '@/components'
import Image from 'next/image';
import { useTheme } from 'next-themes';
import images from '../images';
import { NFTContext } from '@/context/context';
import { getTopCreators } from '@/utils/getTopCreator';
import { shortAddress } from '@/utils/shortAddress';


const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [nftsCopy, setNftsCopy] = useState([]);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setIsLoading(false);
      setNftsCopy(items);
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

  // 处理nft创建者滑表列
  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else { current.scrollLeft += scrollAmount; }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });


  const topCreators = getTopCreators(nftsCopy)
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner />

        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Top Sellers</h1>
          <div
            className="max-w-full relative flex-1 mt-3 flex"
            ref={parentRef}
          >
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {topCreators.map((creator, i) => (
                <CreatorCard
                  key={creator.seller}
                  rank={i + 1}
                  creatorImage={images[`creator${i + 1}`]}
                  creatorName={shortAddress(creator.seller)}
                  creatorEths={creator.sum}
                />
              ))}
              {!hideButtons && (
                <>
                  <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                    <Image
                      src={images.left}
                      alt="left-arrow"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                  <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                    <Image
                      src={images.right}
                      alt="left-arrow"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-0 xs:ml-0 sm:mb-4">Hot NFTs</h1>
            <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
              <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch} />
            </div>
          </div>
          {isLoading ? (
            <div className="flexStart">
              <Loader />
            </div>
          ) : (
            <div className="mt-3  flex flex-wrap justify-start   md:justify-center">
              {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default Home