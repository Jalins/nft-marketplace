require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const NEXT_PUBLIC_ACHEMY_KEY=process.env.NEXT_PUBLIC_ACHEMY_KEY;
const ACCOUNT_PRIVATE_KEY=process.env.ACCOUNT_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    bnb:{
       url: `https://bsc-testnet.nodereal.io/v1/${NEXT_PUBLIC_ACHEMY_KEY}`,
       accounts:[ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey:process.env.APIKEY
  }
};
