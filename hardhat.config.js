require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const ACHEMY_KEY=process.env.ACHEMY_KEY;
const ACCOUNT_PRIVATE_KEY=process.env.ACCOUNT_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    Mumbai:{
       url: `https://polygon-mumbai.g.alchemy.com/v2/${ACHEMY_KEY}`,
       accounts:[ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey:process.env.APIKEY
  }
};
