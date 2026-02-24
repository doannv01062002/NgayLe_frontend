"use client";
import { Footer } from "@/components/shared/Footer";
import { AccountSidebar } from "@/features/customer/account/AccountSidebar";
import { OrderStatusTabs } from "@/features/customer/account/OrderStatusTabs";
import { OrderList } from "@/features/customer/account/OrderList";
import { VoucherList } from "@/features/customer/account/VoucherList";
import { AccountHeaderSimple } from "@/features/customer/account/AccountHeaderSimple";
import { SuggestionSection } from "@/features/customer/home/SuggestionSection";

export default function AccountPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-text-main dark:text-white min-h-screen flex flex-col">
      <AccountHeaderSimple />

      <div className="container mx-auto flex-1 px-4 py-6 lg:px-20 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />

          {/* Mobile User Summary (Visible on small screens only) */}
          <div className="lg:hidden w-full bg-surface-light dark:bg-[#2d1b1b] p-4 rounded-lg shadow-sm flex items-center gap-4">
            <div
              className="size-12 rounded-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVXAu_u4NbSJFSdlhdThpvEv8uMtEOP_aot_AfdscFcgYZUy03bNxlGMkL8RtIdItPsPKKB8YdYw4rsCcewaQYrJxERFxkd1EUv_ZcOAxw90VTljvK8UZkguYMSVbKbigsUQrrbckFtbutGX7mkk25Udw9pnViBvyw33-MuFA11nO2Ut7y7ttVcb153HDMw4usmtAyjAPWpdtVc76C1eDrwgV6XGiX9R1G4XzEizq4banHluH3M9cvSuAGH7SqxhkydYOYNvFqF-I')",
              }}
            ></div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                Minh Anh
              </h2>
              <p className="text-xs text-primary font-medium">
                Thành viên Vàng
              </p>
            </div>
            <button className="ml-auto text-gray-500">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <main className="flex-1 flex flex-col gap-4">
            <OrderStatusTabs />
            <OrderList />
            <VoucherList />

            {/* Recommended Products via reusable SuggestionSection */}
            {/* Just for reusing the products grid, ignoring the exact layout of the HTML if necessary, or we could copy pasting the specific grid from HTML if strictly required. 
                 The HTML used 5 cols. SuggestionSection uses 2-6 cols responsive. It matches well.
             */}
            <SuggestionSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
