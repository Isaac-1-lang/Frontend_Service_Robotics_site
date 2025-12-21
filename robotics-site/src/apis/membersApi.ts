import apiClient from './main';

export interface MemberData {
  _id: string;
  username: string;
  role: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
}

export const getMembers = async () => {
  const response = await apiClient.get<MemberData[]>('/users/members');
  return response.data;
}