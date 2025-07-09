import { ethers } from 'ethers';
import ElectionFactoryAbi from '../../../smart-contracts/artifacts/contracts/ElectionFactory.sol/ElectionFactory.json';
import addresses from '../../../smart-contracts/deployed-addresses.json';
import dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545'); // Hardhat local
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider); // Use one of Hardhat's private keys

// Contract instance
const electionFactory = new ethers.Contract(
  addresses.localhost.ElectionFactory,
  ElectionFactoryAbi.abi,
  wallet
);

export { provider, wallet, electionFactory };

//SO For my phase 1, I made use of the local Hardhat network for development and testing.
// In production, I will switch to a real network like Goerli or Sepolia by changing
// the provider URL and using a real wallet with testnet ETH.
// This setup allows me to test the smart contract interactions locally before deploying to a live network.


// ---------------------------------------------------------------- //
// This is a simple utility file to interact with the ElectionFactory contract.
// It initializes the provider, wallet, and contract instance using the local Hardhat network.
