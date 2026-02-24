import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import { Voucher } from "@/types/voucher";

interface CreateVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  voucherToEdit?: Voucher | null;
}

type CreateVoucherForm = {
  code: string;
  name: string;
  description: string;
  type: string;
  discountType: string;
  discountValue: number;
  maxDiscountAmount: number;
  minOrderValue: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
};

const formatNumber = (value: number | string | undefined) => {
  if (!value) return "";
  return new Intl.NumberFormat("vi-VN").format(Number(value));
};

const parseNumber = (value: string) => {
  return value.replace(/\./g, "").replace(/,/g, "");
};

export default function CreateVoucherModal({
  isOpen,
  onClose,
  onSuccess,
  voucherToEdit,
}: CreateVoucherModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateVoucherForm>({
    defaultValues: {
      type: "STOREFRONT",
      discountType: "PERCENTAGE",
      usageLimit: 100,
      minOrderValue: 0,
      discountValue: 0,
      maxDiscountAmount: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const discountType = watch("discountType");

  useEffect(() => {
    if (isOpen) {
      if (voucherToEdit) {
        reset({
          code: voucherToEdit.code,
          name: voucherToEdit.name,
          description: voucherToEdit.description || "",
          type: voucherToEdit.type,
          discountType: voucherToEdit.discountType,
          discountValue: voucherToEdit.discountValue,
          maxDiscountAmount: voucherToEdit.maxDiscountAmount || 0,
          minOrderValue: voucherToEdit.minOrderValue || 0,
          usageLimit: voucherToEdit.usageLimit,
          startDate: voucherToEdit.startDate, // Assuming API returns ISO string format compatible or needs slice for datetime-local?
          endDate: voucherToEdit.endDate,
        });
      } else {
        reset({
          code: "",
          name: "",
          description: "",
          type: "STOREFRONT",
          discountType: "PERCENTAGE",
          discountValue: 0,
          maxDiscountAmount: 0,
          minOrderValue: 0,
          usageLimit: 100,
          startDate: "",
          endDate: "",
        });
      }
    }
  }, [isOpen, voucherToEdit, reset]);

  const onSubmit = async (data: CreateVoucherForm) => {
    setLoading(true);
    try {
      if (voucherToEdit) {
        await api.put(`/v1/shops/me/vouchers/${voucherToEdit.id}`, data);
        showToast("Cập nhật voucher thành công", "success");
      } else {
        await api.post("/v1/shops/me/vouchers", data);
        showToast("Tạo voucher thành công", "success");
      }
      reset();
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Có lỗi xảy ra";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-[#1a2632] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-[#2b3a4a]"
                >
                  {voucherToEdit ? "Chỉnh sửa Voucher" : "Tạo Voucher Mới"}
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mã Voucher
                      </label>
                      <input
                        {...register("code", {
                          required: "Mã không được để trống",
                          maxLength: { value: 20, message: "Tối đa 20 ký tự" },
                        })}
                        disabled={!!voucherToEdit}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary uppercase ${
                          voucherToEdit ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        placeholder="VD: SHOP30K"
                      />
                      {errors.code && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.code.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tên Voucher
                      </label>
                      <input
                        {...register("name", {
                          required: "Tên không được để trống",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="VD: Giảm 30k cho đơn từ 200k"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loại Voucher
                      </label>
                      <select
                        {...register("type")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      >
                        <option value="STOREFRONT">Voucher Shop</option>
                        <option value="SHIPPING">Voucher Vận Chuyển</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Lượt dùng tối đa
                      </label>
                      <Controller
                        name="usageLimit"
                        control={control}
                        rules={{ required: true, min: 1 }}
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                            value={formatNumber(value)}
                            onChange={(e) => {
                              const rawValue = parseNumber(e.target.value);
                              if (!isNaN(Number(rawValue))) {
                                onChange(Number(rawValue));
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      {...register("description")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      rows={2}
                    />
                  </div>

                  {/* Type & Discount */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Loại giảm giá
                      </label>
                      <select
                        {...register("discountType")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      >
                        <option value="PERCENTAGE">Theo Phần Trăm (%)</option>
                        <option value="FIXED_AMOUNT">Số Tiền Cố Định</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mức giảm {discountType === "PERCENTAGE" ? "(%)" : "(đ)"}
                      </label>
                      <Controller
                        name="discountValue"
                        control={control}
                        rules={{ required: true, min: 1 }}
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                            value={formatNumber(value)}
                            onChange={(e) => {
                              const rawValue = parseNumber(e.target.value);
                              if (!isNaN(Number(rawValue))) {
                                onChange(Number(rawValue));
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Giảm tối đa (đ)
                      </label>
                      <Controller
                        name="maxDiscountAmount"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary disabled:opacity-50"
                            placeholder={
                              discountType === "FIXED_AMOUNT"
                                ? "Không áp dụng"
                                : ""
                            }
                            disabled={discountType === "FIXED_AMOUNT"}
                            value={
                              discountType === "FIXED_AMOUNT"
                                ? ""
                                : formatNumber(value)
                            }
                            onChange={(e) => {
                              const rawValue = parseNumber(e.target.value);
                              if (!isNaN(Number(rawValue))) {
                                onChange(Number(rawValue));
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Đơn tối thiểu (đ)
                      </label>
                      <Controller
                        name="minOrderValue"
                        control={control}
                        rules={{ required: true, min: 0 }}
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                            value={formatNumber(value)}
                            onChange={(e) => {
                              const rawValue = parseNumber(e.target.value);
                              if (!isNaN(Number(rawValue))) {
                                onChange(Number(rawValue));
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bắt đầu
                      </label>
                      <input
                        type="datetime-local"
                        step="1"
                        {...register("startDate", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Kết thúc
                      </label>
                      <input
                        type="datetime-local"
                        step="1"
                        {...register("endDate", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#2b3a4a] dark:bg-[#101922] dark:text-white rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3 border-t pt-4 dark:border-[#2b3a4a]">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center rounded-lg border border-transparent bg-[#d0011b] px-4 py-2 text-sm font-medium text-white hover:bg-[#b50118] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50"
                    >
                      {loading
                        ? "Đang xử lý..."
                        : voucherToEdit
                        ? "Cập nhật"
                        : "Tạo Voucher"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
