"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { homeFeatureService } from "@/services/homeFeature.service";
import { HomeFeatureProduct } from "@/types/home-management";
import { cartService } from "@/services/cartService";
import { AuthResponse } from "@/services/authService";
import { formatCurrency } from "@/lib/utils";

export function SuggestionSection() {
  const [products, setProducts] = useState<HomeFeatureProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));

    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await homeFeatureService.getPublicFeatures(
        "TODAYS_SUGGESTION"
      );
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: HomeFeatureProduct) => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      window.location.href = "/register_login.html?mode=login";
      return;
    }

    // For simplicity, we just add the product ID directly as variant ID might need fetching details
    // Assuming backend handles productId or we fetch variant first.
    // In current simplified flow we might need to alert user to go to detail page
    // Or we assume a default variant exists. Let's redirect to detail page for safe adding if we don't have variant info.

    // Actually, let's keep it simple: Link to detail page for adding.
    window.location.href = `/products/${product.productId}`;
  };

  if (loading)
    return <div className="text-center py-8">Đang tải sản phẩm...</div>;

  if (products.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b pb-4 border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 uppercase border-l-4 border-[#d0011b] pl-3">
            Gợi ý hôm nay
          </h2>
          <span className="material-symbols-outlined text-yellow-500 text-2xl animate-pulse">
            auto_awesome
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
        {products.map((product) => (
          <div
            key={product.id} // This is feature ID
            className="group relative border border-gray-100 rounded-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden flex flex-col"
          >
            <Link
              href={`/products/${product.productId}`}
              className="block overflow-hidden relative pt-[100%]"
            >
              <img
                src={product.productImage || "https://via.placeholder.com/300"}
                alt={product.productName}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <div className="p-3 flex flex-col flex-1">
              <Link
                href={`/products/${product.productId}`}
                className="text-sm text-gray-700 truncate mb-2 group-hover:text-[#d0011b] transition-colors"
                title={product.productName}
              >
                {product.productName}
              </Link>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#d0011b] font-bold text-base">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-3 bg-white text-[#d0011b] border border-[#d0011b] hover:bg-[#d0011b] hover:text-white text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add_shopping_cart
                  </span>
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button className="px-8 py-2 bg-white border border-[#d0011b] text-[#d0011b] rounded-full hover:bg-[#d0011b] hover:text-white transition-all font-medium text-sm">
          Xem thêm
        </button>
      </div>
    </div>
  );
}
