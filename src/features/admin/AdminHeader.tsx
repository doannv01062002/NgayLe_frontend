import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="flex-shrink-0 h-16 bg-white dark:bg-[#1a2632] border-b border-[#e7edf3] dark:border-[#2b3a4a] flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-lg hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] text-[#4c739a]">
          <span className="material-symbols-outlined">menu</span>
        </button>
        {/* Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <Link
            className="text-[#4c739a] hover:text-primary transition-colors"
            href="/admin"
          >
            Trang chủ
          </Link>
          <span
            className="text-[#4c739a] material-symbols-outlined"
            style={{ fontSize: "16px" }}
          >
            chevron_right
          </span>
          <span className="text-[#0d141b] dark:text-white font-medium">
            Tổng quan hệ thống
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block relative w-64">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4c739a] material-symbols-outlined"
            style={{ fontSize: "20px" }}
          >
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-[#f6f7f8] dark:bg-[#2b3a4a] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary text-[#0d141b] dark:text-white placeholder-[#4c739a] outline-none"
            placeholder="Tìm kiếm đơn hàng, khách hàng..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-full hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] text-[#4c739a] transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              notifications
            </span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] text-[#4c739a] transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              help
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
