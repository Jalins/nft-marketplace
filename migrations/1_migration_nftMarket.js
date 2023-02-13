
const nftMarket = artifacts.require('nftMarket');

module.exports = function(deployer){
    deployer.deploy(nftMarket);
}