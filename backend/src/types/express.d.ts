declare namespace Express {
  interface Request {
    user?: {
      firebaseUid: string;
      provider:"google"|"email"
    };
  }
}