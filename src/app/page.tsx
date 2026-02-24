import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/features/customer/home/HeroSection";
import { CategoryGrid } from "@/features/customer/home/CategoryGrid";
import { FlashSaleSection } from "@/features/customer/home/FlashSaleSection";
import { SuggestionSection } from "@/features/customer/home/SuggestionSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1 py-6">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 lg:px-8">
          <HeroSection />
          <CategoryGrid />
          <FlashSaleSection />
          <SuggestionSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
