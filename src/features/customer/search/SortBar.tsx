"use client";

import { cn } from "@/lib/utils";

interface SortBarProps {
  sort: string;
  onSort: (value: string) => void;
}

export function SortBar({ sort, onSort }: SortBarProps) {
  return (
    <div className="bg-[#ededed] p-2 rounded-sm mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left Group: Label & Buttons */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-gray-550 mr-2">Sắp xếp theo</span>
        <button
          onClick={() => onSort("")}
          className={cn(
            "px-4 py-2 rounded-sm text-sm capitalize transition-colors shadow-sm",
            !sort
              ? "bg-[#d0011b] text-white hover:bg-[#b00117]"
              : "bg-white text-gray-800 hover:bg-gray-50"
          )}
        >
          Liên quan
        </button>
        <button
          onClick={() => onSort("createdAt,desc")}
          className={cn(
            "px-4 py-2 rounded-sm text-sm capitalize transition-colors shadow-sm",
            sort === "createdAt,desc"
              ? "bg-[#d0011b] text-white hover:bg-[#b00117]"
              : "bg-white text-gray-800 hover:bg-gray-50"
          )}
        >
          Mới nhất
        </button>
        <button
          onClick={() => onSort("soldCount,desc")}
          className={cn(
            "px-4 py-2 rounded-sm text-sm capitalize transition-colors shadow-sm",
            sort === "soldCount,desc"
              ? "bg-[#d0011b] text-white hover:bg-[#b00117]"
              : "bg-white text-gray-800 hover:bg-gray-50"
          )}
        >
          Bán chạy
        </button>
      </div>

      {/* Right Group: Price Dropdown */}
      <div className="relative group min-w-[200px]">
        <div className="flex items-center bg-white rounded-sm h-[36px] px-3 w-full justify-between cursor-pointer shadow-sm border border-transparent hover:border-gray-200">
          <span
            className={cn(
              "text-sm",
              sort.startsWith("basePrice") ? "text-[#d0011b]" : "text-gray-700"
            )}
          >
            {sort === "basePrice,asc"
              ? "Giá: Thấp đến Cao"
              : sort === "basePrice,desc"
              ? "Giá: Cao đến Thấp"
              : "Giá"}
          </span>
          <span className="material-symbols-outlined text-[16px]">
            expand_more
          </span>
        </div>

        <div className="absolute top-full right-0 left-0 bg-white shadow-md border border-gray-100 rounded-sm hidden group-hover:block z-20 py-1 mt-0.5">
          <div
            onClick={() => onSort("basePrice,asc")}
            className="px-3 py-2 text-sm hover:text-[#d0011b] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Giá: Thấp đến Cao
          </div>
          <div
            onClick={() => onSort("basePrice,desc")}
            className="px-3 py-2 text-sm hover:text-[#d0011b] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Giá: Cao đến Thấp
          </div>
        </div>
      </div>
    </div>
  );
}
