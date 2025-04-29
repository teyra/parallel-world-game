import { ethers } from "ethers";

export const useContract = () => {
  const callContractMethod = async (
    contractAddress: string,
    abi: any,
    methodName: string,
    args: any[] = []
  ): Promise<any> => {
    if (typeof window.ethereum === "undefined") {
      throw new Error(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      return await contract[methodName](...args); // 调用合约方法
    } catch (error: any) {
      throw new Error(error.message || "Failed to call contract method");
    }
  };

  return {
    callContractMethod,
  };
};
