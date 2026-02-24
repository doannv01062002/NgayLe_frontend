"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export function ShopHeader() {
  const params = useParams();
  const shopId = params?.id;
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    if (shopId) {
      api
        .get(`/v1/shops/${shopId}`)
        .then(({ data }) => setShop(data))
        .catch(console.error);
    }
  }, [shopId]);

  const handleChatNow = () => {
    if (shopId) {
      const event = new CustomEvent("open-chat-shop", { detail: { shopId } });
      window.dispatchEvent(event);
    }
  };

  if (!shop) {
    return (
      <div className="w-full bg-white shadow-sm relative z-10 h-64 animate-pulse bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Loading Shop Info...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm relative z-10 group">
      {/* Shop Cover Image */}
      <div
        className="relative h-48 md:h-64 w-full bg-cover bg-center group-hover:brightness-[0.95] transition-all duration-500"
        style={{
          backgroundImage: shop.bannerUrl
            ? `url("${shop.bannerUrl}")`
            : undefined,
          backgroundColor: "#eee",
        }}
      >
        {/* Gradient Overlay for aesthetic, but text won't rely on it */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Info Section - Layout similar to detailed profile headers (e.g. Facebook/LinkedIn) */}
      <div className="max-w-[1240px] mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-end -mt-16 md:-mt-12 pb-4 gap-4 md:gap-6">
          {/* Avatar Area */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            <div
              className="size-32 md:size-40 rounded-full border-[5px] border-white shadow-lg bg-cover bg-center bg-white flex items-center justify-center text-4xl font-bold text-gray-300"
              style={{
                backgroundImage: shop.logoUrl
                  ? `url("${shop.logoUrl}")`
                  : undefined,
                backgroundColor: shop.logoUrl ? "transparent" : "#f0f0f0",
              }}
            >
              {!shop.logoUrl && (shop.shopName?.charAt(0) || "S")}
            </div>
            <div className="absolute bottom-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] filled-icon">
                check_circle
              </span>
              Official
            </div>
          </div>

          {/* Text Info & Actions - Positioned to be clearly visible on white/partial background */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full pt-16 md:pt-0 pb-1 md:pb-0 text-gray-800">
            {/* Left Side: Shop Name & Stats */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2 drop-shadow-sm md:drop-shadow-none md:mt-2">
                {shop.shopName}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 font-medium">
                <div
                  className="flex items-center gap-1.5"
                  title="Đánh giá 4.9/5"
                >
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-[18px] filled-icon"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">4.9</span>
                  <span className="text-xs text-gray-400">/ 5.0</span>
                </div>

                <span className="w-px h-4 bg-gray-300 hidden md:block"></span>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900">12.5k</span>
                  <span>Người theo dõi</span>
                </div>

                <span className="w-px h-4 bg-gray-300 hidden md:block"></span>

                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold">Online 4 phút trước</span>
                </div>
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 hover:border-gray-800 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                Theo Dõi
              </button>
              <button
                onClick={handleChatNow}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d0011b] hover:bg-[#a00015] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                Chat Ngay
              </button>
              <button className="p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-500 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  more_horiz
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
