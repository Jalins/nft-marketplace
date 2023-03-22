import { useContext } from 'react';
import { NFTContext } from "../context/context"

// input是一个通用组件
const Input = ({ inputType, title, handleClick, placeholder }) => {
  const { nftCurrency } = useContext(NFTContext)
  return (
    <div className="mt-10 w-full">
      <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{title}</p>
      
      {/* 判断inputType的类型进行选择性渲染界面 */}
      {inputType === 'number' ? (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flex-row flexBetween">
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{nftCurrency}</p>
        </div>
      ) : inputType === 'textarea' ? (
        <textarea
          type="number"
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flex-row flexBetween"
          placeholder={placeholder}
          onChange={handleClick}
          rows={10}
        />
      ) : (
        <input
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}

    </div>
  );
};

export default Input;