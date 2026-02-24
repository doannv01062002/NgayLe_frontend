"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { productService, Product } from "@/services/productService";
import { categoryService, Category } from "@/services/categoryService";
import { useToast } from "@/context/ToastContext";

export function SellerProductTable() {
  const router = useRouter();
  const { showToast: addToast } = useToast();

  // States
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10); // Fixed 10 as requested
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Filters
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [stockFilter, setStockFilter] = useState("all"); // all, low, high

  // Stats
  const [stats, setStats] = useState({
    all: 0,
    active: 0,
    outOfStock: 0,
    pending: 0,
    violation: 0,
  });

  // Selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Load Initial Data (Cats + Stats)
  useEffect(() => {
    const loadInit = async () => {
      try {
        const cats = await categoryService.getAllCategories();
        setCategories(cats);
        fetchStats();
      } catch (e) {
        console.error(e);
      }
    };
    loadInit();
  }, []);

  const fetchStats = async () => {
    try {
      const s = await productService.getProductStats();
      setStats({
        all: s.all || 0,
        active: s.active || 0,
        outOfStock: s.outOfStock || 0,
        pending: s.pending || 0,
        violation: s.violation || 0,
      });
    } catch (e) {
      console.error("Failed stats", e);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let statusParam = undefined;
      let outOfStockParam = undefined;

      if (activeTab === "active") statusParam = "ACTIVE";
      if (activeTab === "pending") statusParam = "PENDING_REVIEW";
      if (activeTab === "violation") statusParam = "BANNED";
      if (activeTab === "out_of_stock") {
        statusParam = "ACTIVE";
        outOfStockParam = true;
      }

      let minStock = undefined;
      let maxStock = undefined;
      if (stockFilter === "low") maxStock = 10;
      if (stockFilter === "high") minStock = 100;

      const data = await productService.getMyProducts(
        page,
        pageSize,
        searchTerm,
        statusParam,
        outOfStockParam,
        selectedCategoryId,
        minStock,
        maxStock
      );
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to fetch products", error);
      addToast("Lỗi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [activeTab, searchTerm, page, selectedCategoryId, stockFilter]);

  // Reset pagination when filter changes
  useEffect(() => {
    setPage(0);
  }, [activeTab, searchTerm, selectedCategoryId, stockFilter]);

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        addToast("Xóa sản phẩm thành công", "success");
        fetchStats();
        fetchProducts();
      } catch (error) {
        console.error("Delete failed", error);
        addToast("Lỗi khi xóa sản phẩm", "error");
      }
    }
  };

  // Bulk Actions
  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p) => p.productId));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Xóa ${selectedIds.length} sản phẩm đã chọn?`)) return;
    try {
      await productService.bulkDeleteProducts(selectedIds);
      addToast(`Đã xóa ${selectedIds.length} sản phẩm`, "success");
      setSelectedIds([]);
      fetchStats();
      fetchProducts();
    } catch (e) {
      addToast("Lỗi xóa hàng loạt", "error");
    }
  };

  const handleBulkHide = async () => {
    if (!confirm(`Ẩn ${selectedIds.length} sản phẩm đã chọn?`)) return;
    try {
      await productService.bulkUpdateStatus(selectedIds, "INACTIVE");
      addToast(`Đã ẩn ${selectedIds.length} sản phẩm`, "success");
      setSelectedIds([]);
      fetchStats();
      fetchProducts();
    } catch (e) {
      addToast("Lỗi cập nhật hàng loạt", "error");
    }
  };

  const renderCategoryOptions = (cats: Category[], prefix = ""): any => {
    return cats.map((cat) => (
      <React.Fragment key={cat.categoryId}>
        <option value={cat.categoryId}>
          {prefix}
          {cat.name}
        </option>
        {cat.children &&
          cat.children.length > 0 &&
          renderCategoryOptions(cat.children, prefix + "-- ")}
      </React.Fragment>
    ));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2b3a4a] dark:bg-[#1a2632]">
      {/* Tab Filter List */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
          {[
            { id: "all", label: "Tất cả", count: stats.all },
            { id: "active", label: "Đang hoạt động", count: stats.active },
            { id: "out_of_stock", label: "Hết hàng", count: stats.outOfStock },
            { id: "pending", label: "Chờ duyệt", count: stats.pending },
            { id: "violation", label: "Vi phạm", count: stats.violation },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "ml-2 rounded-full py-0.5 px-2.5 text-xs font-medium",
                  activeTab === tab.id
                    ? "bg-blue-100 text-primary dark:bg-blue-900/30 dark:text-blue-300"
                    : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between border-b border-gray-100">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">
                search
              </span>
            </div>
            <input
              className="block w-full rounded-lg border-gray-300 pl-10 text-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 py-2"
              placeholder="Tìm tên sản phẩm, SKU..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-primary sm:w-auto dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            value={selectedCategoryId || ""}
            onChange={(e) =>
              setSelectedCategoryId(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Danh mục: Tất cả</option>
            {renderCategoryOptions(categories)}
          </select>
          <select
            className="block w-full rounded-lg border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary focus:ring-primary sm:w-auto dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">Kho hàng: Tất cả</option>
            <option value="low">Dưới 10 (Sắp hết)</option>
            <option value="high">Trên 100</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Đã chọn {selectedIds.length} sản phẩm
            </span>
            <button
              onClick={handleBulkDelete}
              className="rounded-lg bg-red-50 text-red-600 px-3 py-2 text-sm font-medium hover:bg-red-100"
            >
              Xóa
            </button>
            <button
              onClick={handleBulkHide}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Ẩn
            </button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-[#2b3a4a]/50">
            <tr>
              <th className="px-6 py-3 text-left" scope="col">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedIds.length === products.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Tên sản phẩm
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                SKU
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Giá
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Kho
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Đã bán
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Trạng thái
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                scope="col"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#1a2632]">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Đang tải...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.productId}
                  className={`group hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/50 ${
                    selectedIds.includes(product.productId)
                      ? "bg-blue-50/50"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                      type="checkbox"
                      checked={selectedIds.includes(product.productId)}
                      onChange={() => toggleSelect(product.productId)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200 dark:border-gray-600 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${
                            product.imageUrls?.[0] || ""
                          }')`,
                        }}
                      ></div>
                      <div className="ml-4">
                        <a
                          className="text-sm font-medium text-gray-900 hover:text-primary dark:text-white line-clamp-1"
                          href="#"
                        >
                          {product.name}
                        </a>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {product.categoryName || "Chưa phân loại"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.variants?.[0]?.sku || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.basePrice)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <span
                      className={`font-medium ${
                        (product.variants?.reduce(
                          (s, v) => s + v.stockQuantity,
                          0
                        ) || 0) === 0
                          ? "text-red-600"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {product.variants?.reduce(
                        (s, v) => s + v.stockQuantity,
                        0
                      ) || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                    {product.soldCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {product.status === "ACTIVE" && (
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Hoạt động
                      </span>
                    )}
                    {product.status === "INACTIVE" && (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Dừng bán
                      </span>
                    )}
                    {(product.status === "DRAFT" ||
                      product.status === "PENDING_REVIEW") && (
                      <span className="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        Chờ duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        router.push(
                          `/seller/products/${product.productId}/edit`
                        )
                      }
                      className="text-primary hover:text-blue-700 mr-3 cursor-pointer"
                    >
                      Sửa
                    </button>
                    <button
                      // @ts-ignore
                      onClick={() => handleDelete(product.productId)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-[#1a2632] rounded-b-xl">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Hiển thị{" "}
              <span className="font-medium">{page * pageSize + 1}</span> đến{" "}
              <span className="font-medium">
                {Math.min((page + 1) * pageSize, totalElements)}
              </span>{" "}
              trong tổng số <span className="font-medium">{totalElements}</span>{" "}
              kết quả
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Trước</span>
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              {/* Simplified Page Numbers */}
              {[...Array(totalPages)].map((_, i) =>
                // Show only first, last, current, and surrounding pages
                i === 0 ||
                i === totalPages - 1 ||
                (i >= page - 1 && i <= page + 1) ? (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-current={page === i ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ring-1 ring-inset ring-gray-300",
                      page === i
                        ? "z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700"
                    )}
                  >
                    {i + 1}
                  </button>
                ) : (i === 1 && page > 2) ||
                  (i === totalPages - 2 && page < totalPages - 3) ? (
                  <span
                    key={i}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                ) : null
              )}

              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Sau</span>
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
