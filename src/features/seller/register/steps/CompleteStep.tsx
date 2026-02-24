"use client";

import Link from "next/link";

export function CompleteStep() {
  return (
    <div className="bg-white dark:bg-[#2a1414] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden font-sans p-10 text-center">
      <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-[40px]">
          check_circle
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Đăng ký thành công!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        Hồ sơ Shop của bạn đã được tạo. Bạn có thể bắt đầu đăng bán sản phẩm
        ngay bây giờ.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/seller"
          className="px-8 h-12 rounded-lg bg-primary hover:bg-[#b00e0e] text-white font-bold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
        >
          Truy cập Kênh Người Bán
        </Link>
      </div>
    </div>
  );
}
