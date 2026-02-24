"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { flashSaleService } from "@/services/flashSale.service";
import { FlashSaleSession } from "@/types/home-management";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export function ShopFlashSale() {
  const { id } = useParams();
  const [session, setSession] = useState<FlashSaleSession | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (id) {
      flashSaleService
        .getShopCurrentFlashSale(Number(id))
        .then(setSession)
        .catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(session.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Đã kết thúc");
      } else {
        // Calculate days, hours, minutes and seconds
        const h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Add hours from days
        const totalHours = Math.floor(distance / (1000 * 60 * 60));

        setTimeLeft(
          `${totalHours.toString().padStart(2, "0")} : ${m
            .toString()
            .padStart(2, "0")} : ${s.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session || !session.products || session.products.length === 0)
    return null;

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm p-4 border border-[#e5e5e5] dark:border-gray-800">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#d0011b] font-black italic text-xl">
            <span className="material-symbols-outlined text-2xl animate-pulse">
              flash_on
            </span>
            <span>SHOP FLASH SALE</span>
          </div>
          <div className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform">
            <span className="font-bold">ĐANG DIỄN RA</span>
            <span className="font-mono font-bold text-yellow-400">
              {timeLeft}
            </span>
          </div>
        </div>
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 hover:underline"
        >
          Xem tất cả{" "}
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {session.products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.productId}`}
            className="group block"
          >
            <div className="relative border border-transparent group-hover:border-primary/50 rounded-lg p-2 transition-all group-hover:shadow-lg">
              <div className="relative aspect-square mb-2 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={item.productImage || "/placeholder.png"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-0 right-0 bg-yellow-400 text-red-700 text-[10px] font-bold px-1.5 py-0.5 z-10 rounded-bl">
                  -
                  {Math.round(
                    ((item.originalPrice - item.flashSalePrice) /
                      item.originalPrice) *
                      100
                  )}
                  %
                </div>
              </div>

              <div className="space-y-1">
                <div className="h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d0011b]"
                    style={{
                      width: `${Math.min(
                        (item.soldQuantity / item.quantity) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
                  <span>Đã bán {item.soldQuantity}</span>
                </div>

                <div className="mt-1">
                  <div className="text-[#d0011b] font-bold text-lg leading-none">
                    {formatCurrency(item.flashSalePrice)}
                  </div>
                  <div className="text-gray-400 text-xs line-through">
                    {formatCurrency(item.originalPrice)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
