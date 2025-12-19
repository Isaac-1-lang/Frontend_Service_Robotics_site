import apiClient from './main';



export interface PostData {
  id: string;
  title: string;
  content: string;
}
export const getPosts = async () => {
  const response = await apiClient.get<PostData[]>('/posts');
  return response.data;
}