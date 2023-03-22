// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// openzeppenlin
import  "@openzeppelin/contracts/utils/Counters.sol";
import  "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import  "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import  "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage{
    // 使用Counters库合约
    using Counters for Counters.Counter;

    // 定义tokenID
    Counters.Counter private _tokenids;
    // 定义市场nft数量
    Counters.Counter private _itemsSold;

    // 定义当前合约拥有者
    address payable owner;

    // 上币服务价
    uint256 listingPrice = 0.025 ether;

    // 定义市场上所有nft的映射
    mapping(uint256 => MarketItem) private idMarketItem;

    // 定义每个nft属性
    struct MarketItem{
        uint256 tokenId;
        address payable seller; // 卖家
        address payable owner;  // 平台方
        uint256 price;
        bool sold;
    }

    // 修饰符
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner of the marketplace can change the listing price!");
        _;
    }
    //事件
    event MarketItemEvent(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold

    );


    // 构造函数，初始化一个NMT的token，并将owner设为当前合约部署者
    constructor() ERC721("NFT Metaverse Token", "NMT"){
        owner == payable(msg.sender);
    }

    // 更改nft上市服务价
    function updateListingPrice(uint256 _listingPrice) 
        public
        payable
        onlyOwner
    {
        require(owner==msg.sender, "Only marketplace owners can update the listing price");
        listingPrice = _listingPrice;
    }

    // 获取上币服务价供外部查询
    function getCoinServicePrice() external view returns(uint256){
        return listingPrice;
    }

    // 创建NFT Token
    function createToken(string memory _tokenURI, uint256 price) public payable returns(uint256) {
        // 检查token uri
        require(bytes(_tokenURI).length > 0,"The _tokenUrl must be have");
        // tokenid安全自增
        _tokenids.increment();
        // 获取当前的tokenid
        uint256 newTokenId = _tokenids.current();
        // 创建新的nft
        _mint(msg.sender, newTokenId);
        // 设置token URI
        _setTokenURI(newTokenId, _tokenURI);

        // 在mapping中新增item映射
        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private{
        //判断满足条件
        require(price > 0, "price must be al lest 1");
        require(msg.value == listingPrice, "price must be equal to coinServicePrice");

        // 将创建的nft记录到marketplace上
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        // 这一步是真正将所有权交给marketplace合约
        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemEvent(tokenId, msg.sender, address(this), price, false);
    
    }

    // 当前拥有者将nft进行二次售卖
    function sellToken(uint tokenId, uint price) public payable {
        // 检查条件
        require(idMarketItem[tokenId].owner == msg.sender, "only owner of item can perform this operation");

        require(msg.value == listingPrice, "Price must be equal to listing price");

        // 变更信息
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        // 转移
        _transfer(msg.sender, address(this), tokenId);

        // 发出事件
        emit MarketItemEvent(tokenId, msg.sender, address(this), price, false);
    }

    function purchase(uint tokenId) public payable{
        // 检查条件
        uint price = idMarketItem[tokenId].price;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        // 变更信息
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        // 购买者需要付给marketplace服务费
        payable(owner).transfer(listingPrice);

        // 按约定的价格付给售卖者
        payable(idMarketItem[tokenId].seller).transfer(msg.value);

        emit MarketItemEvent(tokenId, msg.sender, address(this), price, false);

    }

    // 获取当前市场上未出售的nft
    function queryMarketItems() public view returns (MarketItem[] memory){
        uint itemCount = _tokenids.current();
        uint unsoldItemCount = itemCount - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < unsoldItemCount; i++){
            if (idMarketItem[i + 1].owner == address(this)){
                items[i+1] = idMarketItem[i+1];
                currentIndex += 1;
            }   
        }
        return items;

    }

    // 获取当前账户的所有nft（不包括在售的nft）
     function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenids.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }
        return items;
    }

    // 获取当前账户所有在市场上出售的nft
     function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenids.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // 获取数组的长度，这里也可以采用动态数组，可以不需要获取这个数值，但是动态数组的缺点就是比较耗空间与性能
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }
        return items;
    }

}