"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

import { Product } from "@/types/product";

export function ShopProductList() {
  const params = useParams();
  const shopId = params?.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) {
      api
        .get(`/v1/shops/${shopId}/products`)
        .then((res) => {
          setProducts(res.data.content || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [shopId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading)
    return <div className="w-full text-center py-8">Đang tải sản phẩm...</div>;

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Sort Bar */}
      <div className="bg-[#ededed] p-3 rounded flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="mr-2">Sắp xếp theo</span>
          <button className="bg-primary text-white px-4 py-1.5 rounded-sm shadow-sm font-medium">
            Phổ Biến
          </button>
          <button className="bg-white hover:bg-gray-50 px-4 py-1.5 rounded-sm shadow-sm">
            Mới Nhất
          </button>
          <button className="bg-white hover:bg-gray-50 px-4 py-1.5 rounded-sm shadow-sm">
            Bán Chạy
          </button>
          <div className="relative bg-white hover:bg-gray-50 px-4 py-1.5 rounded-sm shadow-sm flex items-center justify-between w-40 cursor-pointer group">
            <span>Giá</span>
            <span className="material-symbols-outlined text-[18px]">
              unfold_more
            </span>
          </div>
        </div>
        <div className="text-sm">Hiển thị {products.length} sản phẩm</div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Shop chưa có sản phẩm nào
          </div>
        ) : (
          products.map((product) => (
            <Link
              key={product.productId}
              href={`/products/${product.productId}`}
              className="bg-white rounded border border-transparent hover:border-primary hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full relative"
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-gray-100 rounded-t overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${product.imageUrls?.[0] || ""}')`,
                  }}
                ></div>
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
                      <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-1.5 py-0.5 z-10">
                        -
                        {Math.round(
                          ((comparePrice - price) / comparePrice) * 100
                        )}
                        %
                      </div>
                    );
                  }
                  return null;
                })()}
                <div className="absolute top-2 left-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r-sm shadow-md z-10 w-fit">
                  Yêu thích
                </div>
              </div>
              {/* Content */}
              <div className="p-2.5 flex flex-col flex-1 justify-between gap-2">
                <h3
                  className="text-sm font-medium text-[#181111] leading-snug group-hover:text-primary truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1">
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
                          {comparePrice && comparePrice > price && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatCurrency(comparePrice)}
                            </span>
                          )}
                          <span className="text-base text-primary font-bold">
                            {formatCurrency(price)}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex justify-between items-end mt-1.5 w-full">
                    <div className="flex text-yellow-400 gap-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined leading-none ${
                            i <= (product.rating || 5) ? "filled-icon" : ""
                          }`}
                          style={{ fontSize: "15px" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                      Đã bán {product.soldCount || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-16 right-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <button className="bg-primary text-white p-1.5 rounded-full shadow-md hover:bg-primary-hover">
                  <span className="material-symbols-outlined text-[18px]">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
