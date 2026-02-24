import { AdminSidebar } from "@/features/admin/AdminSidebar";
import { AdminHeader } from "@/features/admin/AdminHeader";

// This layout will apply to all pages under /admin
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
