export function ShopFilters() {
  return (
    <aside className="hidden lg:flex flex-col w-56 gap-6 shrink-0">
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-sm flex items-center gap-2 text-gray-800">
          <span className="material-symbols-outlined text-[18px]">list</span>{" "}
          Danh Mục
        </h4>
        <ul className="flex flex-col text-sm gap-2 pl-2">
          <li className="font-bold text-primary cursor-pointer flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] filled-icon">
              arrow_right
            </span>{" "}
            Sản phẩm mới
          </li>
          <li className="text-gray-600 hover:text-primary cursor-pointer pl-4">
            Set Quà Tết
          </li>
          <li className="text-gray-600 hover:text-primary cursor-pointer pl-4">
            Bánh Mứt Truyền Thống
          </li>
          <li className="text-gray-600 hover:text-primary cursor-pointer pl-4">
            Đồ Trang Trí Nhà Cửa
          </li>
          <li className="text-gray-600 hover:text-primary cursor-pointer pl-4">
            Bao Lì Xì
          </li>
        </ul>
      </div>
      <div className="h-[1px] bg-gray-200 w-full"></div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-sm flex items-center gap-2 text-gray-800">
          <span className="material-symbols-outlined text-[18px]">
            filter_alt
          </span>{" "}
          Bộ Lọc Tìm Kiếm
        </h4>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-semibold">
            Khoảng Giá
          </span>
          <div className="flex items-center gap-2">
            <input
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
              placeholder="₫ TỪ"
            />
            <span className="text-gray-400">-</span>
            <input
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
              placeholder="₫ ĐẾN"
            />
          </div>
          <button className="bg-primary text-white text-xs font-bold py-1.5 rounded uppercase hover:bg-primary-hover mt-1">
            Áp dụng
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs text-gray-500 font-semibold">Đánh Giá</span>
          <div className="flex flex-col gap-1 text-sm text-gray-600 cursor-pointer">
            <div className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded">
              <span className="flex text-yellow-400 text-xs">
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded">
              <span className="flex text-yellow-400 text-xs">
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px] filled-icon">
                  star
                </span>
                <span className="material-symbols-outlined text-[14px]">
                  star
                </span>
              </span>
              <span className="text-xs text-gray-500">Trở lên</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
