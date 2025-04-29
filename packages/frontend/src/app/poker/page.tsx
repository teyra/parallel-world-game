"use client";
import React, { useState } from "react";

const PokerPage = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "玩家 1", chips: 1000, cards: [] },
    { id: 2, name: "玩家 2", chips: 1000, cards: [] },
  ]); // 多人玩家
  const [communityCards, setCommunityCards] = useState([]); // 公共牌
  const [pot, setPot] = useState(0); // 奖池金额
  const [currentPlayer, setCurrentPlayer] = useState(0); // 当前玩家索引

  const suits = ["♠", "♥", "♣", "♦"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  // 随机生成一张牌
  const getRandomCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, suit };
  };

  // 初始化游戏
  const initializeGame = () => {
    const newPlayers = players.map((player) => ({
      ...player,
      cards: [getRandomCard(), getRandomCard()],
    }));
    setPlayers(newPlayers);
    setCommunityCards([getRandomCard(), getRandomCard(), getRandomCard()]);
    setPot(0);
    setCurrentPlayer(0);
  };

  const handleBet = () => {
    const player = players[currentPlayer];
    if (player.chips >= 100) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].chips -= 100;
      setPlayers(updatedPlayers);
      setPot(pot + 100);
      nextPlayer();
    }
  };

  const handleFold = () => {
    alert(`${players[currentPlayer].name} 弃牌！`);
    nextPlayer();
  };

  const handleCall = () => {
    const player = players[currentPlayer];
    if (player.chips >= 100) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].chips -= 100;
      setPlayers(updatedPlayers);
      setPot(pot + 100);
      nextPlayer();
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const getCardColor = (suit: string) => {
    return suit === "♥" || suit === "♦" ? "text-red-500" : "text-black";
  };

  return (
    <div className="p-4 bg-green-700 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">多人德州扑克</h1>
      <button
        onClick={initializeGame}
        className="mb-6 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 active:scale-95 transition-transform"
      >
        开始新游戏
      </button>

      {/* 公共牌 */}
      <div className="flex gap-4 mb-6">
        {communityCards.map((card, index) => (
          <div
            key={index}
            className="w-24 h-32 flex flex-col items-center justify-center border border-gray-400 rounded bg-white text-3xl shadow-md"
          >
            <span className={`text-lg font-bold ${getCardColor(card.suit)}`}>
              {card.value}
            </span>
            <span className={`text-2xl ${getCardColor(card.suit)}`}>
              {card.suit}
            </span>
          </div>
        ))}
      </div>

      {/* 玩家信息 */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`p-4 rounded-lg shadow-md w-80 ${
              currentPlayer === index ? "bg-blue-500" : "bg-green-900"
            }`}
          >
            <h2 className="text-lg font-bold text-white">{player.name}</h2>
            <p className="text-white">筹码: ${player.chips}</p>
            <div className="flex gap-2 mt-2">
              {player.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="w-16 h-24 flex flex-col items-center justify-center border border-gray-400 rounded bg-white text-2xl shadow-md"
                >
                  <span className={`text-lg font-bold ${getCardColor(card.suit)}`}>
                    {card.value}
                  </span>
                  <span className={`text-xl ${getCardColor(card.suit)}`}>
                    {card.suit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 奖池 */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-lg text-white font-semibold mb-2">奖池</h2>
        <p className="text-2xl text-yellow-400 font-bold">${pot}</p>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          onClick={handleBet}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-transform"
        >
          下注
        </button>
        <button
          onClick={handleCall}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 active:scale-95 transition-transform"
        >
          跟注
        </button>
        <button
          onClick={handleFold}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
        >
          弃牌
        </button>
      </div>
    </div>
  );
};

export default PokerPage;