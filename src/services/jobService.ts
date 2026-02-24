import api from "@/lib/api";

export interface Job {
  jobId: number;
  hirerId: number;
  hirerName: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  deadline: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface CreateJobDTO {
  title: string;
  description: string;
  location: string;
  budget: number;
  deadline: string;
}

export const jobService = {
  getAll: async (): Promise<Job[]> => {
    const response = await api.get<Job[]>("/jobs");
    return response.data;
  },

  getByHirer: async (hirerId: number): Promise<Job[]> => {
    const response = await api.get<Job[]>(`/jobs/hirer/${hirerId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${id}`);
    return response.data;
  },

  create: async (hirerId: number, data: CreateJobDTO): Promise<Job> => {
    const response = await api.post<Job>(`/jobs/hirer/${hirerId}`, data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateJobDTO>): Promise<Job> => {
    const response = await api.put<Job>(`/jobs/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  }
};
