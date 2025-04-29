import { useState } from "react";
import { ethers, formatEther } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 连接钱包
  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setErrorMessage(
        "MetaMask is not installed. Please install it to use this feature."
      );
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("🚀 ~ connectWal ~ signer:", signer)
      const network = await provider.getNetwork();
      console.log("🚀 ~ connectWal ~ network:", network)
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      // 获取余额
      const walletBalance = await provider.getBalance(address);
      setBalance(formatEther(walletBalance)); // 转换为以太单位
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to connect wallet");
    }
  };

  return {
    walletAddress,
    balance,
    errorMessage,
    connectWallet,
  };
};
