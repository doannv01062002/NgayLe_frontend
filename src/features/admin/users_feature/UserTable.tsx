"use client";
import { useEffect, useState } from "react";
import { adminUserService, AdminUser } from "@/services/adminUserService";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  ACTIVE: {
    label: "Đang hoạt động",
    color: "bg-green-100 text-green-800",
    icon: "check_circle",
  },
  LOCKED: {
    label: "Tạm khóa",
    color: "bg-orange-100 text-orange-800",
    icon: "lock",
  },
  BANNED: {
    label: "Cấm vĩnh viễn",
    color: "bg-red-100 text-red-800",
    icon: "block",
  },
};

export function UserTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminUserService.getUsers({
        page: page,
        size: 10,
        search: searchTerm,
        status: statusFilter,
      });
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: number, newStatus: string) => {
    if (
      !confirm(
        `Bạn có chắc muốn chuyển trạng thái sang ${STATUS_MAP[newStatus]?.label}?`
      )
    )
      return;
    try {
      await adminUserService.updateStatus(userId, newStatus);
      fetchUsers();
    } catch (error) {
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-[#2b3a4a] overflow-hidden">
      {/* Filters Inline */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          className="block w-full sm:w-80 rounded-lg border-0 bg-gray-100 dark:bg-gray-800 py-2 pl-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
          placeholder="Tìm tên, email, SĐT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="block w-full sm:w-48 rounded-lg border-0 bg-gray-100 dark:bg-gray-800 py-2 pl-3 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary sm:text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          {Object.keys(STATUS_MAP).map((key) => (
            <option key={key} value={key}>
              {STATUS_MAP[key].label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-[#2b3a4a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1a2632]">
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              )}
              {users.map((user) => {
                const statusInfo = STATUS_MAP[user.status] || {
                  label: user.status,
                  color: "bg-gray-100",
                  icon: "help",
                };
                return (
                  <tr
                    key={user.userId}
                    className="hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.phoneNumber || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1",
                          statusInfo.color
                        )}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {statusInfo.icon}
                        </span>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {user.status === "ACTIVE" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(user.userId, "LOCKED")
                            }
                            className="text-orange-600 hover:text-orange-900"
                            title="Khóa tài khoản"
                          >
                            <span className="material-symbols-outlined">
                              lock
                            </span>
                          </button>
                        )}
                        {user.status !== "ACTIVE" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(user.userId, "ACTIVE")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Mở khóa"
                          >
                            <span className="material-symbols-outlined">
                              lock_open
                            </span>
                          </button>
                        )}
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Cấm vĩnh viễn"
                          onClick={() =>
                            handleUpdateStatus(user.userId, "BANNED")
                          }
                        >
                          <span className="material-symbols-outlined">
                            block
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination (Reused logic) */}
      {!loading && totalPages > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Trước
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Trang <span className="font-medium">{page + 1}</span> /{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
