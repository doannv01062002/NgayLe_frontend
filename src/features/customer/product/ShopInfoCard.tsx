"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface ShopInfoCardProps {
  shopId?: number;
}

export function ShopInfoCard({ shopId }: ShopInfoCardProps) {
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    if (shopId) {
      api
        .get(`/v1/shops/${shopId}`)
        .then(({ data }) => setShop(data))
        .catch(console.error);
    }
  }, [shopId]);

  if (!shop) return null;

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-primary">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="size-16 rounded-full border border-slate-200 overflow-hidden bg-gray-100 flex items-center justify-center">
            {shop.logoUrl ? (
              <img
                alt="Logo"
                className="w-full h-full object-cover"
                src={shop.logoUrl}
              />
            ) : (
              <span className="text-xl font-bold text-gray-400">
                {shop.shopName?.charAt(0)}
              </span>
            )}
          </div>
          <div className="absolute -bottom-1 right-0 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white">
            Official
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {shop.shopName}
          </h3>
          <p className="text-xs text-slate-500 mb-1">Online 5 phút trước</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              <strong className="text-primary">12.5k</strong> Người theo dõi
            </span>
            <span className="w-px h-3 bg-slate-300"></span>
            <span className="text-slate-600 dark:text-slate-400">
              <strong className="text-primary">4.9</strong> Đánh giá
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => {
            const event = new CustomEvent("open-chat-shop", {
              detail: { shopId },
            });
            window.dispatchEvent(event);
          }}
          className="h-9 px-4 flex items-center gap-2 border border-primary/30 text-primary font-semibold rounded bg-white hover:bg-primary/5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Chat Ngay
        </button>
        <Link
          href={`/shops/${shopId}`}
          className="h-9 px-4 flex items-center gap-2 border border-slate-200 bg-slate-50 text-slate-600 font-semibold rounded hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">store</span>
          Xem Shop
        </Link>
      </div>
    </div>
  );
}
