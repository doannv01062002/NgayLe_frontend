"use client";

import { ShopRegisterRequest } from "@/services/shopService";

interface Props {
  formData: ShopRegisterRequest;
  onChange: (field: string, value: string) => void;
}

export function ShippingStep() {
  return (
    <div className="bg-white dark:bg-[#2a1414] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden font-sans">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            local_shipping
          </span>
          Phương thức vận chuyển
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-1">
            info
          </span>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p className="font-bold text-gray-800 dark:text-white mb-1">
              Đơn vị vận chuyển liên kết
            </p>
            Hiện tại Ngayle.com hỗ trợ vận chuyển qua các đối tác: Giao Hàng
            Nhanh, Viettel Post, Ninja Van.
            <br />
            Bạn có thể cấu hình chi tiết sau khi đăng ký thành công.
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <input
              type="checkbox"
              defaultChecked
              className="size-5 accent-primary"
            />
            <div className="flex-1">
              <div className="font-bold text-gray-800 dark:text-white">
                Vận chuyển Tiêu chuẩn
              </div>
              <div className="text-sm text-gray-500">
                Kích hoạt tất cả các đơn vị vận chuyển được hỗ trợ
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
