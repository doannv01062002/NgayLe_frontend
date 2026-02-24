"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { categoryService, Category } from "@/services/categoryService";

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        // Take first 7 categories + "All"
        // Or if you want specific logic, filter here
        setCategories(data.slice(0, 7));
      })
      .catch((e) => console.error("Failed to load categories", e));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-bold uppercase mb-4 tracking-wider">
        Danh mục lễ hội
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
        {categories.map((cat, index) => (
          <Link
            key={cat.categoryId}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            href={`/category/${cat.slug}`}
          >
            <div className="size-14 rounded-xl bg-[#fff0f0] border border-[#f3e7e7] flex items-center justify-center text-[#d0011b] group-hover:bg-[#d0011b] group-hover:text-white transition-colors group-hover:shadow-lg group-hover:-translate-y-1 transform duration-300">
              {cat.iconUrl && cat.iconUrl.startsWith("http") ? (
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="material-symbols-outlined text-[28px]">
                  {cat.iconUrl || "category"}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-center text-gray-700 group-hover:text-[#d0011b] leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
        <Link
          className="flex flex-col items-center gap-2 group cursor-pointer"
          href="/categories"
        >
          <div className="size-14 rounded-xl bg-[#fff0f0] border border-[#f3e7e7] flex items-center justify-center text-[#d0011b] group-hover:bg-[#d0011b] group-hover:text-white transition-colors group-hover:shadow-lg group-hover:-translate-y-1 transform duration-300">
            <span className="material-symbols-outlined text-[28px]">
              grid_view
            </span>
          </div>
          <span className="text-xs font-medium text-center text-gray-700 group-hover:text-[#d0011b] leading-tight">
            Tất Cả
          </span>
        </Link>
      </div>
    </div>
  );
}
