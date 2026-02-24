import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ShopHeader } from "@/features/customer/shops/ShopHeader";
import { ShopNav } from "@/features/customer/shops/ShopNav";
import { ShopVouchers } from "@/features/customer/shops/ShopVouchers";
import { ShopFilters } from "@/features/customer/shops/ShopFilters";
import { ShopProductList } from "@/features/customer/shops/ShopProductList";
import { ShopFlashSale } from "@/features/customer/shops/ShopFlashSale";

export default function ShopPage() {
  return (
    <div className="bg-[#f5f5f5] dark:bg-[#221010] font-sans text-[#181111] overflow-x-hidden relative min-h-screen flex flex-col">
      <Header />

      <ShopHeader />
      <ShopNav />

      <div className="max-w-[1240px] mx-auto px-4 py-6 flex flex-col gap-6 flex-1 w-full">
        <div className="flex flex-col gap-6">
          <ShopFlashSale />
          <ShopVouchers />
        </div>

        <div className="flex gap-6 items-start">
          <ShopFilters />
          <ShopProductList />
        </div>
      </div>

      <Footer />
    </div>
  );
}
