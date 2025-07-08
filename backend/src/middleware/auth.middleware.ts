import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  studentId: number;
  indexHash: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set.');
    }

    const decoded = jwt.verify(token, jwtSecret) as UserPayload;
    // We use a type assertion here to tell TypeScript about the 'user' property.
    // This is necessary because the global type declaration is not being picked up.
    (req as Request & { user: UserPayload }).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      message: err instanceof Error ? err.message : 'Invalid token.',
    });
  }
};
