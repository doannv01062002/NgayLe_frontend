"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AuthFooter } from "@/features/auth/AuthLayoutComponents";
import { useToast } from "@/context/ToastContext";
import { AddressSelectionModal } from "@/features/customer/checkout/AddressSelectionModal";
import { addressService, Address } from "@/services/addressService";
import { orderService } from "@/services/orderService";

// --- Types ---
interface CheckoutItem {
  itemId: number;
  productId: number;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  subtotal: number;
}

interface CheckoutData {
  items: CheckoutItem[];
  totalAmount: number;
  totalItems: number;
}

// --- Components ---

const CheckoutHeader = () => (
  <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e7] px-4 py-4 md:px-10 lg:px-40 bg-white">
    <div className="flex items-center gap-4 text-[#d0011b]">
      <Link href="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-3xl">shopping_bag</span>
        <span className="text-2xl font-bold tracking-tight">ngayle.com</span>
      </Link>
      <div className="hidden md:block w-px h-6 bg-gray-300 mx-2"></div>
      <div className="text-xl text-[#d0011b] font-medium">
        Thanh toán an toàn
      </div>
    </div>
    <Link
      className="text-[#d0011b] text-sm font-medium hover:underline flex items-center gap-1"
      href="/support"
    >
      <span className="material-symbols-outlined text-sm">help</span>
      Cần trợ giúp?
    </Link>
  </header>
);

const StepIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center justify-center gap-4 py-6 bg-white border-b mb-6 shadow-sm">
    <div
      className={`flex items-center gap-2 ${
        step >= 1 ? "text-gray-400" : "text-gray-300"
      }`}
    >
      <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
        1
      </div>
      <span>Giỏ hàng</span>
    </div>
    <div className="w-16 h-[1px] bg-gray-300"></div>
    <div
      className={`flex items-center gap-2 ${
        step === 2 ? "text-[#d0011b] font-medium" : "text-gray-400"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
          step === 2 ? "bg-[#d0011b] text-white" : "border border-gray-300"
        }`}
      >
        2
      </div>
      <span>Thanh toán</span>
    </div>
    <div className="w-16 h-[1px] bg-gray-300"></div>
    <div className="flex items-center gap-2 text-gray-400">
      <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
        3
      </div>
      <span>Hoàn tất</span>
    </div>
  </div>
);

