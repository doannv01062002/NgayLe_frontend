"use client";

import Link from "next/link";
import { ProductForm } from "@/features/seller/products/CreateProductForm";

export default function CreateProductPage() {
  return (
    <>
      <nav className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link className="hover:text-primary" href="/seller">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link className="hover:text-primary" href="/seller/products">
          Quản lý sản phẩm
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="font-medium text-gray-900 dark:text-white">
          Thêm sản phẩm mới
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Thêm sản phẩm mới
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Vui lòng điền đầy đủ thông tin để sản phẩm được hiển thị tốt nhất.
        </p>
      </div>

      <ProductForm />
    </>
  );
}
