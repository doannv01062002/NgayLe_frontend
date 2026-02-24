"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categoryService, Category } from "@/services/categoryService";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FilterSidebarProps {
  basePath?: string;
}

const PRICE_RANGES = [
  { label: "Dưới 100.000₫", min: 0, max: 100000 },
  { label: "100.000₫ - 300.000₫", min: 100000, max: 300000 },
  { label: "300.000₫ - 500.000₫", min: 300000, max: 500000 },
  { label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000 },
  { label: "Trên 1.000.000₫", min: 1000000, max: undefined },
];

export function FilterSidebar({ basePath = "/search" }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCats, setExpandedCats] = useState<number[]>([]);
  // Determine active category
  const activeCategorySlug =
    searchParams.get("categorySlug") ||
    (basePath.startsWith("/category/") ? basePath.split("/category/")[1] : "");

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  // Auto-expand path to active category
  useEffect(() => {
    if (categories.length > 0 && activeCategorySlug) {
      const findPath = (cats: Category[], targetSlug: string): number[] => {
        for (const cat of cats) {
          if (cat.slug === targetSlug) return [cat.categoryId];
          if (cat.children) {
            const path = findPath(cat.children, targetSlug);
            // If found in children, return current + child path,
            // BUT we strictly only need to expand parents. The active one expands itself via isActive Check.
            // Actually, expanding the active one is also fine.
            if (path.length > 0) return [cat.categoryId, ...path];
          }
        }
        return [];
      };

      const path = findPath(categories, activeCategorySlug);
      if (path.length > 0) {
        setExpandedCats((prev) => [...Array.from(new Set([...prev, ...path]))]);
      }
    }
  }, [categories, activeCategorySlug]);

  const handleFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const handlePriceRangeChange = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min !== undefined) params.set("minPrice", min.toString());
    else params.delete("minPrice");

    if (max !== undefined) params.set("maxPrice", max.toString());
    else params.delete("maxPrice");

    router.push(`${basePath}?${params.toString()}`);
  };

  const toggleExpand = (catId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCats((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const currentRating = searchParams.get("rating");
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");

  // Helper to check if a specific range is active
  const isRangeActive = (min?: number, max?: number) => {
    const pMin = currentMinPrice ? Number(currentMinPrice) : undefined;
    const pMax = currentMaxPrice ? Number(currentMaxPrice) : undefined;
    return pMin === min && pMax === max;
  };

  const renderCategory = (cat: Category) => {
    const isActive = activeCategorySlug === cat.slug;
    const isExpanded = expandedCats.includes(cat.categoryId) || isActive;
    const hasChildren = cat.children && cat.children.length > 0;

    const href =
      basePath === "/search"
        ? `/search?categorySlug=${cat.slug}`
        : `/category/${cat.slug}`;

    return (
      <li key={cat.categoryId}>
        <div className="flex items-center group relative">
          {/* Main Link/Action */}
          <div className="flex-1 flex items-center">
            {basePath === "/search" ? (
              <div
                onClick={() => handleFilter("categorySlug", cat.slug)}
                className={cn(
                  "cursor-pointer flex-1 py-2 text-sm transition-colors hover:text-[#d0011b] flex items-center gap-2",
                  isActive ? "font-bold text-[#d0011b]" : "text-gray-600"
                )}
              >
                {/* Optional: Icon indicator */}
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isActive
                      ? "bg-[#d0011b]"
                      : "bg-transparent group-hover:bg-gray-300 transition-colors"
                  )}
                />
                {cat.name}
              </div>
            ) : (
              <Link
                href={href}
                className={cn(
                  "cursor-pointer flex-1 py-2 text-sm transition-colors hover:text-[#d0011b] flex items-center gap-2",
                  isActive ? "font-bold text-[#d0011b]" : "text-gray-600"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isActive
                      ? "bg-[#d0011b]"
                      : "bg-transparent group-hover:bg-gray-300 transition-colors"
                  )}
                />
                {cat.name}
              </Link>
            )}
          </div>

          {/* Expand Toggle */}
          {hasChildren && (
            <button
              onClick={(e) => toggleExpand(cat.categoryId, e)}
              className="p-1 text-gray-400 hover:text-[#d0011b] flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <ul className="pl-4 ml-1 border-l border-gray-100 space-y-0.5 mb-2 animate-in slide-in-from-top-1 duration-200">
            {cat.children!.map((child) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 hidden lg:block">
      {/* Categories */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-900 dark:text-white mb-4">
          <span className="material-symbols-outlined text-lg">list</span> Danh
          mục
        </h3>
        <ul className="space-y-2">
          {/* "All Products" link */}
          <li>
            <div className="flex items-center group relative">
              <div className="flex-1">
                {basePath === "/search" ? (
                  <div
                    onClick={() => handleFilter("categorySlug", null)}
                    className={cn(
                      "cursor-pointer flex-1 py-2 text-sm transition-colors hover:text-[#d0011b] flex items-center gap-2",
                      !activeCategorySlug
                        ? "font-bold text-[#d0011b]"
                        : "text-gray-600"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        !activeCategorySlug
                          ? "bg-[#d0011b]"
                          : "bg-transparent group-hover:bg-gray-300 transition-colors"
                      )}
                    />
                    Tất cả danh mục
                  </div>
                ) : (
                  <Link
                    href="/search"
                    className={cn(
                      "cursor-pointer flex-1 py-2 text-sm transition-colors hover:text-[#d0011b] flex items-center gap-2",
                      !activeCategorySlug
                        ? "font-bold text-[#d0011b]"
                        : "text-gray-600"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        !activeCategorySlug
                          ? "bg-[#d0011b]"
                          : "bg-transparent group-hover:bg-gray-300 transition-colors"
                      )}
                    />
                    Tất cả danh mục
                  </Link>
                )}
              </div>
            </div>
          </li>
          {categories.map((cat) => renderCategory(cat))}
        </ul>
      </div>

      {/* Price Filter - Ranges */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-900 dark:text-white mb-4">
          <span className="material-symbols-outlined text-lg">filter_alt</span>{" "}
          Khoảng giá
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price_range"
              className="text-primary focus:ring-primary"
              checked={!currentMinPrice && !currentMaxPrice}
              onChange={() => handlePriceRangeChange(undefined, undefined)}
            />
            <span className="text-sm text-gray-600">Tất cả</span>
          </label>
          {PRICE_RANGES.map((range, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price_range"
                className="text-primary focus:ring-primary"
                checked={isRangeActive(range.min, range.max)}
                onChange={() => handlePriceRangeChange(range.min, range.max)}
              />
              <span className="text-sm text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white mb-4">
          Đánh giá
        </h3>
        <div className="space-y-2">
          {[5, 4, 3].map((star) => (
            <div
              key={star}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleFilter("rating", star.toString())}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  currentRating === star.toString()
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {currentRating === star.toString() && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <div className="flex text-yellow-400 text-sm">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`material-symbols-outlined text-[16px] ${
                      s <= star ? "fill-current" : "text-gray-300"
                    }`}
                    style={{
                      fontVariationSettings: s <= star ? "'FILL' 1" : "",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 group-hover:text-primary">
                (từ {star} sao)
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
