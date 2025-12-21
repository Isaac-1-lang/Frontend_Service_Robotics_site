import apiClient from './main';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
}

export const register = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register', data);
  console.log(response.data)
  return response.data;
}