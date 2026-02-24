import Link from "next/link";

export function AccountSidebar() {
  return (
    <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
      <div className="flex items-center gap-3 pb-6 border-b border-gray-200 dark:border-gray-700 mb-4">
        <div
          className="size-12 rounded-full border border-gray-200 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNiUICX45Ve6r8heQbjO7mzVnSO91f9mdAjVyKRwOYTyOnNkPQpxHtJ_8xbM4Ur_A8N1Kg50tnafpntdlDPNRjLFf40WVaI8U9NmYBxpUFzsGxZ5UdQUW1c6wUa5oylMSKAG3iLv-ihU2F27Qv20qiKa377HjiKtRL9rNec9WljD8klOm7xlIFJXTHVSgvMdcfbGWXgUPMbpuq0gqIJfcATeYtaFrCx43F8ISD-nGTpxGI02DZ_zf-ey7lT2PdC8wX4YaOtdWYkAE')",
          }}
        ></div>
        <div className="flex flex-col">
          <h2 className="font-bold text-gray-900 dark:text-white">Minh Anh</h2>
          <Link
            href="/account/profile"
            className="text-xs text-gray-500 hover:text-primary flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        <Link
          href="/account"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-blue-600 group-hover:text-primary">
            person
          </span>
          <span className="text-sm font-medium">Tài khoản của tôi</span>
        </Link>
        <Link
          href="/account/orders"
          className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-[#2d1b1b] rounded shadow-sm text-primary font-bold"
        >
          <span className="material-symbols-outlined filled">receipt_long</span>
          <span className="text-sm">Đơn mua</span>
        </Link>
        <Link
          href="/account/notifications"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-orange-500 group-hover:text-primary">
            notifications
          </span>
          <span className="text-sm font-medium">Thông báo</span>
        </Link>
        <Link
          href="/account/vouchers"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-primary group-hover:text-primary">
            confirmation_number
          </span>
          <span className="text-sm font-medium">Kho Voucher</span>
        </Link>
        <Link
          href="/account/wishlist"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-red-500 group-hover:text-primary">
            favorite
          </span>
          <span className="text-sm font-medium">Đã thích</span>
        </Link>
      </nav>
    </aside>
  );
}
