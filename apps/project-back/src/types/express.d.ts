declare global {
  // biome-ignore lint/style/noNamespace: Express request augmentation requires this namespace.
  namespace Express {
    interface Request {
      user?: { id: string; email: string; fullName: string };
    }
  }
}

export {};
