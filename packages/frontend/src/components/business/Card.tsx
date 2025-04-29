"use client";
import { sendPlayResultAPI } from "@/api";
import React, { useState } from "react";
import { parseAbi } from "viem";
import { useAccount, useWriteContract } from "wagmi";

const CardGame = () => {
  interface CardItem {
    value: string;
    suit: string;
    points: number;
  }
  const [cards, setCards] = useState<CardItem[]>([]); // 抽到的卡片
  const [remainingChances, setRemainingChances] = useState(5); // 剩余抽卡次数
  const [totalPoints, setTotalPoints] = useState(0); // 总点数
  const { data: hash, writeContract } = useWriteContract();
  const { address } = useAccount();

  const suits = ["♠", "♥", "♣", "♦"];
  const values = [
    { value: "A", points: 1 },
    { value: "2", points: 2 },
    { value: "3", points: 3 },
    { value: "4", points: 4 },
    { value: "5", points: 5 },
    { value: "6", points: 6 },
    { value: "7", points: 7 },
    { value: "8", points: 8 },
    { value: "9", points: 9 },
    { value: "10", points: 10 },
    { value: "J", points: 11 },
    { value: "Q", points: 12 },
    { value: "K", points: 13 },
  ];

  // 随机生成一张卡片
  const getRandomCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const card = values[Math.floor(Math.random() * values.length)];
    return { ...card, suit };
  };

  // 抽卡逻辑
  const handleDrawCard = async () => {
    if (remainingChances > 0) {
      const newCard = getRandomCard();
      setCards((prevCards) => [...prevCards, newCard]);
      setRemainingChances((prev) => prev - 1);
      setTotalPoints((prevPoints) => prevPoints + newCard.points);
    } else {
      await sendPlayResultAPI({
        score: totalPoints,
      });
      alert("没有剩余抽卡次数了！");
    }
  };

  // 获取 NFT 的逻辑
  const handleGetNFT = async () => {
    try {
      // 模拟调用获取 NFT 的 API
      alert("正在获取 NFT...");
      // 假设这里调用了一个 API
      await getNFTAPI();
      alert("NFT 获取成功！");
    } catch (error) {
      console.error("获取 NFT 失败", error);
      alert("获取 NFT 失败，请稍后重试！");
    }
  };

  const getNFTAPI = async () => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADRRESS;
    const contractABI = parseAbi([
      "function sendRequest(string[] memory args, address player) external returns (bytes32 requestId)",
    ]);
    // 准备调用合约
    if (!address) {
      throw new Error("Address is undefined. Please connect your wallet.");
    }
    const res = await writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "sendRequest",
      args: [[address], address],
    });
    console.log("🚀 ~ getNFTAPI ~ res:", res);
    console.log("🚀 ~ getNFTAPI ~ hash:", hash);
  };

  // 重置游戏
  const resetGame = () => {
    setCards([]);
    setRemainingChances(5);
    setTotalPoints(0);
  };

  const getCardColor = (suit: string) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-black";
  };

  return (
    <div className="p-4  flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">抽卡游戏</h1>
      <p className="text-lg text-white mb-4">
        剩余抽卡次数: {remainingChances}
      </p>
      <p className="text-lg text-white mb-4">总点数: {totalPoints}</p>
      <button
        onClick={handleDrawCard}
        className="mb-6 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 active:scale-95 transition-transform"
      >
        抽卡
      </button>
      <button
        onClick={resetGame}
        className="mb-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
      >
        重置游戏
      </button>

      <button
        onClick={handleGetNFT}
        className="mb-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 active:scale-95 transition-transform"
      >
        获取 NFT
      </button>
      {/* 抽到的卡片展示 */}
      <div className="flex flex-wrap gap-4">
        {cards.map((card: CardItem, index: number) => (
          <div
            key={index}
            className="w-24 h-36 flex flex-col items-center justify-between border border-gray-400 rounded bg-white text-3xl shadow-md p-2"
          >
            <span className={`text-lg font-bold ${getCardColor(card.suit)}`}>
              {card.value}
            </span>
            <span className={`text-2xl ${getCardColor(card.suit)}`}>
              {card.suit}
            </span>
            <span className={`text-lg font-bold ${getCardColor(card.suit)}`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGame;
