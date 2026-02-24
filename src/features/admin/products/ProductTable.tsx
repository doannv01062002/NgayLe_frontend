"use client";
import { useEffect, useState } from "react";
import {
  adminProductService,
  Product,
  ProductResponse,
} from "@/services/adminProductService";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  DRAFT: {
    label: "Nháp",
    color: "bg-gray-100 text-gray-700",
    icon: "edit_note",
  },
  PENDING_REVIEW: {
    label: "Chờ duyệt",
    color: "bg-yellow-100 text-yellow-800",
    icon: "hourglass_empty",
  },
  ACTIVE: {
    label: "Đang hoạt động",
    color: "bg-green-100 text-green-800",
    icon: "check_circle",
  },
  INACTIVE: {
    label: "Đã ẩn",
    color: "bg-gray-200 text-gray-600",
    icon: "visibility_off",
  },
  BANNED: {
    label: "Vi phạm / Bị khóa",
    color: "bg-red-100 text-red-800",
    icon: "block",
  },
};

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm, statusFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminProductService.getProducts({
        page: page,
        size: 10,
        search: searchTerm,
        status: statusFilter,
      });
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (productId: number, newStatus: string) => {
    if (
      !confirm(
        `Bạn có chắc muốn chuyển trạng thái sang ${STATUS_MAP[newStatus]?.label}?`
      )
    )
      return;
    try {
      await adminProductService.updateStatus(productId, newStatus);
      fetchProducts();
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
      {/* Filters Inline for Table */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          className="block w-full sm:w-80 rounded-lg border-0 bg-gray-100 dark:bg-gray-800 py-2 pl-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm"
          placeholder="Tìm sản phẩm..."
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
                <th
                  className="relative px-7 sm:w-12 sm:px-6 py-3.5"
                  scope="col"
                >
                  <input
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                    type="checkbox"
                  />
                </th>
                <th
                  className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Sản phẩm
                </th>
                <th
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Gian hàng (Shop)
                </th>
                <th
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Danh mục
                </th>
                <th
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Giá / Kho
                </th>
                <th
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Trạng thái
                </th>
                <th
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  scope="col"
                >
                  Cập nhật
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1a2632]">
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
              {products.map((product) => {
                const statusInfo = STATUS_MAP[product.status] || {
                  label: product.status,
                  color: "bg-gray-100",
                  icon: "help",
                };
                const image =
                  product.imageUrls && product.imageUrls.length > 0
                    ? product.imageUrls[0]
                    : "/placeholder.jpg";
                // Calculate total stock from variants or soldCount
                const stock = product.variants
                  ? product.variants.reduce(
                      (sum, v) => sum + v.stockQuantity,
                      0
                    )
                  : 0;

                return (
                  <tr
                    key={product.productId}
                    className={`hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/50 transition-colors ${
                      product.status === "BANNED"
                        ? "bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 border-l-2 border-red-500"
                        : ""
                    }`}
                  >
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                        type="checkbox"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt={product.name}
                            className={`h-12 w-12 rounded-lg object-cover ${
                              product.status === "BANNED" ? "opacity-60" : ""
                            }`}
                            src={image}
                          />
                        </div>
                        <div className="ml-4">
                          <div
                            className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-[200px]"
                            title={product.name}
                          >
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {product.productId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-primary dark:text-blue-400 cursor-pointer font-medium">
                      {product.shopName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {product.categoryName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(product.basePrice)}
                      </div>
                      <div className="text-xs">Kho: {stock}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1",
                          statusInfo.color
                        )}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {statusInfo.icon}
                        </span>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end gap-2">
                        {product.status === "PENDING_REVIEW" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(product.productId, "ACTIVE")
                            }
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Duyệt nhanh"
                          >
                            <span className="material-symbols-outlined">
                              check_circle
                            </span>
                          </button>
                        )}

                        {/* Action Menu (Simplified) */}
                        <div className="relative group">
                          <button className="text-gray-400 hover:text-gray-600">
                            <span className="material-symbols-outlined">
                              more_vert
                            </span>
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-gray-200 dark:border-gray-700">
                            {product.status !== "ACTIVE" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    product.productId,
                                    "ACTIVE"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                Kích hoạt / Duyệt
                              </button>
                            )}
                            {product.status === "ACTIVE" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    product.productId,
                                    "INACTIVE"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                Ẩn sản phẩm
                              </button>
                            )}
                            {product.status !== "BANNED" && (
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    product.productId,
                                    "BANNED"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                Cấm / Khóa (Vi phạm)
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
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
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Trang <span className="font-medium">{page + 1}</span> /{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
