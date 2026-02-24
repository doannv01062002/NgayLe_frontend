import React from "react";
import { BannerPosition } from "@/types/banner";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  position: BannerPosition | "";
  onPositionChange: (pos: BannerPosition | "") => void;
  total: number;
}

export default function BannerFilter({
  activeTab,
  onTabChange,
  position,
  onPositionChange,
  total,
}: Props) {
  const tabs = [
    { id: "ALL", label: `Tất cả (${total})` },
    { id: "ACTIVE", label: "Đang chạy" },
    { id: "SCHEDULED", label: "Đã lên lịch" },
    { id: "ENDED", label: "Đã kết thúc" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={position}
            onChange={(e) =>
              onPositionChange(e.target.value as BannerPosition | "")
            }
            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Vị trí: Tất cả</option>
            {Object.values(BannerPosition).map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
            expand_more
          </span>
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>
    </div>
  );
}
