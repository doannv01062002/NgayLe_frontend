"use client";

import { useState } from "react";
import { VoucherStats } from "@/features/admin/vouchers/VoucherStats";
import { VoucherTable } from "@/features/admin/vouchers/VoucherTable";
import { VoucherFormModal } from "@/features/admin/vouchers/VoucherFormModal";
import { Voucher } from "@/types/voucher";

export default function AdminVouchersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Tổng quan Voucher
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Tạo và phân bổ các mã giảm giá cho các chiến dịch Lễ Tết, Giáng Sinh
            hoặc sự kiện đặc biệt. Quản lý ngân sách và hiệu quả sử dụng.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary hover:bg-blue-600 text-white h-12 px-6 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Tạo Voucher Mới</span>
        </button>
      </div>

      <VoucherStats key={refreshKey} />

      <VoucherTable refreshKey={refreshKey} onEdit={handleEdit} />

      <VoucherFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        voucherToEdit={editingVoucher}
      />
    </>
  );
}
