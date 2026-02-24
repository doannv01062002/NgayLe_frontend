"use client";

import Link from "next/link";
import {
  OrderFilter,
  OrderTabs,
} from "@/features/seller/orders/OrderFilterComp";
import { OrderList } from "@/features/seller/orders/OrderList";
import { useEffect, useState } from "react";
import { sellerOrderService, SellerOrder } from "@/services/sellerOrderService";
// import { toast } from "sonner"; // Assuming sonner is used, or alert

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState("PROCESSING"); // Default to pending confirmation as per screenshot
  const [filters, setFilters] = useState({
    keyword: "",
    shippingUnit: "",
    date: "",
  });
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await sellerOrderService.getOrders({
        status: activeTab,
        keyword: filters.keyword,
        startDate: filters.date
          ? new Date(filters.date).toISOString().split("T")[0] + "T00:00:00"
          : undefined,
        endDate: filters.date
          ? new Date(filters.date).toISOString().split("T")[0] + "T23:59:59"
          : undefined,
      });
      setOrders(data.content);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab, filters]);

  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      await sellerOrderService.updateStatus(orderId, status);
      // toast.success("Cập nhật trạng thái thành công");
      fetchOrders();
    } catch (error) {
      console.error("Cập nhật thất bại", error);
      // toast.error("Cập nhật thất bại");
    }
  };

  const handlePrepare = (id: number) => {
    // Assuming 'SHIPPING' is the next state after confirmation
    handleStatusUpdate(id, "SHIPPING");
  };

  const handleCancel = (id: number) => {
    handleStatusUpdate(id, "CANCELLED");
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o.id));
    }
  };

  const handleBulkPrepare = async () => {
    if (selectedOrders.length === 0) return;
    try {
      await sellerOrderService.bulkUpdateStatus(selectedOrders, "SHIPPING");
      // toast.success("Cập nhật hàng loạt thành công");
      setSelectedOrders([]);
      fetchOrders();
    } catch (error) {
      console.error("Cập nhật thất bại", error);
      // toast.error("Cập nhật thất bại");
    }
  };

  const handleFilterChange = (newFilters: {
    keyword?: string;
    shippingUnit?: string;
    date?: string;
  }) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <>
      <div className="px-8 pt-6 pb-2">
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            className="text-gray-500 hover:text-primary transition-colors"
            href="/seller"
          >
            Kênh Người Bán
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            Quản lý đơn hàng
          </span>
        </div>
      </div>

      <div className="px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight mb-1">
              Quản lý đơn hàng
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Kiểm tra và xử lý các đơn hàng mới để đảm bảo giao hàng đúng hạn.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-lg text-sm font-bold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/80">
              <span className="material-symbols-outlined text-[20px]">
                print
              </span>
              In danh sách
            </button>
          </div>
        </div>
      </div>

      <div className="px-8">
        <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="px-8 py-6 flex flex-col gap-6">
        <OrderFilter
          onFilterChange={handleFilterChange}
          onReset={() =>
            setFilters({ keyword: "", shippingUnit: "", date: "" })
          }
        />

        {/* Bulk Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-gray-900 dark:text-white font-bold text-lg">
              {orders.length} Đơn hàng
            </h3>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-lg text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/80 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {selectedOrders.length === orders.length && orders.length > 0
                  ? "check_box"
                  : "check_box_outline_blank"}
              </span>
              Chọn tất cả
            </button>
            <button
              onClick={handleBulkPrepare}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-transparent rounded-lg text-sm font-bold text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedOrders.length === 0}
            >
              <span className="material-symbols-outlined text-[20px]">
                local_shipping
              </span>
              Chuẩn bị hàng loạt
            </button>
          </div>
        </div>

        <OrderList
          orders={orders}
          isLoading={isLoading}
          onPrepare={handlePrepare}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}
