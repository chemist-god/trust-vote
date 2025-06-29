import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface WalletProviderProps {
  name: string;
  icon: string;
  downloadUrl: string;
}

const walletProviders: WalletProviderProps[] = [
  {
    name: 'MetaMask',
    icon: '/assets/metamask.jpg',
    downloadUrl: 'https://metamask.io/download/'
  },
  {
    name: 'Coinbase Wallet',
    icon: '/assets/coinbase.jpg',
    downloadUrl: 'https://www.coinbase.com/wallet/articles/getting-started-extension'
  },
  {
    name: 'Sui Wallet',
    icon: '/assets/sui.png',
    downloadUrl: 'https://slush.app/?utm_source=suiwallet&utm_medium=popup&utm_campaign=slushLaunch'
  }
];

interface WalletConnectProps {
  onAddressChange: (address: string | null) => void;
}

export default function WalletConnect({ onAddressChange }: WalletConnectProps) {
  const [showModal, setShowModal] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfWalletIsInstalled = (provider: string) => {
    if (provider === 'MetaMask') {
      return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
    }
    // Add checks for other wallets as needed
    return false;
  };

  const connectWallet = async (provider: string) => {
    try {
      setIsConnecting(true);
      if (provider === 'MetaMask') {
        if (!checkIfWalletIsInstalled(provider)) {
          window.open(walletProviders[0].downloadUrl, '_blank');
          return;
        }

        if (window.ethereum) {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          
          const address = accounts[0];
          setConnectedAddress(address);
          onAddressChange(address);
          setShowModal(false);
        } else {
          console.error('Ethereum object is not available in the window.');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedAddress(null);
    onAddressChange(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <button
        onClick={connectedAddress ? disconnectWallet : () => setShowModal(true)}
        className="flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 
          bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
          text-white font-medium shadow-sm hover:shadow-md"
      >
        {connectedAddress ? (
          <>
            <span>{formatAddress(connectedAddress)}</span>
            <span className="text-sm opacity-80">(Disconnect)</span>
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
              
              <h3 className="text-xl font-semibold mb-4">Connect Wallet</h3>
              <p className="text-gray-600 mb-6">
                Choose your preferred wallet provider to connect
              </p>

              <div className="space-y-3">
                {walletProviders.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl border border-gray-200 
                      hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium text-gray-900">{wallet.name}</span>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-sm text-gray-500 text-center">
                New to Web3? Learn more about wallets
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}