import { SellerOrder } from "@/services/sellerOrderService";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: SellerOrder;
  onPrepare: (orderId: number) => void;
  onCancel: (orderId: number) => void;
}

export function OrderCard({ order, onPrepare, onCancel }: OrderCardProps) {
  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a] overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gray-50 dark:bg-[#2b3a4a]/50 px-5 py-3 border-b border-gray-200 dark:border-[#2b3a4a] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-1 rounded-full text-primary">
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {order.buyerName}
          </span>
          <span className="material-symbols-outlined text-[18px] text-primary cursor-pointer">
            chat
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-[18px]">tag</span>
            <span>
              Mã đơn:
              <span className="text-gray-900 dark:text-white font-mono font-medium ml-1">
                {order.orderId}
              </span>
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-primary font-bold uppercase text-xs tracking-wider">
            {order.status}
          </span>
        </div>
      </div>
      {/* Card Body */}
      <div className="flex flex-col md:flex-row">
        {/* Product Details */}
        <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#2b3a4a] flex flex-col gap-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div
                className="size-20 bg-gray-100 dark:bg-gray-700 rounded-lg shrink-0 border border-gray-200 dark:border-gray-600 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              ></div>
              <div className="flex flex-col flex-1">
                <h4 className="text-gray-900 dark:text-white font-medium line-clamp-2">
                  {item.name}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  Phân loại: {item.variant}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    x {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Order Summary & Actions */}
        <div className="w-full md:w-[320px] p-5 flex flex-col justify-center bg-gray-50/50 dark:bg-[#1a2632]/50">
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Tổng tiền hàng
              </span>
              <span className="text-gray-900 dark:text-white font-bold text-lg text-primary">
                {order.total}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                Thanh toán
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                Vận chuyển
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {order.shippingMethod}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {order.note && (
              <div className="bg-red-50 dark:bg-red-900/20 text-primary text-xs px-3 py-1.5 rounded text-center border border-red-100 dark:border-red-900/30 mb-1 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  warning
                </span>
                {order.note}
              </div>
            )}
            {!order.note && order.deadline && (
              <div className="text-gray-500 dark:text-gray-400 text-xs px-3 py-1.5 rounded text-center border border-transparent mb-1">
                {order.deadline}
              </div>
            )}

            {order.statusKey === "PENDING_PAYMENT" ||
            order.statusKey === "PROCESSING" ? (
              <>
                <button
                  onClick={() => onPrepare(order.id)}
                  className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-[0.98]"
                >
                  Chuẩn bị hàng
                </button>
                <button
                  onClick={() => onCancel(order.id)}
                  className="w-full bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2b3a4a] py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Hủy đơn
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
