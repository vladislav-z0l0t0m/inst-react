export type User = {
  id: number;
  email: string;
  username: string;
  phone?: string;
  provider?: ProviderType;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
};

export type ProviderType = "google" | "facebook";