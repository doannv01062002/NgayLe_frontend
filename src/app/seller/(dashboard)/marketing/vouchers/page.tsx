"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import api from "@/lib/api";
import { Voucher } from "@/types/voucher";

import CreateVoucherModal from "./CreateVoucherModal";

export default function ShopVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchVouchers();
  }, [filterStatus]);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filterStatus !== "all") params.status = filterStatus.toUpperCase();

      const res = await api.get("/v1/shops/me/vouchers", { params });
      setVouchers(res.data.content);
    } catch (error) {
      // Clean error handling, no toast spam
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            Đang diễn ra
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
            Sắp diễn ra
          </span>
        );
      case "ended":
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
            Đã kết thúc
          </span>
        );
      case "paused":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            Tạm dừng
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa Voucher này?")) return;
    try {
      await api.delete(`/v1/shops/me/vouchers/${id}`);
      showToast("Xóa voucher thành công", "success");
      fetchVouchers();
    } catch (error) {
      showToast("Không thể xóa voucher", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/seller/marketing"
              className="text-gray-500 hover:text-primary transition-colors text-sm"
            >
              Marketing
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Mã Giảm Giá
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Danh sách Mã Giảm Giá
          </h2>
        </div>
        <button
          onClick={() => {
            setSelectedVoucher(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#d0011b] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#b50118] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Tạo Voucher Mới
        </button>
      </div>

      <CreateVoucherModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedVoucher(null);
        }}
        onSuccess={fetchVouchers}
        voucherToEdit={selectedVoucher}
      />

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-gray-200 dark:border-[#2b3a4a] flex gap-4 overflow-x-auto">
        {["all", "running", "upcoming", "ended", "paused"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
              filterStatus === status
                ? "bg-red-50 text-primary border border-red-100"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#2b3a4a]"
            }`}
          >
            {status === "all"
              ? "Tất cả"
              : status === "running"
              ? "Đang diễn ra"
              : status === "upcoming"
              ? "Sắp diễn ra"
              : status === "ended"
              ? "Đã kết thúc"
              : "Tạm dừng"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-[#2b3a4a] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : vouchers.length === 0 ? (
          <div className="text-center p-12 text-gray-500">
            Chưa có mã giảm giá nào. Hãy tạo mã đầu tiên!
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#202e3b] text-xs font-bold text-gray-500 uppercase">
                <th className="px-6 py-4">Tên Voucher | Mã</th>
                <th className="px-6 py-4">Loại giảm giá</th>
                <th className="px-6 py-4">Tổng lượt dùng</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2b3a4a]">
              {vouchers.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-[#202e3b]/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          v.type === "SHIPPING"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {v.type === "SHIPPING" ? (
                          <span className="material-symbols-outlined text-[20px]">
                            local_shipping
                          </span>
                        ) : v.discountType === "PERCENTAGE" ? (
                          "%"
                        ) : (
                          "$"
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white line-clamp-1">
                          {v.name}
                        </div>
                        <div className="text-xs text-primary font-mono mt-0.5">
                          {v.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {v.discountType === "PERCENTAGE"
                        ? `Giảm ${v.discountValue}%`
                        : `Giảm ${new Intl.NumberFormat("vi-VN").format(
                            v.discountValue
                          )}đ`}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {v.conditionDescription}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <span className="font-bold">{v.usageCount}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-500">{v.usageLimit}</span>
                    </div>
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            (v.usageCount / v.usageLimit) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="mb-1">
                      {format(new Date(v.startDate), "dd/MM/yyyy HH:mm", {
                        locale: vi,
                      })}
                    </div>
                    <div className="text-xs text-gray-400">
                      đến{" "}
                      {format(new Date(v.endDate), "dd/MM/yyyy HH:mm", {
                        locale: vi,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(v.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedVoucher(v);
                          setIsCreateModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
    </div>
  );
}
