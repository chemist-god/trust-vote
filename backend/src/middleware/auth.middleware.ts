import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ===== 1. Type Definitions =====
interface UserPayload {
  studentId: number;
  indexHash: string;
  role?: string; // Added optional role property
}

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}

// ===== 2. Auth Middlewares =====
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Extract Token
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(403).json({ message: 'Access denied. No token provided' });
      return;
    }

    // 2. Verify Token
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: 'JWT_SECRET not configured' });
      return;
    }

    // 3. Attach User
    req.user = jwt.verify(token, jwtSecret) as UserPayload;
    next();

  } catch (error) {
    handleAuthError(res, error);
  }
};

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.role) {
    res.status(403).json({ message: 'Authentication required' });
    return;
  }
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Admin access only' });
    return;
  }
  next();
};

// ===== 3. Helper Functions =====
const handleAuthError = (res: Response, error: unknown): void => {
  const message = error instanceof Error ? error.message : 'Invalid token';
  res.status(403).json({ message });
};