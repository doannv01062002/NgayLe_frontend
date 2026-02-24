import api from "@/lib/api";

export interface Booking {
  bookingId: number;
  hirerId: number;
  hirerName: string;
  workerId: number;
  workerName: string;
  jobId?: number;
  jobTitle?: string;
  startTime: string;
  endTime: string;
  location: string;
  totalPrice: number;
  notes?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface CreateBookingDTO {
  hirerId: number;
  workerId: number;
  jobId?: number; // Optional
  startTime: string;
  endTime: string;
  location: string;
  totalPrice: number;
  notes?: string;
}

export const bookingService = {
  create: async (data: CreateBookingDTO): Promise<Booking> => {
    const response = await api.post<Booking>("/bookings", data);
    return response.data;
  },

  getByHirer: async (hirerId: number): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(`/bookings/hirer/${hirerId}`);
    return response.data;
  },

  getByWorker: async (workerId: number): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(`/bookings/worker/${workerId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await api.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, status: Booking['status']): Promise<Booking> => {
    const response = await api.put<Booking>(`/bookings/${id}/status`, null, {
        params: { status }
    });
    return response.data;
  }
};
