import { ethers } from "hardhat";

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  await myContract.waitForDeployment();
  console.log("MyContract deployed to:", myContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
