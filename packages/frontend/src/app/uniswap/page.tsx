"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { useReadContract } from "wagmi";
import { parseUnits } from "viem";

const UniswapPage = () => {
  const [tokenIn, setTokenIn] = useState(""); // 输入代币地址
  const [tokenOut, setTokenOut] = useState(""); // 输出代币地址
  const [amountIn, setAmountIn] = useState(""); // 输入代币数量
  const [recipient, setRecipient] = useState(""); // 接收地址
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // 交易哈希
  const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 SwapRouter 地址
  const routerABI = [
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "tokenIn", type: "address" },
            { internalType: "address", name: "tokenOut", type: "address" },
            { internalType: "uint24", name: "fee", type: "uint24" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint256", name: "amountIn", type: "uint256" },
            {
              internalType: "uint256",
              name: "amountOutMinimum",
              type: "uint256",
            },
            {
              internalType: "uint160",
              name: "sqrtPriceLimitX96",
              type: "uint160",
            },
          ],
          internalType: "struct ISwapRouter.ExactInputSingleParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "exactInputSingle",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
  ];
  const params = {
    tokenIn: tokenIn, // 输入代币地址
    tokenOut: tokenOut, // 输出代币地址
    fee: 3000, // 池子的手续费等级（0.3%）
    recipient, // 接收地址
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 交易截止时间（10分钟后）
    amountIn: parseUnits(amountIn, 18), // 输入代币数量（假设代币有 18 位小数）
    amountOutMinimum: 0, // 最小输出数量（设置为 0 表示不限制）
    sqrtPriceLimitX96: 0, // 价格限制（设置为 0 表示不限制）
  };

  const result = useReadContract({
    abi: routerABI,
    address: routerAddress,
    functionName: "exactInputSingle",
    args: [params],
  });
  console.log("🚀 ~ UniswapPage ~ result:", result);

  const handleSwap = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const routerContract = new ethers.Contract(
        routerAddress,
        routerABI,
        signer
      );

      const params = {
        tokenIn: tokenIn, // 输入代币地址
        tokenOut: tokenOut, // 输出代币地址
        fee: 3000, // 池子的手续费等级（0.3%）
        recipient: recipient || (await signer.getAddress()), // 接收地址
        deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 交易截止时间（10分钟后）
        amountIn: ethers.parseUnits(amountIn, 18), // 输入代币数量（假设代币有 18 位小数）
        amountOutMinimum: 0, // 最小输出数量（设置为 0 表示不限制）
        sqrtPriceLimitX96: 0, // 价格限制（设置为 0 表示不限制）
      };

      const tx = await routerContract.exactInputSingle(params, {
        value: ethers.parseUnits(amountIn, 18), // 如果输入代币是 ETH，需要传递 value
      });

      setTransactionHash(tx.hash); // 设置交易哈希
      await tx.wait(); // 等待交易完成
      alert("Swap successful!");
    } catch (error: any) {
      console.error("Swap failed:", error);
      alert("Swap failed: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Uniswap V3 Swap</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Token In Address"
          value={tokenIn}
          onChange={(e) => setTokenIn(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Token Out Address"
          value={tokenOut}
          onChange={(e) => setTokenOut(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Amount In"
          value={amountIn}
          onChange={(e) => setAmountIn(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Recipient Address (optional)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="p-2 border rounded"
        />
        <Button onClick={handleSwap}>Swap</Button>
        {transactionHash && (
          <p className="text-green-600">
            Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {transactionHash}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UniswapPage;
