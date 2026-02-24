"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { productService, Product } from "@/services/productService";
import { formatCurrency } from "@/lib/utils";

interface SimilarProductsProps {
  categorySlug?: string;
  currentProductId?: number;
}

export function SimilarProducts({
  categorySlug,
  currentProductId,
}: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!categorySlug) return;
      try {
        setLoading(true);
        // Fetch products in same category.
        const data = await productService.getAllProducts(
          0,
          5,
          "",
          categorySlug
        );
        // Filter out current product
        const filtered = data.content
          .filter((p) => p.productId !== currentProductId)
          .slice(0, 4);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [categorySlug, currentProductId]);

  if (loading) {
    return (
      <div className="hidden lg:block lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-4 sticky top-24">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Or show empty state, or just hide
  }

  return (
    <div className="hidden lg:block lg:col-span-1 space-y-6">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-4 sticky top-24">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">
          Sản phẩm tương tự
        </h3>
        <div className="flex flex-col gap-4">
          {products.map((prod) => (
            <Link
              key={prod.productId}
              className="group flex gap-3 hover:bg-slate-50 p-2 rounded transition-colors"
              href={`/products/${prod.productId}`}
            >
              <div className="w-16 h-16 rounded bg-slate-100 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src={
                    prod.imageUrls && prod.imageUrls.length > 0
                      ? prod.imageUrls[0]
                      : "https://via.placeholder.com/100"
                  }
                  alt={prod.name}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4
                  className="text-sm font-medium truncate group-hover:text-[#d0011b] transition-colors"
                  title={prod.name}
                >
                  {prod.name}
                </h4>
                <div className="flex flex-col">
                  {(() => {
                    const price = prod.promotionalPrice || prod.basePrice;
                    let comparePrice = null;

                    if (
                      prod.promotionalPrice &&
                      prod.promotionalPrice < prod.basePrice
                    ) {
                      comparePrice = prod.basePrice;
                    } else if (
                      prod.originalPrice &&
                      prod.originalPrice > prod.basePrice
                    ) {
                      comparePrice = prod.originalPrice;
                    } else if (prod.variants && prod.variants.length > 0) {
                      const v = prod.variants[0];
                      if (
                        v.originalPrice &&
                        v.originalPrice > (v.price || prod.basePrice)
                      ) {
                        comparePrice = v.originalPrice;
                      }
                    }

                    return (
                      <>
                        <span className="text-[#d0011b] font-bold text-sm">
                          {formatCurrency(price)}
                        </span>
                        {comparePrice && comparePrice > price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatCurrency(comparePrice)}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
