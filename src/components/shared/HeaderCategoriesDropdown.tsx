"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { categoryService, Category } from "@/services/categoryService";
import { cn } from "@/lib/utils";

export function HeaderCategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <div
      className="relative z-50 group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <div className="flex items-center gap-2 text-yellow-400 hover:text-white transition-colors whitespace-nowrap cursor-pointer py-2">
        <span className="material-symbols-outlined text-[24px]">menu</span>
        <span className="font-bold text-sm uppercase">Danh mục</span>
      </div>

      {/* Mega Menu Container */}
      <div
        className={`absolute top-full left-0 w-[900px] bg-white text-gray-800 shadow-2xl rounded-b-md border-t-2 border-[#d0011b] transition-all duration-200 origin-top flex ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
        style={{ height: "450px" }}
      >
        {/* Left Sidebar: Parent Categories */}
        <div className="w-1/4 bg-gray-50 border-r border-gray-100 overflow-y-auto no-scrollbar py-2">
          {categories.map((cat) => (
            <div
              key={cat.categoryId}
              onMouseEnter={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-3 cursor-pointer flex items-center justify-between text-sm font-medium transition-colors",
                activeCategory?.categoryId === cat.categoryId
                  ? "bg-white text-[#d0011b] border-l-4 border-[#d0011b] shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Icon placeholder if needed, maybe hide for sidebar cleanly or use small icons */}
                {/* 
                         <span className="material-symbols-outlined text-[18px] opacity-70">
                            {cat.iconUrl || "category"}
                         </span> 
                         */}
                {cat.name}
              </div>
              {activeCategory?.categoryId === cat.categoryId && (
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              )}
            </div>
          ))}

          <Link
            href="/categories"
            className="px-4 py-3 cursor-pointer flex items-center gap-3 text-sm font-bold text-[#d0011b] hover:bg-red-50 border-t border-gray-100 mt-2"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-[18px]">
              grid_view
            </span>
            Tất cả danh mục
          </Link>
        </div>

        {/* Right Content: Sub-categories or Featured Items */}
        <div className="w-3/4 p-6 overflow-y-auto">
          {activeCategory ? (
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
                <Link
                  href={`/category/${activeCategory.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-gray-800 hover:text-[#d0011b] flex items-center gap-2"
                >
                  {activeCategory.name}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Check if activeCategory has children */}
              {activeCategory.children && activeCategory.children.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {activeCategory.children.map((child) => (
                    <Link
                      key={child.categoryId}
                      href={`/category/${child.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col items-center gap-2 text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {child.iconUrl && child.iconUrl.startsWith("http") ? (
                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 p-2 flex items-center justify-center group-hover:border-[#d0011b] overflow-hidden">
                          <img
                            src={child.iconUrl}
                            alt={child.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-red-50 text-[#d0011b] flex items-center justify-center group-hover:bg-[#d0011b] group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[32px]">
                            {child.iconUrl || "category"}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#d0011b] line-clamp-2">
                        {child.name}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <span className="material-symbols-outlined text-3xl">
                      sentiment_satisfied
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    Các sản phẩm nổi bật của {activeCategory.name} đang được cập
                    nhật.
                  </p>
                  <Link
                    href={`/category/${activeCategory.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-6 py-2 bg-[#d0011b] text-white rounded-full font-medium hover:bg-[#b00117] transition-colors"
                  >
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Chọn một danh mục để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
