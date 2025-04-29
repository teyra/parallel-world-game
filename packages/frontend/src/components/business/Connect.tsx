'use client";';
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSignMessage,
  injected,
  useReadContract,
} from "wagmi";
import { formatUnits, getAddress } from "viem";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { MailOpen } from "lucide-react";
import { loginAPI } from "@/api";

const Connect = () => {
  const account = useAccount();
  console.log("🚀 ~ Connect ~ account:", account);

  const { signMessageAsync } = useSignMessage();
  const login = async () => {};
  useEffect(() => {
    if (account.isConnected) {
      // handleSign();
    }
  }, [account.isConnected]);

  const handleSign = async () => {
    const signature = await signMessageAsync({
      message: "Hello, this is a test message!",
    });
    const data: any = await loginAPI({
      username: account.address,
      password: account.address,
    });
    const access_token = data.access_token;
    console.log("🚀 ~ login ~ access_token:", access_token);
    access_token && localStorage.setItem("access_token", access_token);
  };
  const { connectors, connect, status, error } = useConnect();
  console.log("🚀 ~ Connect ~ connectors:", connectors);
  const { disconnect } = useDisconnect();

  const address = account.address && getAddress(account.address);
  const shortAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  const { data } = useBalance({
    address: account.address,
  });

  const balanceData =
    data?.value !== undefined && data?.decimals !== undefined
      ? formatUnits(data?.value, data?.decimals) + "         " + data?.symbol
      : "";
  console.log("🚀 ~ App ~ balanceData:", balanceData);

  const CONTRACT_ADDRESS = "0x8117138A449f7f3F006e1152175420c9071e9176";
  const contractABI = [
    // 合约的 ABI
    {
      inputs: [],
      name: "getMessage",
      stateMutability: "view",
      outputs: [{ type: "string" }],
      type: "function",
    },
  ] as const;
  const result = useReadContract({
    abi: contractABI,
    address: CONTRACT_ADDRESS,
    functionName: "getMessage",
  });
  console.log("🚀 ~ Connect ~ result:", result);
  return (
    <div className="flex  items-center justify-between">
      <div className="flex flex-col items-start mr-10">
        <span className="font-size-1">{balanceData}</span>
        <h3>{account.chain?.name}</h3>
      </div>
      <Button onClick={handleSign}>sign with your wallet</Button>
      <HoverCard>
        <HoverCardTrigger>
          <Button
            onClick={() =>
              !account.isConnected && connect({ connector: injected() })
            }
            className="cursor-pointer"
          >
            <MailOpen />
            {account.isConnected ? shortAddress : "Connect Wallect"}
          </Button>
        </HoverCardTrigger>
        {account.isConnected && (
          <HoverCardContent>
            <div className="bg-white p-4 rounded shadow-md">
              <Button
                variant="link"
                onClick={() => disconnect()}
                className="cursor-pointer"
              >
                {account.isConnected && "disConnect"}
              </Button>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

export default Connect;
