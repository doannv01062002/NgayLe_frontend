import Link from "next/link";
import { ProductStats } from "@/features/admin/products/ProductStats";
import { ProductTable } from "@/features/admin/products/ProductTable";

export default function AdminProductPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link className="text-gray-400 hover:text-gray-500" href="/admin">
              <span className="material-symbols-outlined text-xl">home</span>
            </Link>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>
            <Link
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              href="/admin/products"
            >
              Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>
            <span
              aria-current="page"
              className="text-sm font-medium text-primary dark:text-blue-400"
            >
              Tất cả sản phẩm
            </span>
          </li>
        </ol>
      </nav>

      {/* Page Heading */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Quản lý sản phẩm toàn sàn
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Kiểm duyệt, chỉnh sửa và quản lý tất cả các mặt hàng trên hệ thống
            NgayLe.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            className="inline-flex items-center rounded-lg bg-white dark:bg-[#1a2632] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-[#2b3a4a] mr-3"
            type="button"
          >
            <span className="material-symbols-outlined mr-2 -ml-1 text-lg">
              cloud_download
            </span>
            Xuất Excel
          </button>
          <button
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
          >
            <span className="material-symbols-outlined mr-2 -ml-1 text-lg">
              add
            </span>
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <ProductStats />

      {/* Product Table */}
      <ProductTable />
    </>
  );
}
