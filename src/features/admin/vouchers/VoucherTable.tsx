"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { voucherService } from "@/services/voucher.service";
import { Voucher } from "@/types/voucher";

interface VoucherTableProps {
  refreshKey: number;
  onEdit: (voucher: Voucher) => void;
}

export function VoucherTable({ refreshKey, onEdit }: VoucherTableProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [typeFilter, setTypeFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const data = await voucherService.getVouchers({
        page,
        size: 10,
        status: activeTab === "all" ? "" : activeTab,
        type: typeFilter === "TYPE_ALL" ? "" : typeFilter,
        keyword: keyword,
        date: dateFilter,
      });
      setVouchers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch vouchers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [page, activeTab, typeFilter, dateFilter, refreshKey]); // Refresh when these change

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchVouchers();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        await voucherService.deleteVoucher(id);
        fetchVouchers();
      } catch (error) {
        console.error("Failed to delete", error);
        alert("Xóa thất bại");
      }
    }
  };

  const handleTogglePause = async (id: number) => {
    try {
      await voucherService.togglePause(id);
      fetchVouchers();
    } catch (error) {
      console.error("Failed to toggle pause", error);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Tabs & Filter Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        {/* Tabs */}
        <div className="flex px-6 pt-4 gap-8 overflow-x-auto">
          {["all", "running", "upcoming", "ended"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
              }}
              className={cn(
                "pb-4 border-b-[3px] font-medium text-sm tracking-wide whitespace-nowrap transition-colors capitalize",
                activeTab === tab
                  ? "border-primary text-gray-900 dark:text-white font-bold"
                  : "border-transparent text-gray-500 hover:text-primary dark:text-gray-400"
              )}
            >
              {tab === "all"
                ? "Tất cả"
                : tab === "running"
                ? "Đang hoạt động"
                : tab === "upcoming"
                ? "Sắp diễn ra"
                : "Đã kết thúc"}
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Filter Row */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50/50 dark:bg-gray-800/30">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </span>
          <input
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Tìm theo tên/mã..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Filter Type */}
        <div className="relative">
          <select
            className="w-full h-10 pl-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-primary focus:border-primary appearance-none cursor-pointer"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Loại hình: Tất cả</option>
            <option value="SHIPPING">Nền tảng (Shipping)</option>
            <option value="STOREFRONT">Theo Shop (Shop Voucher)</option>
            <option value="REDEEM">Giảm giá (Redeem)</option>
          </select>
          <span className="absolute right-3 top-2.5 pointer-events-none text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              expand_more
            </span>
          </span>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              calendar_today
            </span>
          </span>
          <input
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Thời gian hiệu lực"
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(0);
            }}
          />
        </div>
        {/* Clear Filter */}
        <button
          onClick={() => {
            setKeyword("");
            setTypeFilter("");
            setDateFilter("");
            setActiveTab("all");
            fetchVouchers();
          }}
          className="h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">
            filter_alt_off
          </span>
          Xóa bộ lọc
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-500">
            Loading...
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-800">
                <th className="py-4 pl-6 pr-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Tên Voucher / Mã
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Loại &amp; Điều kiện
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Đã dùng / Tổng
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Thời gian
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Trạng thái
                </th>
                <th className="py-4 px-4 pr-6 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {vouchers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Không tìm thấy voucher nào.
                  </td>
                </tr>
              )}
              {vouchers.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <td className="py-4 pl-6 pr-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "size-10 rounded-lg flex items-center justify-center shrink-0",
                          v.colorClass ||
                            "bg-gray-100 dark:bg-gray-800 text-gray-600"
                        )}
                      >
                        <span className="material-symbols-outlined">
                          {v.type === "REDEEM" && "redeem"}
                          {v.type === "SHIPPING" && "local_shipping"}
                          {v.type === "STOREFRONT" && "storefront"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {v.name}
                        </span>
                        <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded mt-1 w-fit">
                          {v.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {v.discountType === "FIXED_AMOUNT"
                          ? `${v.discountValue?.toLocaleString()}đ`
                          : `Giảm ${
                              v.discountValue
                            }% (Max ${v.maxDiscountAmount?.toLocaleString()}đ)`}
                      </span>
                      <span className="text-xs text-gray-500">
                        {v.conditionDescription}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 w-24">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {v.usageCount?.toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          / {v.usageLimit?.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            v.status === "running"
                              ? "bg-primary"
                              : "bg-gray-500"
                          )}
                          style={{
                            width: `${(v.usageCount / v.usageLimit) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-900 dark:text-white flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-gray-400">
                          start
                        </span>
                        {new Date(v.startDate).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="text-xs text-gray-900 dark:text-white flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-gray-400">
                          event_busy
                        </span>
                        {new Date(v.endDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {v.status === "running" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                        Đang chạy
                      </span>
                    )}
                    {v.status === "upcoming" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                        <span className="size-1.5 rounded-full bg-amber-500"></span>
                        Sắp diễn ra
                      </span>
                    )}
                    {v.status === "ended" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        Đã kết thúc
                      </span>
                    )}
                    {v.status === "paused" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700">
                        Tạm dừng
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button
                        onClick={() => onEdit(v)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleTogglePause(v.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"
                        title={v.isActive ? "Tạm dừng" : "Tiếp tục"}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {v.isActive ? "pause" : "play_arrow"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-500"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages || 1}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
