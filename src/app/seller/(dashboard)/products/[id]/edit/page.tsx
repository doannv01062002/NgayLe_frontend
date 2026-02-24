"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductForm } from "@/features/seller/products/CreateProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = Number(params?.id);

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
          Chỉnh sửa sản phẩm
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Chỉnh sửa sản phẩm
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Cập nhật thông tin sản phẩm.
        </p>
      </div>

      <ProductForm productId={productId} />
    </>
  );
}
