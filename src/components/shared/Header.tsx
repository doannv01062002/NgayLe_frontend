"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeaderCategoriesDropdown } from "./HeaderCategoriesDropdown";
import { HeaderUserActions } from "./HeaderUserActions";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#d0011b] text-white shadow-md">
      <div className="container mx-auto px-4 lg:px-4 max-w-[1240px]">
        {/* Top Row: Logo, Search, Account */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12 py-3 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex items-center justify-center size-10 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors hidden">
              <span
                className="material-symbols-outlined text-yellow-300"
                style={{ fontSize: "28px" }}
              >
                celebration
              </span>
            </div>
            <div className="flex flex-col lg:items-start items-center">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-yellow-400 text-3xl mr-1 transform -rotate-12">
                  celebration
                </span>
                <span className="text-3xl font-black tracking-tighter leading-none">
                  ngayle<span className="text-yellow-400">.com</span>
                </span>
              </div>
              <span className="text-[10px] mobile:text-[9px] font-bold text-white/90 uppercase tracking-[0.2em] ml-1 mt-0.5">
                Quà tặng mọi dịp
              </span>
            </div>
          </Link>

          {/* Search Bar Container */}
          <div className="flex-1 w-full relative">
            <form
              className="flex w-full items-stretch rounded-[4px] bg-white shadow-sm overflow-hidden h-10"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("q") as HTMLInputElement;
                if (input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    input.value.trim()
                  )}`;
                }
              }}
            >
              <input
                name="q"
                className="flex-1 w-full border-none bg-transparent px-4 text-slate-700 placeholder-slate-400 focus:ring-0 focus:outline-none text-sm"
                placeholder="Tìm quà Tết Giáp Thìn... hoặc Ưu đãi 8/3"
                type="text"
                autoComplete="off"
              />
              <button
                className="bg-[#8f0b0b] hover:bg-[#7a0909] text-white w-14 flex items-center justify-center transition-colors cursor-pointer"
                type="submit"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
            {/* Mini Banner / Quick Links Below Search */}
            <div className="hidden lg:flex gap-4 mt-2 text-xs font-normal text-white/90">
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
                title="Voucher giảm 50k"
              >
                Voucher giảm 50k
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
                title="iPhone 15 Pro Max"
              >
                iPhone 15 Pro Max
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
                title="Hộp quà Tết"
              >
                Hộp quà Tết
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-300 transition-colors"
                title="Hoa tươi 8/3"
              >
                Hoa tươi 8/3
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <HeaderUserActions />
        </div>
      </div>

      {/* Bottom Row: Navigation Categories - Full Width Border/Bg tweak if needed */}
      <div className="border-t border-white/10 bg-black/5 w-full">
        <div className="container mx-auto px-4 lg:px-4 max-w-[1240px] flex items-center h-10 text-xs lg:text-sm font-medium relative">
          <HeaderCategoriesDropdown />
          <div className="w-px h-3 bg-white/20 hidden lg:block mx-4"></div>

          <div className="flex-1 flex items-center gap-8 overflow-x-auto no-scrollbar h-full">
            {/* Main Nav */}
            <nav className="hidden lg:flex items-center gap-8 shrink-0">
              <Link
                href="/category/qua-sinh-nhat"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Sinh Nhật
              </Link>
              <Link
                href="/category/qua-cuoi"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Quà Cưới
              </Link>
              <Link
                href="/category/hoa-tuoi"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Hoa Tươi
              </Link>
              <Link
                href="/category/dac-san"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Đặc Sản
              </Link>
              <Link
                href="/gift-finder"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Gợi ý quà tặng
              </Link>
              <Link
                href="/ecard"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Viết thiệp điện tử
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/vouchers"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Mã giảm giá
              </Link>
              {/* <Link
                href="/affiliate"
                className="text-sm font-medium hover:text-yellow-200 transition-colors"
              >
                Affiliate
              </Link> */}
            </nav>

            <Link
              href="/flash-sale"
              className="flex items-center gap-1 text-yellow-400 hover:text-white transition-colors ml-auto whitespace-nowrap font-bold uppercase shrink-0"
            >
              <span className="material-symbols-outlined text-[18px] animate-pulse">
                bolt
              </span>
              Flash Sale
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