export default function CheckoutPage() {
  const [data, setData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("nhanh"); // 'nhanh' | 'hoatoc'
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'momo' | 'card'
  const [address, setAddress] = useState<Address | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Load data from localStorage
    const stored = localStorage.getItem("checkout_data");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      router.push("/cart");
      return;
    }

    // Fetch default address
    loadDefaultAddress();

    setLoading(false);
  }, []);

  const loadDefaultAddress = async () => {
    const defaultAddr = await addressService.getDefault();
    if (defaultAddr) {
      setAddress(defaultAddr);
    } else {
      // Fallback: try to fetch first address if no default
      try {
        const all = await addressService.getAll();
        if (all.length > 0) {
          setAddress(all[0]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const shippingFee = shippingMethod === "nhanh" ? 30000 : 55000;
  const shippingDiscount = 10000; // Mock discount
  const shopVoucher = 20000; // Mock voucher

  const finalTotal = data
    ? data.totalAmount + shippingFee - shippingDiscount - shopVoucher
    : 0;

  const handlePlaceOrder = async () => {
    if (!address || !address.addressId) {
      toast.error("Vui lòng thiếu địa chỉ nhận hàng.", "Thiếu thông tin");
      setIsAddressModalOpen(true);
      return;
    }

    if (!data || !data.items || data.items.length === 0) {
      toast.error("Không có sản phẩm để thanh toán", "Lỗi");
      return;
    }

    try {
      const orderRequest = {
        addressId: address.addressId,
        shippingMethod,
        paymentMethod,
        cartItemIds: data.items.map((i) => i.itemId),
        voucherCode: "", // Optional
      };

      toast.info("Đang xử lý đơn hàng...", "Vui lòng chờ");
      const createdOrders = await orderService.createOrder(orderRequest);

      toast.success("Đặt hàng thành công!", "Thành công");
      localStorage.removeItem("checkout_data");

      // Trigger cart update
      window.dispatchEvent(new Event("cart-updated"));

      const orderIds = createdOrders.map((o: any) => o.orderId).join(",");
      setTimeout(() => {
        router.push(`/checkout/success?orderIds=${orderIds}`);
      }, 1500);
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.", "Lỗi");
    }
  };

  if (loading) return null; // or spinner
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans pb-20">
      <CheckoutHeader />
      <StepIndicator step={2} />

      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Main Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded shadow-sm relative overflow-hidden">
              {/* Striped Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#d0011b,#d0011b_30px,#fff_30px,#fff_60px,#28489c_60px,#28489c_90px,#fff_90px,#fff_120px)]"></div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-[#d0011b] font-bold text-lg">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                    <h2>Địa chỉ nhận hàng</h2>
                  </div>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="text-blue-600 font-medium text-sm hover:underline"
                  >
                    Thay đổi
                  </button>
                </div>

                {address ? (
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                    <div className="font-bold text-gray-800 min-w-[120px]">
                      {address.recipientName}
                      <div className="font-normal text-gray-500 text-sm mt-0.5">
                        {address.recipientPhone}
                      </div>
                    </div>
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-gray-600 text-sm">
                        {address.addressLine1}, {address.ward},{" "}
                        {address.district}, {address.city}
                      </span>
                      {address.isDefault && (
                        <span className="border border-[#d0011b] text-[#d0011b] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Bạn chưa có địa chỉ nhận hàng.{" "}
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="text-[#d0011b] hover:underline"
                    >
                      Thêm ngay
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-4">Sản phẩm</h2>

              {/* Header */}
              <div className="grid grid-cols-12 text-sm text-gray-400 mb-4 pb-2 border-b border-gray-100">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Thành tiền</div>
              </div>

              {/* List */}
              <div className="space-y-6">
                {data.items.map((item) => (
                  <div
                    key={item.itemId}
                    className="grid grid-cols-12 items-center text-sm"
                  >
                    <div className="col-span-6 flex gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded border border-gray-100"
                      />
                      <div>
                        <div className="font-medium text-gray-800 line-clamp-1">
                          {item.productName}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Phân loại: {item.variantName}
                        </div>
                        <div className="border border-[#d0011b] text-[#d0011b] text-[10px] px-1 py-0.5 rounded-sm w-fit mt-1">
                          Đổi trả miễn phí 15 ngày
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-gray-800">
                      {formatCurrency(item.price)}
                    </div>
                    <div className="col-span-2 text-center text-gray-800">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right font-medium text-gray-800">
                      {formatCurrency(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Input */}
              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex justify-end items-center gap-4">
                <div className="flex items-center gap-2 text-[#d0011b] font-medium">
                  <span className="material-symbols-outlined text-[20px]">
                    confirmation_number
                  </span>
                  ngayle Voucher
                </div>
                <button className="text-blue-600 text-sm hover:underline font-medium">
                  Chọn hoặc nhập mã
                </button>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded shadow-sm p-6">
              <div className="flex items-center gap-2 font-bold text-gray-800 text-lg mb-4">
                <span className="material-symbols-outlined text-gray-600">
                  local_shipping
                </span>
                <h2>Phương thức vận chuyển</h2>
              </div>

              <div className="space-y-4">
                <label
                  className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-all ${
                    shippingMethod === "nhanh"
                      ? "border-[#d0011b] bg-red-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      className="mt-1 w-4 h-4 accent-[#d0011b]"
                      checked={shippingMethod === "nhanh"}
                      onChange={() => setShippingMethod("nhanh")}
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Nhanh (Giao Hàng Nhanh)
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Nhận hàng vào 15 Th02 - 17 Th02
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[#d0011b]">30.000₫</div>
                </label>

                <label
                  className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-all ${
                    shippingMethod === "hoatoc"
                      ? "border-[#d0011b] bg-red-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      className="mt-1 w-4 h-4 accent-[#d0011b]"
                      checked={shippingMethod === "hoatoc"}
                      onChange={() => setShippingMethod("hoatoc")}
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Hỏa tốc (GrabExpress)
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Nhận hàng trong 2 giờ (Chỉ nội thành)
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[#d0011b]">55.000₫</div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-lg">
                  <span className="material-symbols-outlined text-gray-600">
                    payments
                  </span>
                  <h2>Phương thức thanh toán</h2>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-xs">
                    lock
                  </span>
                  Được bảo mật an toàn
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#d0011b] bg-red-50/10"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 accent-[#d0011b]"
                    />
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600 font-bold">
                      $
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Thanh toán khi nhận hàng (COD)
                      </div>
                      <div className="text-xs text-gray-500">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <span className="material-symbols-outlined text-[#d0011b]">
                      check_circle
                    </span>
                  )}
                </label>

                <label
                  className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-all ${
                    paymentMethod === "momo"
                      ? "border-[#d0011b] bg-red-50/10"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                      className="w-4 h-4 accent-[#d0011b]"
                    />
                    <div className="w-8 h-8 flex items-center justify-center bg-pink-50 rounded">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                        alt="Momo"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Ví MoMo</div>
                      <div className="text-xs text-gray-500">
                        Giảm thêm 10k khi thanh toán qua MoMo
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "momo" && (
                    <span className="material-symbols-outlined text-[#d0011b]">
                      check_circle
                    </span>
                  )}
                </label>

                <label
                  className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#d0011b] bg-red-50/10"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 accent-[#d0011b]"
                    />
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600">
                      <span className="material-symbols-outlined">
                        credit_card
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Thẻ Tín dụng/Ghi nợ
                      </div>
                      <div className="flex gap-1 mt-1">
                        <div className="w-6 h-4 bg-gray-200 rounded"></div>
                        <div className="w-6 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <span className="material-symbols-outlined text-[#d0011b]">
                      check_circle
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 text-lg mb-6">
                Chi tiết thanh toán
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng tiền hàng</span>
                  <span>{formatCurrency(data.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá phí vận chuyển</span>
                  <span>-{formatCurrency(shippingDiscount)}</span>
                </div>
                <div className="flex justify-between text-[#d0011b]">
                  <span>Voucher từ Shop</span>
                  <span>-{formatCurrency(shopVoucher)}</span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-6">
                <span className="text-gray-800 font-medium">
                  Tổng thanh toán
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#d0011b]">
                    {formatCurrency(finalTotal)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    (Đã bao gồm VAT nếu có)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 accent-[#d0011b]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-500 leading-tight cursor-pointer"
                >
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <Link href="/terms" className="text-blue-500 hover:underline">
                    Điều khoản ngayle.com
                  </Link>
                </label>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#d0011b] hover:bg-[#a50115] text-white py-3.5 rounded font-bold uppercase transition-all shadow-lg shadow-red-200"
              >
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <AuthFooter />
      </div>

      <AddressSelectionModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSelect={(selected) => {
          setAddress(selected);
          setIsAddressModalOpen(false);
        }}
        selectedAddressId={address?.addressId}
      />
    </div>
  );
}
