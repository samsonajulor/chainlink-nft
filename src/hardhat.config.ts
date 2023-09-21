import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { private_key_1, private_key_2, private_key_3, sepoliarpc, etherscan_api_key } from '../secrets.json';

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  networks: {
    sepolia: {
      url: sepoliarpc,
      accounts: [private_key_1, private_key_2, private_key_3],
    },
    hardhat: {
      forking: {
        url: sepoliarpc,
      },
    },
  },
  etherscan: {
    apiKey: {
      sepolia: etherscan_api_key,
      goerli: etherscan_api_key,
    },
  },
};

export default config;
