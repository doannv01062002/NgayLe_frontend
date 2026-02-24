"use client";

import { useEffect, useState } from "react";
import { voucherService } from "@/services/voucher.service";
import { VoucherStats as VoucherStatsType } from "@/types/voucher";

export function VoucherStats() {
  const [stats, setStats] = useState<VoucherStatsType>({
    runningVouchers: 0,
    totalUsage: 0,
    expiringSoon: 0,
    budgetUsed: "0đ",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await voucherService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch voucher stats", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Voucher đang chạy
          </p>
          <span className="material-symbols-outlined text-primary">
            confirmation_number
          </span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.runningVouchers}
          </p>
          {/* Trend indicator removed or kept static if no historical data */}
          <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
            2%
          </span>
        </div>
      </div>
      {/* Card 2 */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Tổng lượt dùng
          </p>
          <span className="material-symbols-outlined text-purple-500">
            redeem
          </span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalUsage.toLocaleString()}
          </p>
          <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
            15%
          </span>
        </div>
      </div>
      {/* Card 3 */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Ngân sách đã dùng
          </p>
          <span className="material-symbols-outlined text-amber-500">
            account_balance_wallet
          </span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.budgetUsed}
          </p>
          <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
            5%
          </span>
        </div>
      </div>
      {/* Card 4 */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Sắp hết hạn (7 ngày)
          </p>
          <span className="material-symbols-outlined text-rose-500">timer</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.expiringSoon}
          </p>
          <span className="text-rose-600 text-sm font-semibold bg-rose-50 dark:bg-rose-900/30 px-1.5 py-0.5 rounded flex items-center">
            <span className="material-symbols-outlined text-[14px]">
              arrow_downward
            </span>
            1%
          </span>
        </div>
      </div>
    </div>
  );
}
