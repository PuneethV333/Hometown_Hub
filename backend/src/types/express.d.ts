export type AuthProvider = "google" | "email";


declare global {
  namespace Express {
    interface Request {
      user?: {
        firebaseUid: string;
        provider: AuthProvider;
      };
    }
  }
}
