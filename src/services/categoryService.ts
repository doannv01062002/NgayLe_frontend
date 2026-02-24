import api from "@/lib/api";

export interface Category {
  categoryId: number;
  parentId?: number;
  name: string;
  slug: string;
  level: number;
  iconUrl?: string;
  isHolidaySpecific?: boolean;
  displayOrder?: number;
  children?: Category[];
}

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("categories");
    return response.data;
  },
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get<Category>(`categories/${slug}`);
    return response.data;
  }
};
