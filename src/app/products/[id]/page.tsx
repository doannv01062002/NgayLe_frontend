"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ProductGallery } from "@/features/customer/product/ProductGallery";
import { ProductInfo } from "@/features/customer/product/ProductInfo";
import { ShopInfoCard } from "@/features/customer/product/ShopInfoCard";
import { ProductDescription } from "@/features/customer/product/ProductDescription";
import { ProductReviews } from "@/features/customer/product/ProductReviews";
import { SimilarProducts } from "@/features/customer/product/SimilarProducts";
import Link from "next/link";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      // Only set loading on first load, not on refresh
      if (!product) setLoading(true);
      const data = await productService.getProductById(Number(id));
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const recordVisit = async () => {
    try {
      await productService.recordVisit(Number(id));
    } catch (e) {
      // Ignore visit tracking errors
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      recordVisit();
    }
  }, [id]);

  const refreshProduct = () => {
    fetchProduct();
  };

  if (loading) {
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

  if (!product) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Không tìm thấy sản phẩm
          </h1>
          <Link href="/" className="text-[#d0011b] hover:underline mt-4">
            Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const promotionPercent =
    product.promotionalPrice && product.promotionalPrice < product.basePrice
      ? Math.round((1 - product.promotionalPrice / product.basePrice) * 100)
      : 0;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-background-light dark:bg-background-dark py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex text-sm text-slate-500 dark:text-slate-400">
            <Link className="hover:text-primary transition-colors" href="/">
              Trang chủ
            </Link>
            {product.categoryName && (
              <>
                <span className="mx-2">/</span>
                <Link
                  className="hover:text-primary transition-colors"
                  href={`/category/${product.categoryName}`} // Ideally slug, but DTO might only have name
                >
                  {product.categoryName}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 pb-12 grow">
        {/* Product Main Section */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          {/* Left Column: Images */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ProductGallery
              images={product.imageUrls}
              productName={product.name}
              promotionPercent={promotionPercent}
            />
          </div>
          {/* Right Column: Info */}
          <div className="lg:col-span-7 flex flex-col">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Shop Info */}
        <ShopInfoCard shopId={product.shopId} />

        {/* Product Details & Reviews + Similar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Details Content */}
          <div className="lg:col-span-3 space-y-6">
            <ProductDescription description={product.description} />
            <ProductReviews
              productId={product.productId}
              averageRating={product.rating}
              totalReviews={product.reviewCount}
              onReviewSubmitted={refreshProduct}
            />
          </div>

          {/* Right: Similar Products */}
          <SimilarProducts
            categorySlug={product.categorySlug}
            currentProductId={product.productId}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
