"use client";
import { OrderCard } from "./OrderCard";
import { SellerOrder } from "@/services/sellerOrderService";
// import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have one, or use simple div

interface OrderListProps {
  orders: SellerOrder[];
  isLoading: boolean;
  onPrepare: (id: number) => void;
  onCancel: (id: number) => void;
}

export function OrderList({
  orders,
  isLoading,
  onPrepare,
  onCancel,
}: OrderListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-white dark:bg-[#1a2632] rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#1a2632] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <span className="material-symbols-outlined text-[48px] text-gray-400">
          inbox
        </span>
        <p className="text-gray-500 mt-2">Không có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onPrepare={onPrepare}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
