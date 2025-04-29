import React, { useEffect, useState } from "react";
import CardGame from "./Card";
import { Button } from "../ui/button";
import { useSignMessage, useAccount, useDisconnect } from "wagmi";
import { loginAPI } from "@/api";

const Main = () => {
  const [isSign, setIsSign] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (!isConnected) {
      console.log("Wallet is not connected");
      localStorage.removeItem("access_token");
      setIsSign(false);
    }
  }, [isConnected]);
  const handleSign = async () => {
    const signature = await signMessageAsync({
      message: "Parallel World Game",
    });
    const data: any = await loginAPI({
      username: address,
      password: signature,
    });
    const access_token = data.access_token;
    console.log("🚀 ~ login ~ access_token:", access_token);
    access_token && localStorage.setItem("access_token", access_token);
    setIsSign(true);
  };
  if (isSign) {
    return <CardGame />;
  }

  return (
    <>
      {isConnected && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Button onClick={handleSign}>sign with your wallet</Button>
        </div>
      )}
    </>
  );
};

export default Main;
