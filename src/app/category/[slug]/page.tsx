"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FilterSidebar } from "@/features/customer/search/FilterSidebar";
import { SortBar } from "@/features/customer/search/SortBar";
import { productService, Product } from "@/services/productService";
import { categoryService, Category } from "@/services/categoryService";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { cartService } from "@/services/cartService";
import { AuthResponse } from "@/services/authService";
import { useToast } from "@/context/ToastContext";

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const toast = useToast();

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
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));

    const fetchData = async () => {
      try {
        setLoading(true);
        const [catData, prodData] = await Promise.all([
          categoryService.getCategoryBySlug(slug),
          productService.getAllProducts(
            0,
            20,
            "",
            slug,
            minPrice,
            maxPrice,
            rating,
            sort
          ),
        ]);
        setCategory(catData);
        setProducts(prodData.content);
        setTotal(prodData.totalElements);
      } catch (error) {
        console.error("Error fetching category data", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, minPrice, maxPrice, rating, sort]);

  const handleSort = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    router.push(`/category/${slug}?${newParams.toString()}`);
  };

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      toast.warning(
        "Vui lòng đăng nhập để thêm vào giỏ hàng",
        "Yêu cầu đăng nhập"
      );
      return;
    }

    if (product.variants && product.variants.length > 0) {
      try {
        await cartService.addToCart(
          user.userId,
          product.variants[0].variantId,
          1
        );
        window.dispatchEvent(new Event("cart-updated"));
        toast.success("Đã thêm sản phẩm vào giỏ hàng", "Thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.", "Lỗi");
      }
    } else {
      toast.warning(
        "Sản phẩm này tạm hết hàng hoặc chưa có biến thể để chọn nhanh.",
        "Thông báo"
      );
    }
  };

  if (loading && !category) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#d0011b] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Không tìm thấy danh mục
          </h1>
          <Link href="/" className="text-[#d0011b] hover:underline mt-4">
            Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-8">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#d0011b]">
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64 flex-shrink-0">
              <FilterSidebar basePath={`/category/${slug}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center gap-4">
                {category.iconUrl && category.iconUrl.startsWith("http") ? (
                  <img
                    src={category.iconUrl}
                    alt={category.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#d0011b]">
                    <span className="material-symbols-outlined text-[32px]">
                      {category.iconUrl || "category"}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 uppercase">
                    {category.name}
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Khám phá các sản phẩm trong danh mục {category.name} (
                    {total} sản phẩm)
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <SortBar sort={sort} onSort={handleSort} />
              </div>

              {loading ? (
                <div className="flex items-center justify-center min-h-[300px] bg-white rounded-lg">
                  <div className="w-10 h-10 border-4 border-[#d0011b] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
                    inventory_2
                  </span>
                  <p className="text-gray-500">
                    Chưa có sản phẩm nào trong danh mục này.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                  {products.map((product) => (
                    <div
                      key={product.productId}
                      className="group relative border border-gray-100 rounded-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden flex flex-col"
                    >
                      <Link
                        href={`/products/${product.productId}`}
                        className="block overflow-hidden relative pt-[100%]"
                      >
                        <img
                          src={
                            product.imageUrls && product.imageUrls.length > 0
                              ? product.imageUrls[0]
                              : "https://via.placeholder.com/300"
                          }
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="p-3 flex flex-col flex-1">
                        <Link
                          href={`/products/${product.productId}`}
                          className="text-sm text-gray-700 truncate mb-2 group-hover:text-[#d0011b] transition-colors"
                          title={product.name}
                        >
                          {product.name}
                        </Link>
                        <div className="mt-auto">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="text-[#d0011b] font-bold text-base">
                                {formatCurrency(product.promotionalPrice || product.basePrice)}
                             </span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full mt-3 bg-white text-[#d0011b] border border-[#d0011b] hover:bg-[#d0011b] hover:text-white text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1"
                          >
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Suspense } from "react";

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#d0011b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
