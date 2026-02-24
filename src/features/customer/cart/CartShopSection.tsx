import Link from "next/link";
import React, { useState } from "react";

// Mock types
interface Product {
  id: string;
  name: string;
  image: string;
  variant?: string;
  originalPrice?: string;
  price: string;
  quantity: number;
  tags?: string[];
}

interface Shop {
  id: string;
  name: string;
  isMall: boolean;
  products: Product[];
}

export function CartShopSection({ shop }: { shop: Shop }) {
  // Simple state for quantity - in real app this would be global state (Redux/Zustand)
  const [products, setProducts] = useState(shop.products);

  const updateQuantity = (id: string, delta: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newQ = p.quantity + delta;
          return { ...p, quantity: newQ > 0 ? newQ : 1 };
        }
        return p;
      })
    );
  };

  return (
    <div className="bg-white dark:bg-[#2d1b1b] rounded-lg shadow-sm overflow-hidden mb-4">
      {/* Shop Header */}
      <div className="p-4 border-b border-gray-100 dark:border-[#3e2c2c] flex items-center gap-3">
        <input
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
        />
        <span className="material-symbols-outlined text-gray-500 text-lg">
          storefront
        </span>
        <span className="font-bold text-sm">{shop.name}</span>
        {shop.isMall && (
          <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded ml-2">
            Mall
          </span>
        )}
        <button className="ml-auto text-primary text-sm hover:underline">
          Chat ngay
        </button>
      </div>

      {/* Products */}
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center border-b border-gray-50 dark:border-[#3e2c2c] last:border-0 relative"
        >
          <div className="flex items-start gap-3 col-span-5">
            <input
              className="h-4 w-4 mt-8 md:mt-0 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
            />
            <div className="flex gap-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-gray-200 dark:border-gray-700 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={product.name}
                  className="h-full w-full object-cover"
                  src={product.image}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors dark:text-white"
                >
                  {product.name}
                </Link>
                {product.variant && (
                  <div className="flex items-center gap-1 mt-1 cursor-pointer group">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full group-hover:bg-gray-200 transition-colors">
                      Phân loại: {product.variant}
                    </span>
                    <span className="material-symbols-outlined text-xs text-gray-400">
                      expand_more
                    </span>
                  </div>
                )}
                {product.tags?.includes("return-15") && (
                  <div className="mt-1">
                    <span className="text-[10px] text-primary border border-primary px-1 rounded">
                      Đổi ý miễn phí 15 ngày
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 col-span-2 flex md:flex-col md:items-center md:justify-center items-center gap-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
            <span className="text-sm font-medium dark:text-white">
              {product.price}
            </span>
          </div>
          <div className="mt-4 md:mt-0 col-span-2 flex justify-center">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <input
                className="w-10 h-8 text-center border-none text-sm p-0 focus:ring-0 bg-transparent dark:text-white"
                type="text"
                value={product.quantity}
                readOnly
              />
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-2 md:mt-0 col-span-2 text-center hidden md:block">
            {/* Logic for total calculation would go here, mock for now */}
            <span className="text-primary font-bold">{product.price}</span>
          </div>
          <div className="mt-2 md:mt-0 col-span-1 flex justify-center">
            <button className="text-gray-400 hover:text-primary transition-colors text-sm">
              Xóa
            </button>
          </div>
        </div>
      ))}

      {/* Shop Voucher Section */}
      <div className="px-4 py-3 border-t border-dashed border-gray-200 dark:border-[#3e2c2c] flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl">
          confirmation_number
        </span>
        <span className="text-sm font-medium">Giảm ₫20k</span>
        <button className="text-sm text-blue-600 hover:underline ml-auto">
          Thêm mã giảm giá của Shop
        </button>
      </div>
    </div>
  );
}
