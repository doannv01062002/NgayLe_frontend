"use client";

import { useEffect, useState } from "react";
import { OrderDTO, orderService } from "@/services/orderService";
import Link from "next/link";

// Helper for formatting currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: "Tất cả", value: "ALL" },
    { label: "Chờ thanh toán", value: "PENDING_PAYMENT" },
    { label: "Vận chuyển", value: "SHIPPING" },
    { label: "Đang giao", value: "DELIVERED" },
    { label: "Hoàn thành", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
    { label: "Trả hàng/Hoàn tiền", value: "RETURNED" },
  ];

  const filteredOrders =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Đang tải đơn hàng...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-white sticky top-0 z-10 shadow-sm mb-4 rounded-t-sm">
        <div className="flex w-full overflow-x-auto no-scrollbar border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-600 hover:text-red-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 mb-4 shadow-sm rounded-sm">
        <div className="relative bg-gray-100 rounded-sm">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm theo Tên Shop, ID Đơn hàng hoặc Tên Sản phẩm"
            className="w-full bg-transparent py-2.5 pl-10 pr-4 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center shadow-sm rounded-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">
                receipt_long
              </span>
            </div>
            <p className="text-gray-500">Chưa có đơn hàng</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-sm rounded-sm overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-800">
                    {order.shopName}
                  </span>
                  <button className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1">
                    Yêu thích
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 px-2 border-l border-gray-200 ml-2">
                    <span className="material-symbols-outlined text-lg">
                      chat
                    </span>
                    <span className="text-xs ml-1">Chat</span>
                  </button>
                  <Link
                    href={`/shops/${order.shopId}`}
                    className="text-gray-500 text-xs flex items-center hover:text-red-500"
                  >
                    <span className="material-symbols-outlined text-lg">
                      storefront
                    </span>
                    <span className="ml-1">Xem Shop</span>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {order.status === "COMPLETED" && (
                    <span className="text-green-600 flex items-center gap-1 uppercase text-xs font-medium border-r border-gray-200 pr-3 mr-1">
                      <span className="material-symbols-outlined text-sm">
                        local_shipping
                      </span>
                      Giao hàng thành công
                    </span>
                  )}
                  <span className="text-red-500 font-medium uppercase text-sm">
                    {order.status === "COMPLETED"
                      ? "Hoàn thành"
                      : order.status === "PENDING_PAYMENT"
                      ? "Chờ thanh toán"
                      : order.status === "SHIPPING"
                      ? "Đang vận chuyển"
                      : order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div>
                {order.items?.map((item) => (
                  <Link
                    href={`/products/${item.productId}`}
                    key={item.itemId}
                    className="flex gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    <div className="w-20 h-20 flex-shrink-0 border border-gray-200 bg-gray-50">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined">
                            image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-2 mb-1 text-gray-800">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        Phân loại hàng: {item.variantName}
                      </p>
                      <p className="text-xs text-gray-800">x{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-red-500 text-sm font-medium">
                        {formatPrice(item.unitPrice)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-white p-6 border-t border-gray-50">
                <div className="flex justify-end items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-red-500 text-lg">
                    verified_user
                  </span>
                  <span className="text-sm text-gray-600">Thành tiền:</span>
                  <span className="text-xl font-bold text-red-500">
                    {formatPrice(order.finalAmount)}
                  </span>
                </div>
                <div className="flex justify-end gap-3">
                  <button className="min-w-[150px] px-4 py-2 border border-gray-300 rounded-sm text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    Liên hệ Người bán
                  </button>
                  <button className="min-w-[150px] px-4 py-2 bg-red-500 text-white rounded-sm text-sm hover:bg-red-600 transition-colors">
                    Mua lại
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
