export function RegisterSidebar() {
  return (
    <div className="lg:col-span-1 space-y-6 font-sans">
      {/* Info Card */}
      <div className="bg-gradient-to-br from-[#FFF5F5] to-white dark:from-[#2a1414] dark:to-[#1a0a0a] rounded-xl p-5 border border-primary/20 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors"></div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-3 relative z-10">
          Lợi ích khi đăng ký ngay
        </h4>
        <ul className="space-y-3 relative z-10">
          <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">
              check_circle
            </span>
            <span>Miễn phí cố định trong 30 ngày đầu tiên.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">
              check_circle
            </span>
            <span>Ưu tiên hiển thị sản phẩm dịp Lễ Tết.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">
              check_circle
            </span>
            <span>Hỗ trợ 1-1 từ đội ngũ CSKH.</span>
          </li>
        </ul>
      </div>
      {/* Guidelines */}
      <div className="bg-white dark:bg-[#2a1414] rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500">
            menu_book
          </span>
          Hướng dẫn đặt tên Shop
        </h4>
        <div className="space-y-4">
          <div className="flex gap-3 text-sm">
            <div className="min-w-6 text-green-600 dark:text-green-400 font-bold">
              Nên:
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Sử dụng tên thương hiệu chính thức, ngắn gọn, dễ nhớ (Ví dụ: Áo
              Dài NgayLe).
            </p>
          </div>
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex gap-3 text-sm">
            <div className="min-w-6 text-primary font-bold">Tránh:</div>
            <p className="text-gray-600 dark:text-gray-400">
              Sử dụng từ khóa gây nhầm lẫn như &quot;Official&quot;, &quot;Việt
              Nam&quot; nếu chưa được cấp phép.
            </p>
          </div>
        </div>
        <a
          className="inline-flex items-center gap-1 text-sm text-primary font-semibold mt-4 hover:underline"
          href="#"
        >
          Xem chi tiết quy định
          <span className="material-symbols-outlined text-base">
            open_in_new
          </span>
        </a>
      </div>
    </div>
  );
}
