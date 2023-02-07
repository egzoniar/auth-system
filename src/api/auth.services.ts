import axios from './axios';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserAuthResponse {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  iat?: number;
  exp?: number;
  accessToken?: string;
  refreshToken?: string;
}

export type UserAuthResponseOrNull = UserAuthResponse | null;

export const login = async (params: LoginInput): Promise<UserAuthResponseOrNull> => {
  const response = await axios.post('/login', params);
  return response.data;
};

export const register = async (params: RegisterInput) => {
  const response = await axios.post('/signup', params);
  return response.data;
};