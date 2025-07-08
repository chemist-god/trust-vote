import { Response } from 'express';

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const handleError = (err: unknown, res: Response) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};