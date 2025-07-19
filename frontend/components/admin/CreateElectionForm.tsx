'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { FiCalendar, FiX, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ELECTION_FACTORY_ADDRESS || '';
const CONTRACT_ABI = [
  'function createElection(string memory _name, string memory _description, uint _startDate, uint _endDate, string memory _bannerUrl) public',
];

interface CreateElectionFormProps {
  onClose: () => void;
  onElectionCreated: () => void;
}

export default function CreateElectionForm({ onClose, onElectionCreated }: CreateElectionFormProps) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    bannerUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState('');
  const [successElection, setSuccessElection] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          bannerUrl: `https://ipfs.io/ipfs/${Date.now()}-${file.name}`
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connect({ connector: injected() });
    } catch (err) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!isConnected || !walletClient?.transport) {
      toast.error('Please connect your wallet first');
      return;
    }
    try {
      setIsLoading(true);
      // ethers v6: BrowserProvider accepts EIP-1193 provider (wagmi v1+ transport)
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const startTimestamp = Math.floor(new Date(formData.startDate).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(formData.endDate).getTime() / 1000);
      const tx = await contract.createElection(
        formData.name,
        formData.description,
        startTimestamp,
        endTimestamp,
        formData.bannerUrl || ''
      );
      toast('Awaiting blockchain confirmation...', { icon: '⏳' });
      const receipt = await tx.wait();
      setSuccessElection({ ...formData, txHash: receipt.hash || receipt.transactionHash });
      onElectionCreated();
    } catch (error) {
      const err = error as any;
      setErrorMsg(err?.reason || err?.message || 'Failed to create election');
      toast.error(err?.reason || err?.message || 'Failed to create election');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          className="bg-white rounded-2xl w-full max-w-xl p-8 relative shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            disabled={isLoading}
          >
            <FiX size={24} />
          </button>

          {successElection ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Election Created!</h2>
              <p className="text-gray-600 mb-4">Your election has been created and is now live on the blockchain.</p>
              <div className="bg-gray-50 rounded-lg p-4 w-full max-w-md text-left mb-4">
                <div className="mb-2"><span className="font-semibold">Name:</span> {successElection.name}</div>
                <div className="mb-2"><span className="font-semibold">Description:</span> {successElection.description}</div>
                <div className="mb-2"><span className="font-semibold">Start:</span> {successElection.startDate}</div>
                <div className="mb-2"><span className="font-semibold">End:</span> {successElection.endDate}</div>
                <div className="mb-2"><span className="font-semibold">Tx Hash:</span> <a href={`https://sepolia.etherscan.io/tx/${successElection.txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{successElection.txHash.slice(0, 10)}...</a></div>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Election</h2>
              <p className="text-gray-500 mb-4">Fill in the details below to create a new election. You will be prompted to sign the transaction with your wallet.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Election Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E.g., SRC Presidential Election 2023"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide details about this election..."
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={formData.startDate}
                      className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {bannerPreview ? (
                      <div className="relative">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="mx-auto h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setBannerPreview('')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          disabled={isLoading}
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="banner-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="banner-upload"
                              name="banner-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleBannerChange}
                              disabled={isLoading}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {errorMsg && <div className="text-red-500 text-sm text-center">{errorMsg}</div>}
              <div className="flex flex-col md:flex-row justify-end md:space-x-4 pt-4 gap-2">
                {!isConnected ? (
                  <button
                    type="button"
                    onClick={handleConnectWallet}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : 'Create Election'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
