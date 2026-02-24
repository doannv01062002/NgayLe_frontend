export interface Voucher {
  id: number;
  code: string;
  name: string;
  description?: string;
  type: string; // "REDEEM" | "SHIPPING" | "STOREFRONT"
  discountType: string; // "PERCENTAGE" | "FIXED_AMOUNT"
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderValue?: number;
  usageLimit: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  status: string; // "running" | "upcoming" | "ended" | "paused"
  conditionDescription: string;
  colorClass?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVoucherRequest {
  code: string;
  name: string;
  description?: string;
  type: string;
  discountType: string;
  discountValue: number;
  maxDiscountAmount?: number;
  minOrderValue?: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
}

export interface VoucherStats {
  runningVouchers: number;
  totalUsage: number;
  expiringSoon: number;
  budgetUsed: string;
}

export interface VoucherSearchParams {
  page?: number;
  size?: number;
  keyword?: string;
  type?: string;
  status?: string;
  sort?: string;
  date?: string;
}
