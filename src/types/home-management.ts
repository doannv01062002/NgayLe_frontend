export interface FlashSaleProduct {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  originalPrice: number;
  flashSalePrice: number;
  quantity: number;
  soldQuantity: number;
}

export interface FlashSaleSession {
  sessionId: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  status: "UPCOMING" | "ONGOING" | "ENDED" | "DISABLED";
  products: FlashSaleProduct[];
}

export interface CreateSessionRequest {
  startTime: string; // ISO string
  endTime: string;   // ISO string
}

export interface AddProductToFlashSaleRequest {
  productId: number;
  flashSalePrice: number;
  quantity: number;
}

export interface HomeFeatureProduct {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  displayOrder: number;
}
