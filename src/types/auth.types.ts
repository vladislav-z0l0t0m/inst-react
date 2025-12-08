export type User = {
  id: number;
  email: string;
  username: string;
  phone?: string;
};

export type AuthResponse = {
  user: User;
};
