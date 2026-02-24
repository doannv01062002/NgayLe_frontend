import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { GiftWizard } from "@/features/customer/gift-finder/GiftWizard";
import { GiftSidebar } from "@/features/customer/gift-finder/GiftSidebar";
import { GiftResults } from "@/features/customer/gift-finder/GiftResults";
import { Suspense } from "react";

export default function GiftFinderPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-10">
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>}>
          <GiftWizard />
        </Suspense>

        <div className="flex flex-col gap-8 lg:flex-row">
          <GiftSidebar />
          <Suspense fallback={<div className="flex-1 h-96 bg-gray-100 animate-pulse rounded-xl"></div>}>
            <GiftResults />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
