"use client";
import React, { useState } from "react";

interface OrderFilterProps {
  onFilterChange: (filters: {
    keyword?: string;
    shippingUnit?: string;
    date?: string;
  }) => void;
  onReset: () => void;
}

export function OrderFilter({ onFilterChange, onReset }: OrderFilterProps) {
  const [keyword, setKeyword] = useState("");
  const [shippingUnit, setShippingUnit] = useState("Tất cả");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    onFilterChange({ keyword, shippingUnit, date });
  };

  const handleReset = () => {
    setKeyword("");
    setShippingUnit("Tất cả");
    setDate("");
    onReset();
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-900 dark:text-white mb-1">
            Tìm kiếm đơn hàng
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
              placeholder="Nhập Mã đơn hàng hoặc Tên người mua"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-gray-900 dark:text-white mb-1">
            Đơn vị vận chuyển
          </label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none text-gray-900 dark:text-white"
              value={shippingUnit}
              onChange={(e) => setShippingUnit(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Giao Hàng Nhanh">Giao Hàng Nhanh</option>
              <option value="Viettel Post">Viettel Post</option>
              <option value="Hỏa Tốc">Hỏa Tốc</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-gray-900 dark:text-white mb-1">
            Ngày đặt hàng
          </label>
          <div className="relative">
            <input
              className="w-full pl-4 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-2 flex items-end gap-2">
          <button
            onClick={handleSearch}
            className="flex-1 bg-primary hover:bg-blue-600 text-white h-[38px] rounded-lg text-sm font-bold shadow-sm transition-colors"
          >
            Tìm
          </button>
          <button
            onClick={handleReset}
            className="px-3 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/80 h-[38px] rounded-lg text-sm font-bold transition-colors"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts?: Record<string, number>;
}

export function OrderTabs({
  activeTab,
  onTabChange,
  counts = {},
}: OrderTabsProps) {
  const tabs = [
    { label: "Tất cả", key: "ALL" },
    { label: "Chờ thanh toán", key: "PENDING_PAYMENT" },
    { label: "Chờ xác nhận", key: "PROCESSING" },
    { label: "Chờ lấy hàng", key: "SHIPPING" }, // Assuming SHIPPING means ready to ship/shipping
    { label: "Đang giao", key: "DELIVERING" }, // Need mapping check
    { label: "Đã giao", key: "DELIVERED" },
    { label: "Đơn Hủy", key: "CANCELLED" },
    { label: "Trả hàng/Hoàn tiền", key: "RETURNED" },
  ];

  return (
    <div className="mt-2 sticky top-0 bg-[#f6f7f8] dark:bg-[#101922] z-10 pt-2">
      <div className="flex border-b border-gray-200 dark:border-[#2b3a4a] gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(tab.key)}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 px-2 min-w-max transition-colors ${
              activeTab === tab.key
                ? "border-b-primary text-primary"
                : "border-b-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            <p className="text-sm font-bold">
              {tab.label}
              {/* {counts[tab.key] > 0 && ` (${counts[tab.key]})`} */}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
