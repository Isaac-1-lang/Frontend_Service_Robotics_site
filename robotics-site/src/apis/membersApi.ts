import apiClient from './main';


export interface MemberData {
  fullName: string;
  role: string;
  bio: string;
  email: string;
  linkedIn?: string;
  github?: string;
}
export const getMembers = async () => {
  const response = await apiClient.get<MemberData[]>('/members');
  return response.data;
}