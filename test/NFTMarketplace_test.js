const {loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");

const { expect } = require("chai");
// const ethers  = require("ethers");

describe("NFTMarketplace", function () {
  
  async function deployNftMarketFixture() {
   
    const [owner, otherAccount] = await ethers.getSigners();

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    return { nftMarketplace, owner, otherAccount };
  }

  describe("测试", function () {
    it("查询市场上所有nft", async function () {
      const { nftMarketplace, owner } = await loadFixture(deployNftMarketFixture);
      await nftMarketplace.connect(owner).createToken("https://ipfs/u76s...", 25,{value:ethers.utils.parseEther("0.025")})
      const items = await nftMarketplace.connect(owner).fetchMarketItems();
      console.log(items[0].price)
      expect(items[0].price).to.equal(25);
    });

    it("查询市场待售NFT", async function () {
      const { nftMarketplace, owner } = await loadFixture(deployNftMarketFixture);
      await nftMarketplace.connect(owner).createToken("https://ipfs/u76s...", 25,{value:ethers.utils.parseEther("0.025")})
      await nftMarketplace.connect(owner).createToken("https://ipfs/u76s...", 26,{value:ethers.utils.parseEther("0.025")})

      const items = await nftMarketplace.connect(owner).fetchItemsListed();
      console.log(items)
      expect(items[1].price).to.equal(26);
    });

  });
});
