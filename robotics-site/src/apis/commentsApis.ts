import apiClient from './main';

export interface CommentData {
  projectId: string;
  content: string;
  authorName: string;
  authorEmail: string;
}
export const postComment = async (data: CommentData) => {
  const response = await apiClient.post('/comments', data);
  return response.data;
}