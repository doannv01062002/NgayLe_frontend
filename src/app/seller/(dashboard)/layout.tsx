import { SellerSidebar } from "@/features/seller/SellerSidebar";
import { SellerHeader } from "@/features/seller/SellerHeader";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F8F9FA] dark:bg-[#101922] font-sans h-screen overflow-hidden">
      <SellerSidebar />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <SellerHeader />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
