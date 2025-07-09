import { Request, Response } from 'express';
import { electionFactory } from '../utils/blockchain';
import { pool } from '../db';

export const createElection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, startDate, endDate, bannerUrl } = req.body;

    // Validate required fields
    if (!name || !description || !startDate || !endDate || !bannerUrl) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    // Convert date strings to UNIX timestamps
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    console.log('Parsed Timestamps:', startTimestamp, endTimestamp);

    // Call the smart contract with all 5 parameters
    const tx = await electionFactory.createElection(
      name,
      description,
      startTimestamp,
      endTimestamp,
      bannerUrl 
    );

    console.log('📄 Transaction sent:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    res.status(201).json({
      success: true,
      message: 'Election created on-chain.',
      transactionHash: receipt.hash,
    });
  } catch (error) {
    console.error('❌ Contract interaction error:', error);
    res.status(500).json({ message: 'Failed to create election.' });
  }
};

export const getElections = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT * FROM elections
       WHERE start_date <= NOW() AND end_date >= NOW()
       ORDER BY start_date ASC`
    );

    res.status(200).json({ elections: result.rows });
  } catch (err) {
    console.error('❌ Failed to fetch elections:', err);
    res.status(500).json({ message: 'Server error fetching elections.' });
  }
};
