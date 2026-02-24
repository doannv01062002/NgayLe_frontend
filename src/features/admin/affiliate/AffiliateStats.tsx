"use client";

import { useEffect, useState } from "react";
import {
  adminAffiliateService,
  AffiliateOverviewDTO,
} from "@/services/adminAffiliateService";

export function AffiliateStats() {
  const [stats, setStats] = useState<AffiliateOverviewDTO | null>(null);

  useEffect(() => {
    adminAffiliateService.getOverview().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Affiliates */}
      <div className="flex flex-col gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2632] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Tổng đối tác
          </p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-md text-[20px]">
            groups
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats ? stats.totalPartners.toLocaleString() : "..."}
          </p>
          <p className="text-emerald-700 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              arrow_upward
            </span>
            15%
          </p>
        </div>
      </div>
      {/* Pending */}
      <div className="flex flex-col gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2632] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Đang chờ duyệt
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-100 p-1 rounded-md text-[20px] dark:bg-orange-900/30">
            person_add
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats ? stats.pendingPartners.toLocaleString() : "..."}
          </p>
          <p className="text-emerald-700 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              arrow_upward
            </span>
            5%
          </p>
        </div>
      </div>
      {/* Revenue */}
      <div className="flex flex-col gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2632] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Doanh thu Affiliate
          </p>
          <span className="material-symbols-outlined text-green-600 bg-green-100 p-1 rounded-md text-[20px] dark:bg-green-900/30 dark:text-green-400">
            payments
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats.totalAffiliateRevenue)
              : "..."}
          </p>
          <p className="text-emerald-700 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              arrow_upward
            </span>
            12%
          </p>
        </div>
      </div>
      {/* Commission Pending */}
      <div className="flex flex-col gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2632] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Hoa hồng chờ trả
          </p>
          <span className="material-symbols-outlined text-purple-600 bg-purple-100 p-1 rounded-md text-[20px] dark:bg-purple-900/30 dark:text-purple-400">
            account_balance_wallet
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats.pendingCommission)
              : "..."}
          </p>
          <p className="text-emerald-700 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[12px] mr-0.5">
              arrow_upward
            </span>
            2%
          </p>
        </div>
      </div>
    </div>
  );
}
