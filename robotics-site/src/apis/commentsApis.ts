import apiClient from './main';

export interface CommentData {
  content: string;
}

export const postComment = async (type: 'posts' | 'projects', targetId: string, data: CommentData) => {
  const response = await apiClient.post(`/${type}/${targetId}/comments`, data);
  return response.data;
}