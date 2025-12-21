import apiClient from './main';

export interface ProjectData {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  mainTag: { _id: string; name: string; type: string };
  tags: { _id: string; name: string; type: string }[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Get all projects
export const getProjects = async (): Promise<ProjectData[]> => {
  const response = await apiClient.get<{ projects: ProjectData[] }>('/projects');
  return response.data.projects;
}

// Get single project by ID
export const getProjectById = async (id: string): Promise<ProjectData> => {
  const response = await apiClient.get<ProjectData>(`/projects/${id}`);
  return response.data;
}

// Create new project
export const createProject = async (projectData: FormData): Promise<ProjectData> => {
  const response = await apiClient.post<ProjectData>('/projects', projectData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

// Update project
export const updateProject = async (id: string, projectData: FormData): Promise<ProjectData> => {
  const response = await apiClient.put<ProjectData>(`/projects/${id}`, projectData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
}