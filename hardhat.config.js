require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {

  defaultNetwork: "hardhat",

  networks: {

    localhost: {
      url: "http://127.0.0.1:8545"
    },

    hardhat: {
      chainId: 1337
    },

    polygon_mumbai: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }

  },

  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  paths: {
    sources: "./dapp/contracts",
    tests: "./dapp/test",
    cache: "./dapp/cache",
    artifacts: "./dapp/artifacts"
    //scripts/...
  },

  mocha: {
    timeout: 40000
  }

};
