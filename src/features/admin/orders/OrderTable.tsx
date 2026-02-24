"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { adminOrderService, Order } from "@/services/adminOrderService";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: {
    label: "Chờ xác nhận",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  PENDING_PAYMENT: {
    label: "Chờ thanh toán",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  PAID: {
    label: "Đã thanh toán",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  PROCESSING: {
    label: "Đang xử lý",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  SHIPPING: {
    label: "Đang giao",
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  DELIVERED: {
    label: "Đã giao",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  COMPLETED: {
    label: "Hoàn tất",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  RETURNED: {
    label: "Trả hàng",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await adminOrderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    if (!confirm("Bạn có chắc muốn đổi trạng thái đơn hàng?")) return;
    try {
      await adminOrderService.updateStatus(orderId, newStatus);
      fetchOrders(); // Refresh
    } catch (e) {
      alert("Cập nhật thất bại");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toString().includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shopName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      {/* Filters & Actions */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Tìm theo mã đơn, tên khách hàng, tên Shop..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                calendar_today
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Khoảng thời gian"
                type="text"
              />
            </div>
            <button className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap">
              Lọc kết quả
            </button> */}
          </div>
        </div>
        {/* Status Chips */}
        <div className="p-4 flex gap-2 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === "ALL"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus("PENDING_PAYMENT")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === "PENDING_PAYMENT"
                ? "bg-amber-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Chờ thanh toán
          </button>
          <button
            onClick={() => setFilterStatus("PROCESSING")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === "PROCESSING"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => setFilterStatus("SHIPPING")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === "SHIPPING"
                ? "bg-cyan-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Đang giao
          </button>
          <button
            onClick={() => setFilterStatus("DELIVERED")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === "DELIVERED"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Đã giao
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10">
                    <input
                      className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 dark:border-gray-600 dark:bg-gray-900"
                      type="checkbox"
                    />
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Khách hàng / Shop
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500">
                      Không tìm thấy đơn hàng nào
                    </td>
                  </tr>
                )}
                {filteredOrders.map((order) => {
                  const firstItem =
                    order.items && order.items.length > 0
                      ? order.items[0]
                      : null;
                  const moreItems =
                    order.items && order.items.length > 1
                      ? order.items.length - 1
                      : 0;
                  const statusInfo = STATUS_MAP[order.status] || {
                    label: order.status,
                    color: "bg-gray-100 text-gray-600",
                  };

                  return (
                    <tr
                      key={order.orderId}
                      className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 dark:border-gray-600 dark:bg-gray-900"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4">
                        <span className="text-primary font-bold">
                          #{order.orderId}
                        </span>
                      </td>
                      <td className="p-4">
                        {firstItem ? (
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-600"
                              style={{
                                backgroundImage: `url('${
                                  firstItem.imageUrl || "/placeholder.jpg"
                                }')`,
                              }}
                            ></div>
                            <div className="flex flex-col">
                              <span
                                className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1"
                                title={firstItem.productName}
                              >
                                {firstItem.productName}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {firstItem.variantName}{" "}
                                {moreItems > 0 &&
                                  `(+${moreItems} sản phẩm khác)`}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span>Không có sản phẩm</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-gray-900 dark:text-white text-sm font-medium">
                            {order.customerName}
                          </span>
                          <span className="text-gray-500 text-xs">
                            Shop: {order.shopName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                        {formatCurrency(order.finalAmount)}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                            statusInfo.color
                          )}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          className="text-xs border rounded p-1 bg-white"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.orderId, e.target.value)
                          }
                        >
                          {Object.keys(STATUS_MAP).map((key) => (
                            <option key={key} value={key}>
                              {STATUS_MAP[key].label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination (Simplified) */}
        {!loading && filteredOrders.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hiển thị {filteredOrders.length} đơn hàng
            </p>
          </div>
        )}
      </div>
    </>
  );
}
