import api from "@/lib/api";
import { Banner, BannerFilters, BannerStats } from "@/types/banner";

export const bannerService = {
  getBanners: async (params: BannerFilters & { page?: number; size?: number }) => {
    const { data } = await api.get<{ content: Banner[]; totalElements: number; totalPages: number }>(
      "/admin/banners",
      { params }
    );
    return data;
  },

  getStats: async () => {
    const { data } = await api.get<BannerStats>("/admin/banners/stats");
    return data;
  },

  getBanner: async (id: number) => {
    const { data } = await api.get<Banner>(`/admin/banners/${id}`);
    return data;
  },

  createBanner: async (banner: Partial<Banner>) => {
    const { data } = await api.post<Banner>("/admin/banners", banner);
    return data;
  },

  updateBanner: async (id: number, banner: Partial<Banner>) => {
    const { data } = await api.put<Banner>(`/admin/banners/${id}`, banner);
    return data;
  },

  deleteBanner: async (id: number) => {
    await api.delete(`/admin/banners/${id}`);
  },

  toggleStatus: async (id: number) => {
    const { data } = await api.patch<Banner>(`/admin/banners/${id}/status`);
    return data;
  },

  getPublicBanners: async (position: BannerFilters['position']) => {
    const { data } = await api.get<Banner[]>("/public/banners", { params: { position } });
    return data;
  },

  trackClick: async (id: number) => {
    await api.post(`/public/banners/${id}/click`);
  },

  trackView: async (id: number) => {
    await api.post(`/public/banners/${id}/view`);
  },
  
  uploadImage: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post<{ url: string }>("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
      });
      return data.url;
  }
};
