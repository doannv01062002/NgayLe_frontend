import Link from "next/link";

export function ShopNav() {
  return (
    <div className="sticky top-[60px] z-40 bg-white border-b border-[#e6dbdb] shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 overflow-x-auto hide-scrollbar">
        <div className="flex gap-8 min-w-max">
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Dạo</p>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-sm"></span>
          </Link>
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-gray-600 hover:text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Tất cả sản phẩm</p>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-primary/20 rounded-t-sm transition-colors"></span>
          </Link>
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-gray-600 hover:text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Sản phẩm mới</p>
          </Link>
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-gray-600 hover:text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Bộ sưu tập</p>
          </Link>
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-gray-600 hover:text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Mã giảm giá</p>
          </Link>
          <Link
            href="#"
            className="relative flex flex-col items-center justify-center text-gray-600 hover:text-primary py-3 px-1 group"
          >
            <p className="text-sm font-bold leading-normal">Hồ sơ Shop</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
