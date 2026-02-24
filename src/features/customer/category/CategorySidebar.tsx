export function CategorySidebar() {
  return (
    <aside className="col-span-12 lg:col-span-2 hidden lg:block space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-sm uppercase">
          <span className="material-symbols-outlined text-[18px]">list</span>
          Danh mục
        </h3>
        <ul className="space-y-2 text-sm pl-2">
          <li>
            <a
              className="text-primary font-bold flex items-center gap-1"
              href="#"
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                arrow_right
              </span>
              Quà tặng Tết
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 dark:text-gray-400 hover:text-primary transition-colors pl-4 block"
              href="#"
            >
              Hộp quà cao cấp
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 dark:text-gray-400 hover:text-primary transition-colors pl-4 block"
              href="#"
            >
              Giỏ quà truyền thống
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 dark:text-gray-400 hover:text-primary transition-colors pl-4 block"
              href="#"
            >
              Rượu vang &amp; Trà
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 dark:text-gray-400 hover:text-primary transition-colors pl-4 block"
              href="#"
            >
              Hạt &amp; Mứt sấy
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 dark:text-gray-400 hover:text-primary transition-colors pl-4 block"
              href="#"
            >
              Lì xì &amp; Phụ kiện
            </a>
          </li>
        </ul>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
      {/* Filter: Location */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">
            filter_alt
          </span>
          Bộ lọc tìm kiếm
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              className="rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="group-hover:text-primary">Hà Nội</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              className="rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="group-hover:text-primary">TP. Hồ Chí Minh</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              className="rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="group-hover:text-primary">Đà Nẵng</span>
          </label>
        </div>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
      {/* Filter: Price Range */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
          Khoảng giá
        </h3>
        <div className="flex items-center gap-2 text-sm mb-2">
          <input
            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:border-primary focus:ring-0"
            placeholder="₫ TỪ"
            type="text"
          />
          <span className="text-gray-400">-</span>
          <input
            className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:border-primary focus:ring-0"
            placeholder="₫ ĐẾN"
            type="text"
          />
        </div>
        <button className="w-full bg-primary text-white text-xs font-bold uppercase py-1.5 rounded hover:bg-[#b00e0e] transition-colors">
          Áp dụng
        </button>
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
      {/* Filter: Rating */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
          Đánh giá
        </h3>
        <div className="space-y-1 text-sm cursor-pointer text-gray-600 dark:text-gray-400">
          {[5, 4, 3].map((star) => (
            <div
              key={star}
              className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1 py-0.5"
            >
              <div className="flex text-yellow-400 text-[14px]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[14px]"
                    style={{
                      fontVariationSettings: s <= star ? "'FILL' 1" : "",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-xs">từ {star} sao</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
