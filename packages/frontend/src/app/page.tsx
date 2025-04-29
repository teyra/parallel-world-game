"use client";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { formatUnits } from "viem";
import NavBar from "@/components/layout/NavBar";
import Main from "@/components/business/Main";
function App() {
  return (
    <>
      <div className="bg-blue-700 min-h-screen">
        <NavBar />
        <Main />
      </div>
    </>
  );
}

export default App;
