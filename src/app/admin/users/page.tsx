import { UserTable } from "@/features/admin/users_feature/UserTable";
import { UserStats } from "@/features/admin/users_feature/UserStats";

export default function AdminUsersPage() {
  return (
    <>
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Quản lý người dùng
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Xem danh sách, thông tin và quản lý tài khoản người dùng trên hệ
          thống.
        </p>
      </div>

      <UserStats />

      <UserTable />
    </>
  );
}
