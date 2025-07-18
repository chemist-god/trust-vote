import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Election, getElections, createElection as createElectionContract, getElection as getElectionContract } from '@/utils/contracts';
import { toast } from 'react-hot-toast';

export function useElections() {
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchElections = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getElections();
      setElections(data);
    } catch (err) {
      console.error('Failed to fetch elections:', err);
      setError('Failed to load elections. Please try again.');
      toast.error('Failed to load elections');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchElection = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const election = await getElectionContract(id);
      if (!election) {
        throw new Error('Election not found');
      }
      return election;
    } catch (err) {
      console.error(`Failed to fetch election ${id}:`, err);
      setError('Failed to load election. Please try again.');
      toast.error('Failed to load election');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNewElection = useCallback(async (
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    bannerUrl: string = ''
  ) => {
    try {
      setIsCreating(true);
      setError(null);
      
      // Basic validation
      if (!name.trim() || !description.trim()) {
        throw new Error('Name and description are required');
      }
      
      if (startDate >= endDate) {
        throw new Error('End date must be after start date');
      }
      
      // Create the election
      const txHash = await createElectionContract(
        name,
        description,
        startDate,
        endDate,
        bannerUrl
      );
      
      // Refresh the elections list
      await fetchElections();
      
      toast.success('Election created successfully!');
      return txHash;
    } catch (err: any) {
      console.error('Failed to create election:', err);
      const errorMessage = err.message || 'Failed to create election';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, [fetchElections]);

  // Initial fetch
  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  return {
    elections,
    isLoading,
    error,
    isCreating,
    fetchElections,
    fetchElection,
    createElection: createNewElection,
  };
}
