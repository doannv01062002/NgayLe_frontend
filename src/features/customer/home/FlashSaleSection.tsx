"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { flashSaleService } from "@/services/flashSale.service";
import { FlashSaleSession } from "@/types/home-management";
import { formatCurrency } from "@/lib/utils";

export function FlashSaleSection() {
  const [session, setSession] = useState<FlashSaleSession | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const data = await flashSaleService.getCurrentFlashSale();
      setSession(data);
    } catch (error) {
      console.error("Failed to load flash sale", error);
    }
  };

  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(session.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setSession(null); // Hide or refresh
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session || !session.products || session.products.length === 0) {
    return null;
  }

  // Display only first 6 products
  const displayProducts = session.products.slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#fff0f0] to-white">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl animate-pulse">
              bolt
            </span>
            <motion.h2
              className="text-xl font-extrabold italic tracking-tight"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              FLASH SALE
            </motion.h2>
          </div>
          {/* Timer */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center bg-black text-white text-sm font-bold w-8 h-7 rounded">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="font-bold">:</span>
            <div className="flex items-center justify-center bg-black text-white text-sm font-bold w-8 h-7 rounded">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="font-bold">:</span>
            <div className="flex items-center justify-center bg-black text-white text-sm font-bold w-8 h-7 rounded">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
        <Link
          className="text-primary text-sm font-bold flex items-center hover:underline"
          href="/flash-sale"
        >
          Xem tất cả
          <span className="material-symbols-outlined text-sm ml-1">
            chevron_right
          </span>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 divide-x divide-gray-100">
        {displayProducts.map((product) => {
          const discount = Math.round(
            ((product.originalPrice - product.flashSalePrice) /
              product.originalPrice) *
              100
          );
          const progress =
            product.quantity > 0
              ? (product.soldQuantity / product.quantity) * 100
              : 0;

          return (
            <div
              key={product.id}
              className="p-4 flex flex-col gap-2 hover:shadow-lg hover:z-10 bg-white transition-all cursor-pointer group"
            >
              <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-1">
                <div className="absolute top-0 right-0 bg-secondary-accent text-primary-dark text-[10px] font-bold px-2 py-0.5 z-10">
                  -{discount}%
                </div>
                <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 z-10 rounded-br">
                  Flash Sale
                </div>
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${
                      product.productImage || "/placeholder.png"
                    }')`,
                  }}
                ></div>
              </div>
              <div className="space-y-1">
                <h3
                  className="text-sm text-[#1b0d0d] truncate leading-tight"
                  title={product.productName}
                >
                  {product.productName}
                </h3>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-primary">
                      {formatCurrency(product.flashSalePrice)}
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-red-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-primary sm:text-white uppercase tracking-wide">
                    Đã bán {product.soldQuantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
