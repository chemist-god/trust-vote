import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(" Deploying contracts with account:", deployer.address);

  const balance = await deployer.provider?.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance || 0n), "ETH");

  const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
  const electionFactory = await ElectionFactory.deploy();

  await electionFactory.waitForDeployment();

  console.log("✅ ElectionFactory deployed to:", await electionFactory.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
