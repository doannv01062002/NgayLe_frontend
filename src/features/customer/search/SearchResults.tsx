"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { productService, Product } from "@/services/productService";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { SortBar } from "./SortBar";

export function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("categorySlug") || "";
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const rating = searchParams.get("rating")
    ? Number(searchParams.get("rating"))
    : undefined;
  const sort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getAllProducts(
          0,
          20,
          query,
          categorySlug,
          minPrice,
          maxPrice,
          rating,
          sort
        );
        setProducts(data.content);
        setTotal(data.totalElements);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, categorySlug, minPrice, maxPrice, rating, sort]);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex-1 min-w-0">
      <SortBar sort={sort} onSort={handleSort} />

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] bg-white rounded-lg">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed">
          <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
            search_off
          </span>
          <p className="text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <Link
              key={product.productId}
              href={`/products/${product.productId}`}
              className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-transparent hover:border-primary hover:shadow-lg transition-all duration-200 group flex flex-col overflow-hidden relative"
            >
              {/* Badges */}
              {(() => {
                const price = product.promotionalPrice || product.basePrice;
                let comparePrice = null;

                if (
                  product.promotionalPrice &&
                  product.promotionalPrice < product.basePrice
                ) {
                  comparePrice = product.basePrice;
                } else if (
                  product.originalPrice &&
                  product.originalPrice > product.basePrice
                ) {
                  comparePrice = product.originalPrice;
                } else if (product.variants && product.variants.length > 0) {
                  const v = product.variants[0];
                  if (
                    v.originalPrice &&
                    v.originalPrice > (v.price || product.basePrice)
                  ) {
                    comparePrice = v.originalPrice;
                  }
                }

                if (comparePrice && comparePrice > price && price > 0) {
                  return (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-red-700 text-xs font-bold px-2 py-1 z-10 rounded-bl-lg">
                      Sale, -
                      {Math.round(
                        ((comparePrice - price) / comparePrice) * 100
                      )}
                      %
                    </div>
                  );
                }
                return null;
              })()}

              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  src={product.imageUrls?.[0] || "/placeholder.png"}
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary/90 py-2 text-center text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer text-sm font-medium">
                  Xem chi tiết
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
                <h3
                  className="text-sm font-medium text-slate-900 dark:text-white truncate mb-2 group-hover:text-primary transition-colors"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const price =
                        product.promotionalPrice || product.basePrice;
                      let comparePrice = null;

                      if (
                        product.promotionalPrice &&
                        product.promotionalPrice < product.basePrice
                      ) {
                        comparePrice = product.basePrice;
                      } else if (
                        product.originalPrice &&
                        product.originalPrice > product.basePrice
                      ) {
                        comparePrice = product.originalPrice;
                      } else if (
                        product.variants &&
                        product.variants.length > 0
                      ) {
                        const v = product.variants[0];
                        if (
                          v.originalPrice &&
                          v.originalPrice > (v.price || product.basePrice)
                        ) {
                          comparePrice = v.originalPrice;
                        }
                      }

                      return (
                        <>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(price)}
                          </span>
                          {comparePrice && comparePrice > price && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatCurrency(comparePrice)}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center text-yellow-400">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-0.5">
                        {product.rating}
                      </span>
                    </div>
                    <span>Đã bán 0</span>
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
