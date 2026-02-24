"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { categoryService, Category } from "@/services/categoryService";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-gray-500 hover:text-[#d0011b]">
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">Tất cả danh mục</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase border-l-4 border-[#d0011b] pl-3">
            Danh mục sản phẩm
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-[#d0011b] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.categoryId}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 hover:shadow-md transition-shadow group border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#d0011b] group-hover:bg-[#d0011b] group-hover:text-white transition-colors">
                    {cat.iconUrl && cat.iconUrl.startsWith("http") ? (
                      <img
                        src={cat.iconUrl}
                        alt={cat.name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[32px]">
                        {cat.iconUrl || "category"}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-gray-800 text-center group-hover:text-[#d0011b] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
