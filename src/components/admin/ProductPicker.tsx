"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";

interface ProductPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  title?: string;
}

export function ProductPicker({
  isOpen,
  onClose,
  onSelect,
  title = "Chọn sản phẩm",
}: ProductPickerProps) {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleSearch();
    }
  }, [isOpen]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Assuming productService has a search method or getAll takes params
      // Adjust according to actual productService implementation
      // Call getAllProducts with positional arguments: page, size, search
      const data = await productService.getAllProducts(0, 20, keyword);
      setProducts(data.content);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
          >
            Tìm
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="text-center py-10">Đang tải...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Không tìm thấy sản phẩm nào
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={
                    product.imageUrls && product.imageUrls.length > 0
                      ? product.imageUrls[0]
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Giá gốc: {product.basePrice.toLocaleString()}đ
                  </p>
                </div>
                <button
                  onClick={() => onSelect(product)}
                  className="px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium"
                >
                  Chọn
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
