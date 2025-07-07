import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import crypto from 'crypto';

interface LoginRequest {
  indexNumber: string;
  password: string;
}

interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface ConnectWalletRequest {
  walletAddress: string;
}

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

const handleError = (err: unknown, res: Response) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const hashIndex = (index: string): string =>
  crypto.createHash('sha256').update(index.trim()).digest('hex');

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
  try {
    const { indexNumber, password } = req.body;

    if (!indexNumber?.trim() || !password?.trim()) {
      throw new ApiError(400, 'Index number and password are required.');
    }

    const indexHash = hashIndex(indexNumber);
    const studentResult = await pool.query('SELECT * FROM students WHERE index_hash = $1', [indexHash]);

    if (studentResult.rows.length === 0) {
      throw new ApiError(401, 'Invalid credentials.');
    }

    const student = studentResult.rows[0];
    const isMatch = await bcrypt.compare(password, student.password_hash);

    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials.');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new ApiError(500, 'Server configuration error.');
    }

    const token = jwt.sign(
      { studentId: student.id, indexHash: student.index_hash },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      isFirstLogin: await bcrypt.compare(indexNumber.trim(), student.password_hash),
      message: 'Logged in successfully.',
    });
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc    Update student password
 * @route   PUT /api/auth/update-password
 * @access  Private
 */
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const { studentId } = user;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: 'Old and new passwords are required.' });
    return;
  }

  if (newPassword.length < 6) {
     res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    return;
  }

  try {
    // Get current password hash
    const studentResult = await pool.query('SELECT password_hash FROM students WHERE id = $1', [studentId]);

    if (studentResult.rows.length === 0) {
      res.status(404).json({ message: 'Student not found.' });
      return;
    }

    const student = studentResult.rows[0];

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, student.password_hash);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect old password.' });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update password in DB
    await pool.query('UPDATE students SET password_hash = $1 WHERE id = $2', [newPasswordHash, studentId]);

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ message: 'Server error during password update.' });
  }
};

/**
 * @desc    Connect a wallet to the student's account
 * @route   POST /api/auth/connect-wallet
 * @access  Private
 */
export const connectWallet = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const { studentId } = user;
  const { walletAddress } = req.body;

  if (!walletAddress) {
    res.status(400).json({ message: 'Wallet address is required.' });
    return;
  }

  // Basic validation for wallet address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    res.status(400).json({ message: 'Invalid wallet address format.' });
    return;
  }

  try {
    // Check if wallet is already linked to another student
    const existingWallet = await pool.query('SELECT id FROM students WHERE wallet_address = $1 AND id != $2', [
      walletAddress,
      studentId,
    ]);
    if (existingWallet.rows.length > 0) {
      res.status(409).json({ message: 'This wallet address is already linked to another student.' });
      return;
    }

    // Update student record with wallet address
    await pool.query('UPDATE students SET wallet_address = $1 WHERE id = $2', [walletAddress, studentId]);

    res.status(200).json({ success: true, message: 'Wallet connected successfully.' });
  } catch (err) {
    console.error('Connect wallet error:', err);
    res.status(500).json({ message: 'Server error during wallet connection.' });
  }
};
