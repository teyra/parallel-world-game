import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const { SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [String(SEPOLIA_PRIVATE_KEY)],
      chainId: 11155111,
    },
  },
  solidity: "0.8.28",
};

export default config;
