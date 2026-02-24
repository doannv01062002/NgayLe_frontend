"use client";
import Link from "next/link";
import React, { useState } from "react";

const tabs = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ thanh toán" },
  { id: "transporting", label: "Vận chuyển" },
  { id: "delivering", label: "Đang giao" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

export function OrderStatusTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="bg-white dark:bg-[#2d1b1b] rounded-lg shadow-sm sticky top-[68px] z-30">
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[100px] text-center py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-400 hover:text-primary border-b-2 border-transparent hover:border-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Search within orders */}
      <div className="p-4 bg-[#eaeaea] dark:bg-[#1f1f1f]">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-900 bg-white dark:bg-[#2d2d2d] dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="Tìm kiếm theo Tên Shop, ID Đơn hàng hoặc Tên Sản phẩm"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}
