import Link from "next/link";

import { SellerProductTable } from "@/features/seller/products/SellerProductTable";

export default function SellerProductPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link className="hover:text-primary" href="/seller">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-gray-900 dark:text-white">
          Quản lý sản phẩm
        </span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý danh sách, giá cả và tồn kho của shop.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-[#1a2632] dark:border-[#2b3a4a] dark:text-gray-200 dark:hover:bg-[#2b3a4a]/80">
            <span className="material-symbols-outlined mr-2 text-[18px]">
              upload
            </span>
            Nhập Excel
          </button>
          <Link
            href="/seller/products/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">
              add
            </span>
            Thêm sản phẩm mới
          </Link>
        </div>
      </div>

      {/* Main Table Section */}
      <SellerProductTable />
    </>
  );
}
