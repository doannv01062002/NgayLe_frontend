import api from "@/lib/api";

export interface AuthResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: string;
}



export const authService = {
  EVENT_AUTH_CHANGED: "auth-changed",

  notifyAuthChange: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-changed"));
    }
  },

  setSession: (data: AuthResponse) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      const userData = { ...data };
      if ("token" in userData) {
        delete (userData as any).token;
      }
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("auth-changed"));
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("auth/login", { email, password });
    return response.data;
  },

  register: async (
    fullName: string,
    email: string,
    password: string,
    phoneNumber?: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("auth/register", {
      fullName,
      email,
      password,
      phoneNumber,
      role: "CUSTOMER",
    });
    return response.data;
  },

  sendOtp: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("auth/send-otp", { email });
    return response.data;
  },

  verifyOtp: async (email: string, otpCode: string): Promise<{ verified: boolean; message: string }> => {
    const response = await api.post<{ verified: boolean; message: string }>("auth/verify-otp", {
      email,
      otpCode,
    });
    return response.data;
  },

  socialLogin: async (
    provider: string,
    accessToken: string,
    email: string,
    fullName: string,
    providerId: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("auth/social-login", {
      provider,
      accessToken,
      email,
      fullName,
      providerId,
    });
    return response.data;
  },

  forgotPasswordSendOtp: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("auth/forgot-password/send-otp", { email });
    return response.data;
  },

  resetPassword: async (email: string, otpCode: string, newPassword: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("auth/forgot-password/reset", {
      email,
      otpCode,
      newPassword,
    });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Cleanup old tokens
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-changed"));
    }
  }
};
