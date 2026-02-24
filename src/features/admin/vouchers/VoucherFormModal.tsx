"use client";

import { useEffect, useState } from "react";
import { CreateVoucherRequest, Voucher } from "@/types/voucher";
import { voucherService } from "@/services/voucher.service";

interface VoucherFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  voucherToEdit?: Voucher | null;
}

const formatNumber = (value: number | undefined) => {
  if (value === undefined || value === null) return "";
  return new Intl.NumberFormat("vi-VN").format(value);
};

const parseNumber = (value: string) => {
  return value.replace(/\./g, "").replace(/,/g, "");
};

export function VoucherFormModal({
  isOpen,
  onClose,
  onSuccess,
  voucherToEdit,
}: VoucherFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateVoucherRequest>({
    code: "",
    name: "",
    description: "",
    type: "REDEEM",
    discountType: "FIXED_AMOUNT",
    discountValue: 0,
    maxDiscountAmount: 0,
    minOrderValue: 0,
    usageLimit: 100,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (voucherToEdit) {
      setFormData({
        code: voucherToEdit.code,
        name: voucherToEdit.name,
        description: voucherToEdit.description || "",
        type: voucherToEdit.type,
        discountType: voucherToEdit.discountType,
        discountValue: voucherToEdit.discountValue,
        maxDiscountAmount: voucherToEdit.maxDiscountAmount || 0,
        minOrderValue: voucherToEdit.minOrderValue || 0,
        usageLimit: voucherToEdit.usageLimit,
        startDate: voucherToEdit.startDate,
        endDate: voucherToEdit.endDate,
      });
    } else {
      const now = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(now.getMonth() + 1);

      setFormData({
        code: "",
        name: "",
        description: "",
        type: "REDEEM",
        discountType: "FIXED_AMOUNT",
        discountValue: 0,
        maxDiscountAmount: 0,
        minOrderValue: 0,
        usageLimit: 100,
        startDate: now.toISOString().slice(0, 16),
        endDate: nextMonth.toISOString().slice(0, 16),
      });
    }
  }, [voucherToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const rawValue = parseNumber(value);
    if (!isNaN(Number(rawValue))) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(rawValue),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (voucherToEdit) {
        await voucherService.updateVoucher(voucherToEdit.id, formData);
      } else {
        await voucherService.createVoucher(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save voucher", error);
      alert("Lỗi khi lưu voucher");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {voucherToEdit ? "Chỉnh sửa Voucher" : "Tạo Voucher Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên Voucher
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Ví dụ: Giảm 50k Đồ Trang Trí Noel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mã Voucher (Code)
            </label>
            <input
              type="text"
              name="code"
              required
              value={formData.code}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase"
              placeholder="NOEL50K"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loại Voucher
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="REDEEM">Giảm giá (Redeem)</option>
              <option value="SHIPPING">Vận chuyển (Shipping)</option>
              <option value="STOREFRONT">Shop Voucher</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loại giảm giá
            </label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="FIXED_AMOUNT">Số tiền cố định</option>
              <option value="PERCENTAGE">Phần trăm (%)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Giá trị giảm{" "}
              {formData.discountType === "PERCENTAGE" ? "(%)" : "(đ)"}
            </label>
            <input
              type="text"
              name="discountValue"
              required
              value={formatNumber(formData.discountValue)}
              onChange={handleNumberChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {formData.discountType === "PERCENTAGE" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giảm tối đa (đ)
              </label>
              <input
                type="text"
                name="maxDiscountAmount"
                value={formatNumber(formData.maxDiscountAmount)}
                onChange={handleNumberChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Đơn tối thiểu (đ)
            </label>
            <input
              type="text"
              name="minOrderValue"
              value={formatNumber(formData.minOrderValue)}
              onChange={handleNumberChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Giới hạn sử dụng
            </label>
            <input
              type="text"
              name="usageLimit"
              required
              value={formatNumber(formData.usageLimit)}
              onChange={handleNumberChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ngày bắt đầu
            </label>
            <input
              type="datetime-local"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ngày kết thúc
            </label>
            <input
              type="datetime-local"
              name="endDate"
              required
              value={formData.endDate}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mô tả
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-sm">
                  progress_activity
                </span>
              )}
              {voucherToEdit ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
