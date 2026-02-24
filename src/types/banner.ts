export enum BannerPosition {
  HOME_SLIDER = "HOME_SLIDER",
  HOME_SUB_BANNER = "HOME_SUB_BANNER",
  CATEGORY_HEADER = "CATEGORY_HEADER",
  SIDEBAR = "SIDEBAR",
  FOOTER = "FOOTER",
}

export interface Banner {
  bannerId: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: BannerPosition;
  displayOrder: number;
  isActive: boolean;
  startTime: string;
  endTime: string;
  views: number;
  clickCount: number;
  ctr: number;
}

export interface BannerStats {
  active: number;
  totalViews: number;
  avgCtr: number;
  expiringSoon: number;
}

export interface BannerFilters {
  search?: string;
  position?: BannerPosition | "";
  isActive?: boolean;
}
