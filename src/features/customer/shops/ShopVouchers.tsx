"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { voucherService } from "@/services/voucher.service";
import { Voucher } from "@/types/voucher";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

export function ShopVouchers() {
  const { id } = useParams();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVouchers();
    }
  }, [id]);

  const fetchVouchers = async () => {
    try {
      console.log("Fetching vouchers for shop:", id);
      const data = await voucherService.getShopVouchers(Number(id));
      console.log("Fetched vouchers:", data);
      setVouchers(data);
    } catch (e) {
      console.error("Error fetching shop vouchers:", e);
    }
  };

  if (!vouchers.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#181111] uppercase border-l-4 border-primary pl-3 flex items-center h-6">
          Mã Giảm Giá Của Shop
        </h3>
        <a className="text-sm text-primary hover:underline" href="#">
          Xem tất cả &gt;
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="min-w-[280px] bg-white border border-gray-100 rounded shadow-sm flex overflow-hidden hover:shadow-md transition-shadow relative"
          >
            {/* Left side detail */}
            <div className="bg-gradient-to-b from-orange-50 to-red-50 w-24 flex flex-col items-center justify-center p-2 border-r border-dashed border-red-200 relative">
              {/* Semi-circles for ticket effect */}
              <div className="absolute -top-1.5 -right-1.5 size-3 bg-[#f5f5f5] rounded-full"></div>
              <div className="absolute -bottom-1.5 -right-1.5 size-3 bg-[#f5f5f5] rounded-full"></div>

              <span className="text-primary font-black text-[10px] uppercase mb-1">
                SHOP
              </span>
              <div className="size-10 bg-white shadow-sm p-1 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  storefront
                </span>
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <p className="text-primary text-lg font-bold leading-tight">
                  {voucher.discountType === "PERCENTAGE"
                    ? `Giảm ${voucher.discountValue}%`
                    : `Giảm ${formatCurrency(voucher.discountValue)}`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Đơn tối thiểu {formatCurrency(voucher.minOrderValue || 0)}
                </p>
              </div>
              <div className="flex justify-between items-end mt-2">
                <p className="text-[10px] text-gray-400">
                  HSD: {new Date(voucher.endDate).toLocaleDateString("vi-VN")}
                </p>
                <button
                  onClick={() => showToast("Đã lưu mã giảm giá", "success")}
                  className="bg-primary text-white text-xs px-3 py-1 rounded shadow-sm hover:bg-red-600 font-bold transition-colors"
                >
                  Lưu
                </button>
              </div>
            </div>

            {/* Ticket jagged edge effect (optional, css based or svg) */}
          </div>
        ))}
      </div>
    </section>
  );
}
