"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { cartService } from "@/services/cartService";
import { formatCurrency } from "@/lib/utils";
import { AuthResponse } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [user, setUser] = useState<AuthResponse | null>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  // Determine available options
  const option1Name = product.variants?.[0]?.option1Name;
  const option2Name = product.variants?.[0]?.option2Name;

  const option1Values = useMemo(() => {
    if (!product.variants) return [];
    return Array.from(
      new Set(product.variants.map((v) => v.option1Value).filter(Boolean))
    ) as string[];
  }, [product.variants]);

  const option2Values = useMemo(() => {
    if (!product.variants) return [];
    return Array.from(
      new Set(product.variants.map((v) => v.option2Value).filter(Boolean))
    ) as string[];
  }, [product.variants]);

  // Set default selection
  useEffect(() => {
    if (option1Values.length > 0 && !selectedOption1) {
      setSelectedOption1(option1Values[0]);
    }
    if (option2Values.length > 0 && !selectedOption2) {
      setSelectedOption2(option2Values[0]);
    }
  }, [option1Values, option2Values]);

  // Find selected variant
  const selectedVariant = useMemo(() => {
    if (!product.variants) return null;
    return product.variants.find((v) => {
      const match1 = !option1Name || v.option1Value === selectedOption1;
      const match2 = !option2Name || v.option2Value === selectedOption2;
      return match1 && match2;
    });
  }, [
    product.variants,
    selectedOption1,
    selectedOption2,
    option1Name,
    option2Name,
  ]);

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.promotionalPrice || product.basePrice;
  const currentStock = selectedVariant ? selectedVariant.stockQuantity : 0;

  const referencePrice = selectedVariant
    ? selectedVariant.originalPrice ||
      (product.originalPrice && product.originalPrice > selectedVariant.price
        ? product.originalPrice
        : selectedVariant.price)
    : product.promotionalPrice && product.promotionalPrice < product.basePrice
    ? product.basePrice
    : product.originalPrice && product.originalPrice > product.basePrice
    ? product.originalPrice
    : product.basePrice;

  const showDiscount = referencePrice > currentPrice;

  const discountPercent = showDiscount
    ? Math.round(((referencePrice - currentPrice) / referencePrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để mua hàng", "Yêu cầu");
      // Optionally redirect or let them decide
      return;
    }
    if (!selectedVariant) {
      toast.warning(
        "Vui lòng chọn đầy đủ phân loại hàng mong muốn",
        "Chưa chọn phân loại"
      );
      return;
    }
    if (quantity > currentStock) {
      toast.warning(
        `Số lượng bạn chọn vượt quá tồn kho hiện tại (còn lại ${currentStock})`,
        "Hết hàng"
      );
      return;
    }

    try {
      await cartService.addToCart(
        user.userId,
        selectedVariant.variantId,
        quantity
      );
      window.dispatchEvent(new Event("cart-updated"));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng", "Thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau.", "Lỗi");
    }
  };

  const handleBuyNow = async () => {
    // Logic for buy now: check validations first, then add to cart, then redirect
    if (!user) {
      toast.warning("Vui lòng đăng nhập để mua hàng", "Yêu cầu");
      router.push("/login?redirect_to=/products/" + product.productId);
      return;
    }
    if (!selectedVariant) {
      toast.warning(
        "Vui lòng chọn đầy đủ phân loại hàng mong muốn",
        "Chưa chọn phân loại"
      );
      return;
    }
    if (quantity > currentStock) {
      toast.warning(`Số lượng bạn chọn vượt quá tồn kho hiện tại`, "Hết hàng");
      return;
    }

    try {
      await cartService.addToCart(
        user.userId,
        selectedVariant.variantId,
        quantity
      );
      window.dispatchEvent(new Event("cart-updated"));
      router.push("/cart");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", "Lỗi");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
        {product.name}
      </h1>

      {/* Ratings & Sold */}
      <div className="flex items-center gap-4 text-sm mb-6">
        <div className="flex items-center gap-1 text-[#d0011b] border-b border-transparent cursor-pointer">
          <span className="font-bold text-base border-b border-[#d0011b]">
            {product.rating || 0}
          </span>
          <div className="flex text-[#d0011b] text-[16px]">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="material-symbols-outlined fill-current">
                {s <= Math.round(product.rating || 0) ? "star" : "star_border"}
              </span>
            ))}
          </div>
        </div>
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white text-base border-b border-black dark:border-white">
            {product.reviewCount || 0}
          </span>
          <span className="text-gray-500">Đánh giá</span>
        </div>
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white text-base">
            {product.soldCount || 0}
          </span>
          <span className="text-gray-500">Đã bán</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-6 flex items-end gap-3 flex-wrap">
        {showDiscount && (
          <span className="text-slate-400 text-lg line-through decoration-slate-400 decoration-1">
            {formatCurrency(referencePrice)}
          </span>
        )}
        <span className="text-4xl font-bold text-[#d0011b]">
          {formatCurrency(currentPrice)}
        </span>
        {showDiscount && (
          <span className="bg-[#d0011b]/10 text-[#d0011b] text-xs font-bold px-2 py-1 rounded mb-2">
            GIẢM {discountPercent}%
          </span>
        )}
      </div>

      {/* Variants */}
      {option1Values.length > 0 && (
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="text-slate-500 dark:text-slate-400 w-24 shrink-0 pt-2">
              {option1Name}
            </span>
            <div className="flex flex-wrap gap-3">
              {option1Values.map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedOption1(val)}
                  className={`px-4 py-2 rounded border transition-colors ${
                    selectedOption1 === val
                      ? "border-[#d0011b] text-[#d0011b] bg-[#d0011b]/5 font-medium"
                      : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-[#d0011b] hover:text-[#d0011b]"
                  }`}
                >
                  {val}
                  {selectedOption1 === val && (
                    <span className="ml-2 material-symbols-outlined text-sm align-middle">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product specs (Brand, Origin, etc.) */}
      <div className="grid grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300 mb-6">
        {product.brand && (
          <div className="flex gap-2">
            <span className="text-slate-500">Thương hiệu:</span>
            <span className="font-medium">{product.brand}</span>
          </div>
        )}
        {product.origin && (
          <div className="flex gap-2">
            <span className="text-slate-500">Xuất xứ:</span>
            <span className="font-medium">{product.origin}</span>
          </div>
        )}
        {product.weight && (
          <div className="flex gap-2">
            <span className="text-slate-500">Trọng lượng:</span>
            <span className="font-medium">{product.weight}g</span>
          </div>
        )}
        {(product.length || product.width || product.height) && (
          <div className="flex gap-2">
            <span className="text-slate-500">Kích thước:</span>
            <span className="font-medium">
              {[product.length, product.width, product.height]
                .filter(Boolean)
                .join(" x ")}{" "}
              cm
            </span>
          </div>
        )}
      </div>

      {option2Values.length > 0 && (
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="text-slate-500 dark:text-slate-400 w-24 shrink-0 pt-2">
              {option2Name}
            </span>
            <div className="flex flex-wrap gap-3">
              {option2Values.map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedOption2(val)}
                  className={`px-4 py-2 rounded border transition-colors ${
                    selectedOption2 === val
                      ? "border-[#d0011b] text-[#d0011b] bg-[#d0011b]/5 font-medium"
                      : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-[#d0011b] hover:text-[#d0011b]"
                  }`}
                >
                  {val}
                  {selectedOption2 === val && (
                    <span className="ml-2 material-symbols-outlined text-sm align-middle">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
        <span className="text-slate-500 dark:text-slate-400 w-24 shrink-0">
          Số lượng
        </span>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded-l text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">remove</span>
          </button>
          <input
            className="w-14 h-8 border-y border-slate-300 dark:border-slate-600 text-center text-sm focus:ring-0 focus:border-slate-300"
            readOnly
            type="text"
            value={quantity}
          />
          <button
            onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
            className="w-8 h-8 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded-r text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
            disabled={quantity >= currentStock}
          >
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
        <span className="text-xs text-slate-500 ml-2">
          {currentStock} sản phẩm có sẵn
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#d0011b] bg-[#d0011b]/10 text-[#d0011b] font-bold rounded hover:bg-[#d0011b]/20 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            add_shopping_cart
          </span>
          Thêm Vào Giỏ
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-12 flex items-center justify-center bg-[#d0011b] text-white font-bold rounded shadow-lg hover:bg-[#a50115] hover:shadow-red-900/30 transition-all cursor-pointer"
        >
          Mua Ngay
        </button>
      </div>

      {/* Additional Info / Policies */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 space-y-4">
        {/* Return & Warranty */}
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#d0011b] mt-0.5">
            verified_user
          </span>
          <div className="text-sm">
            <span className="block text-slate-900 dark:text-white font-medium">
              Đảm bảo chất lượng
            </span>
            <span className="text-slate-500">
              100% Chính hãng, Đổi trả trong 7 ngày
            </span>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#d0011b] mt-0.5">
            local_shipping
          </span>
          <div className="text-sm">
            <span className="block text-slate-900 dark:text-white font-medium">
              Vận chuyển miễn phí
            </span>
            <span className="text-slate-500">Cho đơn hàng từ 150.000₫</span>
          </div>
        </div>

        {/* Shop Vouchers (Placeholder) */}
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#d0011b] mt-0.5">
            loyalty
          </span>
          <div className="text-sm w-full">
            <span className="block text-slate-900 dark:text-white font-medium mb-2">
              Mã giảm giá của Shop
            </span>
            <div className="flex flex-wrap gap-2">
              {["GIAM10K", "FREESHIP"].map((code) => (
                <span
                  key={code}
                  className="px-2 py-1 bg-[#d0011b]/5 text-[#d0011b] text-xs border border-[#d0011b]/20 rounded border-dashed"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
