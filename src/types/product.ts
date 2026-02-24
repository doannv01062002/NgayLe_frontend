export interface ProductVariant {
  variantId: number;
  sku: string;
  name: string;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  imageUrl?: string;
}

export interface Product {
  productId: number;
  name: string;
  description?: string;
  basePrice: number;
  originalPrice?: number;
  promotionalPrice?: number;
  isHolidaySuggestion: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  imageUrls: string[];
  categoryName?: string;
  categorySlug?: string;
  shopName?: string;
  shopId?: number;
  shopLogoUrl?: string;
  status?: string;
  soldCount?: number;
  targetAudience?: string;
  giftOccasion?: string;
  brand?: string;
  origin?: string;
  sku?: string;
  videoUrl?: string;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  metaTitle?: string;
  metaDescription?: string;
}
