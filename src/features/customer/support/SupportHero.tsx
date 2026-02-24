import Link from "next/link";

interface SupportHeroProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

export function SupportHero({ onSearch, searchTerm }: SupportHeroProps) {
  return (
    <div className="bg-white dark:bg-[#1a2634] border-b border-gray-100 dark:border-gray-800 pb-8 pt-6">
      <div className="max-w-[960px] mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link className="hover:text-primary transition-colors" href="/">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-gray-900 dark:text-white font-medium">
            Trung tâm trợ giúp
          </span>
        </div>
        {/* Heading & Search */}
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Xin chào, chúng tôi có thể giúp gì cho bạn?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Tra cứu thông tin về đơn hàng, chính sách đổi trả và hơn thế nữa.
            </p>
          </div>
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary text-[28px]">
                search
              </span>
            </div>
            <input
              className="w-full h-14 pl-14 pr-4 rounded-xl border-2 border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-lg placeholder-gray-400 focus:border-primary focus:bg-white dark:focus:bg-gray-900 focus:ring-0 transition-all shadow-sm focus:outline-none"
              placeholder="Nhập từ khóa (ví dụ: 'hoàn tiền', 'mã giảm giá', 'giao hàng cham'...)"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="absolute right-2 top-2 h-10 px-6 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
