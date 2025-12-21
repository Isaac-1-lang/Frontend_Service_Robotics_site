import apiClient from './main';

export interface PostData {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  tags: {
    _id: string;
    name: string;
    type: string;
  }[];
  mainTag: {
    _id: string;
    name: string;
    type: string;
  };
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const getPosts = async () => {
  const response = await apiClient.get<{ posts: PostData[] }>('/posts');
  return response.data.posts;
}