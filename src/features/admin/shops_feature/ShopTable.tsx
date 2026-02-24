"use client";
import { useEffect, useState } from "react";
import { adminShopService, AdminShop } from "@/services/adminShopService";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  PENDING: {
    label: "Chờ duyệt",
    color: "bg-yellow-100 text-yellow-800",
    icon: "hourglass_empty",
  },
  ACTIVE: {
    label: "Đang hoạt động",
    color: "bg-green-100 text-green-800",
    icon: "check_circle",
  },
  SUSPENDED: {
    label: "Tạm ngưng",
    color: "bg-orange-100 text-orange-800",
    icon: "pause_circle",
  },
  CLOSED: {
    label: "Đã đóng",
    color: "bg-red-100 text-red-800",
    icon: "storefront",
  },
};

export function ShopTable() {
  const [shops, setShops] = useState<AdminShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchShops();
  }, [page, searchTerm, statusFilter]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await adminShopService.getShops({
        page: page,
        size: 10,
        search: searchTerm,
        status: statusFilter,
      });
      setShops(data.content);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (shopId: number, newStatus: string) => {
    if (
      !confirm(
        `Bạn có chắc muốn chuyển trạng thái Shop sang ${STATUS_MAP[newStatus]?.label}?`
      )
    )
      return;
    try {
      await adminShopService.updateStatus(shopId, newStatus);
      fetchShops();
    } catch (error) {
      alert("Cập nhật thất bại");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-[#2b3a4a] overflow-hidden">
      {/* Filters Inline */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          className="block w-full sm:w-80 rounded-lg border-0 bg-gray-100 dark:bg-gray-800 py-2 pl-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
          placeholder="Tìm tên Shop..."
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
                  Shop / Doanh nghiệp
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Chủ sở hữu
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Doanh số
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Rating
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
              {shops.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Không tìm thấy Shop nào
                  </td>
                </tr>
              )}
              {shops.map((shop) => {
                const statusInfo = STATUS_MAP[shop.status] || {
                  label: shop.status,
                  color: "bg-gray-100",
                  icon: "help",
                };
                return (
                  <tr
                    key={shop.shopId}
                    className="hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                          {shop.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={shop.logoUrl}
                              alt={shop.shopName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-gray-400">
                              store
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {shop.shopName}
                          </div>
                          <div className="text-xs text-gray-500">
                            MST: {shop.taxCode || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {shop.ownerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {shop.ownerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div>{shop.totalSales} đơn</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        star
                      </span>
                      {shop.rating}
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
                        {shop.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(shop.shopId, "ACTIVE")
                              }
                              className="text-green-600 hover:text-green-900"
                              title="Duyệt Shop"
                            >
                              <span className="material-symbols-outlined">
                                check_circle
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(shop.shopId, "CLOSED")
                              } // Or reject
                              className="text-red-600 hover:text-red-900"
                              title="Từ chối"
                            >
                              <span className="material-symbols-outlined">
                                cancel
                              </span>
                            </button>
                          </>
                        )}
                        {shop.status === "ACTIVE" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(shop.shopId, "SUSPENDED")
                            }
                            className="text-orange-600 hover:text-orange-900"
                            title="Tạm ngưng hoạt động"
                          >
                            <span className="material-symbols-outlined">
                              pause_circle
                            </span>
                          </button>
                        )}
                        {shop.status === "SUSPENDED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(shop.shopId, "ACTIVE")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Mở lại hoạt động"
                          >
                            <span className="material-symbols-outlined">
                              play_circle
                            </span>
                          </button>
                        )}
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
