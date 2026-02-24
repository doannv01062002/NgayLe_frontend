import api from "@/lib/api";

export interface UserProfile {
  profileId?: number;
  userId: number;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: string;
  avatarUrl?: string;
  gender?: string;
  dateOfBirth?: string;
  bio?: string;
  title?: string;
  skills?: string; // Comma separated or JSON string depending on implementation
  experienceYears?: number;
  hourlyRate?: number;
  nickname?: string;
  nationality?: string;
}

export const profileService = {
  getProfile: async (userId: number): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/profiles/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: number, data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put<UserProfile>(`/profiles/${userId}`, data);
    return response.data;
  },

  uploadAvatar: async (userId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<string>(`/profiles/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};
