// import React from "react";
import type { NextPage } from "next";
import { SwapWidget } from "@uniswap/widgets";
// import { darkTheme } from "@uniswap/widgets";
// import "@uniswap/widgets/dist/fonts.css";
const widgets: NextPage = () => {
  const jsonRpcUrl = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"; // 替换为你的 Infura 项目 ID
  const chainId = 1; // 主网 Chain ID
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Uniswap Widgets</h1>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <SwapWidget />
      </div>
    </div>
  );
};

export default widgets;
