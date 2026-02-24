import { SupportStats } from "@/features/admin/support/SupportStats";
import { SupportTable } from "@/features/admin/support/SupportTable";

export default function AdminSupportPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 pb-2">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-gray-900 text-3xl font-black leading-tight tracking-tight dark:text-white">
            Quản lý FAQ &amp; Trung tâm trợ giúp
          </h1>
          <p className="text-gray-500 text-base font-normal leading-normal dark:text-gray-400">
            Cập nhật các câu hỏi thường gặp và hướng dẫn hỗ trợ cho các dịp lễ
            Tết, ngày đặc biệt.
          </p>
        </div>
      </div>

      <SupportStats />

      <SupportTable />
    </>
  );
}
