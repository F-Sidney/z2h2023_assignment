import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

import "hardhat-deploy";
import '@typechain/hardhat'

// import "./tasks"; //After compile, uncomment this line to use the tasks.

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      localhost: 0,
    },
  },  
 // Default network when you don't specify "--network {network_name}"
 defaultNetwork: "hardhat",
 networks: {
   hardhat: {},
   localhost: {
     url: "http://localhost:8545",
   },
   bnbtest: {
     url: process.env.BNBTest_URL,
     chainId: 97,
     gasPrice: 20000000000,
     accounts:
       process.env.BNB_PRIVATE_KEY !== undefined ? [process.env.BNB_PRIVATE_KEY] : [],
     // {
     //  mnemonic: process.env.MNEMONIC,
     //  count: 20,
     //}
   },
 },
 paths: {
   sources: "./contracts",
   tests: "./test",
   cache: "./cache",
   artifacts: "./artifacts",
 },
 mocha: {
   timeout: 20000,
 },
 gasReporter: {
  enabled: true,
  currency: "USD",
  coinmarketcap: process.env.COINMARKETCAP_API_KEY,
},
etherscan: {
  apiKey: process.env.BSCSCAN_API_KEY,
},
};

export default config;
