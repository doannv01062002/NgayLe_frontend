import api from "@/lib/api";

export interface Review {
  reviewId: number;
  bookingId: number;
  reviewerId: number;
  reviewerName: string;
  revieweeId: number;
  revieweeName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewDTO {
  bookingId: number;
  reviewerId: number;
  revieweeId: number;
  rating: number;
  comment: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ProductReview {
  reviewId: number;
  productId: number;
  productName?: string;
  productImage?: string;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  mediaUrls?: string;
  createdAt: string;
  isHidden?: boolean;
  reply?: string;
  replyCreatedAt?: string;
}

export interface CreateProductReviewDTO {
  productId: number;
  rating: number;
  comment: string;
  mediaUrls?: string;
}

export const reviewService = {
  create: async (data: CreateReviewDTO): Promise<Review> => {
    const response = await api.post<Review>("/reviews", data);
    return response.data;
  },

  getReviewsForUser: async (userId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/user/${userId}`);
    return response.data;
  },

  getProductReviews: async (productId: number, page = 0, size = 10): Promise<Page<ProductReview>> => {
    const response = await api.get<Page<ProductReview>>(`/product-reviews/product/${productId}`, {
      params: { page, size }
    });
    return response.data;
  },

  addProductReview: async (data: CreateProductReviewDTO): Promise<ProductReview> => {
    const response = await api.post<ProductReview>("/product-reviews", data);
    return response.data;
  },

  // Admin methods
  getAdminReviews: async (page = 0, size = 10, keyword?: string, rating?: number | null): Promise<Page<ProductReview>> => {
    const response = await api.get<Page<ProductReview>>(`/v1/admin/product-reviews`, {
      params: { page, size, keyword, rating }
    });
    return response.data;
  },

  toggleVisibility: async (id: number): Promise<void> => {
    await api.put(`/v1/admin/product-reviews/${id}/visibility`);
  },

  replyReview: async (id: number, reply: string): Promise<void> => {
    await api.post(`/v1/admin/product-reviews/${id}/reply`, reply, {
        headers: { 'Content-Type': 'text/plain' }
    });
  },

  deleteReview: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/product-reviews/${id}`);
  }
};
