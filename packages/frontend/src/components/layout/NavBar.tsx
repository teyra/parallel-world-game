import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const NavBar = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-4 px-8 shadow-md">
      <nav className="flex justify-between items-center">
        <div className="text-lg font-bold">Parallel World</div>
        <div className="flex gap-4">
          <ConnectButton label="connect wallect" />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
