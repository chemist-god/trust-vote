
interface User {
  studentId: number;
  indexHash: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User; // Use a separate interface for better maintainability
    }
  }
}

export {}; // Required for global augmentation