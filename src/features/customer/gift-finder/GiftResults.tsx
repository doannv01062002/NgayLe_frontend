"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

type Product = {
  productId: number;
  name: string;
  basePrice: number;
  promotionalPrice?: number;
  rating: number;
  imageUrls?: string[];
  reviewCount?: number;
};

export function GiftResults() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState("rating");

  const recipient = searchParams.get("recipient") || "Người thương";
  const occasion = searchParams.get("occasion");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    fetchProducts();
  }, [recipient, occasion, minPrice, maxPrice, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: 0,
        size: 20,
        sort: sort,
      };
      if (recipient) params.recipient = recipient;
      if (occasion) params.occasion = occasion;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/v1/gift-suggestions", { params });
      setProducts(res.data.content);
      setTotalElements(res.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch gift suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getDiscount = (original: number, current?: number) => {
    if (!current || current >= original) return null;
    const percent = Math.round(((original - current) / original) * 100);
    return `-${percent}%`;
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Grid Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Gợi ý hàng đầu cho &quot;{recipient}&quot;
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tìm thấy {totalElements} kết quả phù hợp
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Sắp xếp:
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm font-semibold text-slate-700 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="rating">Phù hợp nhất</option>
            <option value="price_asc">Giá thấp đến cao</option>
            <option value="price_desc">Giá cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          Không tìm thấy sản phẩm phù hợp. Hãy thử thay đổi bộ lọc.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              href={`/products/${product.productId}`}
              key={product.productId}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-[#1e1425] border border-slate-100 dark:border-white/5"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={
                    product.imageUrls?.[0] ||
                    "https://placehold.co/400x400?text=No+Image"
                  }
                  alt={product.name}
                />
                {product.promotionalPrice &&
                  product.promotionalPrice < product.basePrice && (
                    <div className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm bg-red-500">
                      {getDiscount(product.basePrice, product.promotionalPrice)}
                    </div>
                  )}
                <button className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-400 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-black/50 dark:hover:bg-black/70">
                  <span className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                </button>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-primary/90 py-2 text-center text-xs font-bold text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 text-decoration-none">
                  Thêm vào giỏ
                </div>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h3 className="mb-1 line-clamp-2 text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex flex-col gap-1">
                  {product.promotionalPrice &&
                    product.promotionalPrice < product.basePrice && (
                      <div className="flex items-center gap-1 text-xs text-slate-400 line-through">
                        {formatPrice(product.basePrice)}
                      </div>
                    )}
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-primary">
                      {formatPrice(
                        product.promotionalPrice || product.basePrice
                      )}
                    </span>
                    <div className="flex items-center gap-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[12px] text-yellow-400 fill-current">
                        star
                      </span>
                      {product.rating || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
