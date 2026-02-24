"use client";

import { ShopRegisterRequest } from "@/services/shopService";

interface Props {
  formData: ShopRegisterRequest;
  onChange: (field: string, value: string) => void;
}

export function TaxIdentityStep({ formData, onChange }: Props) {
  return (
    <div className="bg-white dark:bg-[#2a1414] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden font-sans">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">badge</span>
          Thông tin thuế & Định danh
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tax Code */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Mã số thuế <span className="text-primary">*</span>
            </label>
            <input
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 transition-shadow outline-none border"
              placeholder="Nhập mã số thuế cá nhân hoặc doanh nghiệp"
              type="text"
              value={formData.taxCode || ""}
              onChange={(e) => onChange("taxCode", e.target.value)}
            />
          </div>

          {/* Identity Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Số CCCD/CMND/Hộ chiếu <span className="text-primary">*</span>
            </label>
            <input
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 transition-shadow outline-none border"
              placeholder="Số giấy tờ tùy thân"
              type="text"
              value={formData.identityNumber || ""}
              onChange={(e) => onChange("identityNumber", e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-200 text-sm rounded-lg flex gap-3">
          <span className="material-symbols-outlined mt-0.5">warning</span>
          <div>
            Lưu ý: Thông tin thuế và định danh phải chính xác để đảm bảo quyền
            lợi khi kinh doanh và nhận thanh toán.
          </div>
        </div>
      </div>
    </div>
  );
}
