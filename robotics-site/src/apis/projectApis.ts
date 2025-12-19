import apiClient from './main';


export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
}
export const getProjects = async () => {
  const response = await apiClient.get<ProjectData[]>('/projects');
  return response.data;
}