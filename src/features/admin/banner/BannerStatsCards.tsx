import React from "react";
import { BannerStats } from "@/types/banner";

interface Props {
  stats: BannerStats;
}

export default function BannerStatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">Banner Đang Chạy</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">{stats.active}</h3>
            {/* Mock trend */}
            <span className="text-green-500 text-xs font-medium bg-green-50 px-1.5 py-0.5 rounded flex items-center">
              +2{" "}
              <span className="material-symbols-outlined text-[12px] ml-0.5">
                trending_up
              </span>
            </span>
          </div>
        </div>
        <div className="size-10 rounded-full bg-red-50 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">ad_units</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">Tổng Lượt Xem</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.totalViews > 1000000
                ? (stats.totalViews / 1000000).toFixed(2) + "M"
                : stats.totalViews > 1000
                ? (stats.totalViews / 1000).toFixed(1) + "K"
                : stats.totalViews}
            </h3>
            <span className="text-green-500 text-xs font-medium bg-green-50 px-1.5 py-0.5 rounded flex items-center">
              +15%
            </span>
          </div>
        </div>
        <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <span className="material-symbols-outlined">visibility</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">CTR Trung Bình</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.avgCtr}%
            </h3>
            <span className="text-red-500 text-xs font-medium bg-red-50 px-1.5 py-0.5 rounded flex items-center">
              -0.5%{" "}
              <span className="material-symbols-outlined text-[12px] ml-0.5">
                trending_down
              </span>
            </span>
          </div>
        </div>
        <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
          <span className="material-symbols-outlined">ads_click</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">Sắp Hết Hạn</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.expiringSoon}
            </h3>
            <span className="text-gray-400 text-xs">Cần gia hạn</span>
          </div>
        </div>
        <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
          <span className="material-symbols-outlined">schedule</span>
        </div>
      </div>
    </div>
  );
}
