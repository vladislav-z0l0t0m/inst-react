export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    username: string;
    phone?: string;
  };
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}
