export interface ECardTemplate {
  id: number;
  name: string;
  thumbnailUrl: string;
  category: string;
  isPremium: boolean;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  canvasDataJson?: string;
  // UI helper
  contextColor?: string; 
}

export interface ECardStats {
  totalTemplates: number;
  totalUsage: number;
  popularTemplate?: ECardTemplate;
}

export interface CreateECardTemplateParams {
    name: string;
    category: string;
    isPremium?: boolean;
    canvasDataJson?: string;
    image?: File | null;
}

export interface Sticker {
    id: number;
    url: string;
    name: string;
    category: string;
    createdAt: string;
}

export interface ECardState {
    template: ECardTemplate | null;
    message: string;
    messageStyle: {
        fontFamily: string;
        color: string;
        fontSize: number;
        bold: boolean;
        italic: boolean;
        alignment: 'left' | 'center' | 'right';
    };
    messagePosition: {
        x: number;
        y: number;
    };
    stickers: {
        id: string; // uuid
        url: string;
        x: number;
        y: number;
        scale: number;
        rotation: number;
    }[];
}
