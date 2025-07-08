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

// Payload from the JWT, guaranteed to be on the request by the 'protect' middleware
interface UserPayload {
  studentId: number;
  indexHash: string;
}

// Custom request type for authenticated routes to include the user payload
interface AuthenticatedRequest<T = any> extends Request<{}, {}, T> {
  // User is made optional here to be compatible with the base Express Request type.
  // The `protect` middleware ensures it's present at runtime for protected routes.
  user?: UserPayload;
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
    // Trim inputs to prevent whitespace issues
    const indexNumber = req.body.indexNumber?.trim();
    const password = req.body.password?.trim();

    // Use the trimmed values for the check
    if (!indexNumber || !password) {
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
      isFirstLogin: await bcrypt.compare(indexNumber, student.password_hash),
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
export const updatePassword = async (
  req: AuthenticatedRequest<UpdatePasswordRequest>,
  res: Response
): Promise<void> => {
  try {
    // This check is necessary for TypeScript and provides runtime safety,
    // even though the `protect` middleware should always add the user.
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated.');
    }
    const { studentId } = req.user;
    // Trim inputs to prevent whitespace issues
    const oldPassword = req.body.oldPassword?.trim();
    const newPassword = req.body.newPassword?.trim();

    if (!oldPassword || !newPassword) {
      throw new ApiError(400, 'Old and new passwords are required.');
    }

    if (newPassword.length < 6) {
      throw new ApiError(400, 'Password must be at least 6 characters long.');
    }

    const studentResult = await pool.query('SELECT password_hash FROM students WHERE id = $1', [studentId]);

    if (studentResult.rows.length === 0) {
      throw new ApiError(404, 'Student not found.');
    }

    const student = studentResult.rows[0];
    const isMatch = await bcrypt.compare(oldPassword, student.password_hash);

    if (!isMatch) {
      throw new ApiError(401, 'Incorrect old password.');
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await pool.query('UPDATE students SET password_hash = $1 WHERE id = $2', [newPasswordHash, studentId]);

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * @desc    Connect a wallet to the student's account
 * @route   POST /api/auth/connect-wallet
 * @access  Private
 */
export const connectWallet = async (
  req: AuthenticatedRequest<ConnectWalletRequest>,
  res: Response
): Promise<void> => {
  try {
    // This check is necessary for TypeScript and provides runtime safety.
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated.');
    }
    const { studentId } = req.user;
    const { walletAddress } = req.body;

    if (!walletAddress) {
      throw new ApiError(400, 'Wallet address is required.');
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      throw new ApiError(400, 'Invalid wallet address format.');
    }

    const existingWallet = await pool.query('SELECT id FROM students WHERE wallet_address = $1 AND id != $2', [
      walletAddress,
      studentId,
    ]);

    if (existingWallet.rows.length > 0) {
      throw new ApiError(409, 'This wallet address is already linked to another student.');
    }

    await pool.query('UPDATE students SET wallet_address = $1 WHERE id = $2', [walletAddress, studentId]);

    res.status(200).json({ success: true, message: 'Wallet connected successfully.' });
  } catch (err) {
    handleError(err, res);
  }
};
