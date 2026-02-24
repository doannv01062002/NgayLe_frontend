import Link from "next/link";

export function SellerHeader() {
  return (
    <header className="h-16 bg-white dark:bg-[#1a2632] border-b border-gray-200 dark:border-[#2b3a4a] px-6 flex items-center justify-between shrink-0 z-20 sticky top-0">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Tổng quan hoạt động
      </h2>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2b3a4a] rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full ring-2 ring-white dark:ring-[#1a2632]"></span>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2b3a4a] rounded-full transition-colors">
          <span className="material-symbols-outlined">chat</span>
        </button>
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-[#344558]"></div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2b3a4a] py-1.5 px-3 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-[#344558] transition-all">
          <span>Nguyễn Văn A</span>
          <span className="material-symbols-outlined text-gray-400">
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}
