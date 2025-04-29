"use client";
import React, { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useContract } from "@/hooks/useContract";

const WalletPage = () => {
  const { walletAddress, balance, errorMessage, connectWallet } = useWallet();
  const { callContractMethod } = useContract();
  const [contractResult, setContractResult] = useState<string | null>(null);

  const handleCallContract = async () => {
    const contractAddress = "0x9d57696C5A0D658eADF1681BCC73a157d6B4fA00";
    const abi = [
      // 合约的 ABI
      {
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [{ "name": "", "type": "string" }],
        "type": "function",
      },
    ];

    try {
      const result = await callContractMethod(contractAddress, abi, "getMessage");
      console.log("🚀 ~ handleCallContract ~ result:", result)
      setContractResult(result);
    } catch (error: any) {
      console.error("Failed to call contract:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wallet Page</h1>
      {walletAddress ? (
        <div>
          <p className="text-green-600">Connected Wallet Address:</p>
          <p className="break-all">{walletAddress}</p>
          {balance && <p className="mt-2 text-blue-600">Balance: {balance} ETH</p>}
          <button
            onClick={handleCallContract}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Call Contract
          </button>
          {contractResult && <p className="mt-4 text-gray-800">Contract Result: {contractResult}</p>}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default WalletPage;