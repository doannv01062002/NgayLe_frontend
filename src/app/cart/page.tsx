"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { cartService, Cart } from "@/services/cartService";
import { AuthResponse } from "@/services/authService";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { SimilarProducts } from "@/features/customer/product/SimilarProducts";

// --- Sub-components for Cleaner Page ---

const StepIndicator = () => (
  <div className="flex items-center justify-center gap-4 py-8 bg-white border-b mb-6">
    <div className="flex items-center gap-2 text-[#d0011b] font-medium">
      <div className="w-6 h-6 rounded-full border-2 border-[#d0011b] flex items-center justify-center text-sm">
        1
      </div>
      <span>Giỏ hàng</span>
    </div>
    <div className="w-16 h-[1px] bg-gray-300"></div>
    <div className="flex items-center gap-2 text-gray-400">
      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
        2
      </div>
      <span>Thanh toán</span>
    </div>
    <div className="w-16 h-[1px] bg-gray-300"></div>
    <div className="flex items-center gap-2 text-gray-400">
      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
        3
      </div>
      <span>Hoàn tất</span>
    </div>
  </div>
);

const NotificationBanner = () => (
  <div className="bg-[#fffefb] border border-[#ffecb2] rounded px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 mb-4 shadow-sm">
    <span className="material-symbols-outlined text-[#facc15]">
      local_shipping
    </span>
    <span>
      Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn
      nhé!
    </span>
  </div>
);

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const router = useRouter();
  const toast = useToast();

  // Selection State
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    fetchCart(userData.userId);
  }, []);

  const fetchCart = async (userId: number) => {
    try {
      const data = await cartService.getCart(userId);
      setCart(data);
      // By default, select all items? Or none? Let's select ALL for better UX.
      if (data && data.items) {
        const allIds = new Set(data.items.map((i) => i.itemId));
        setSelectedItemIds(allIds);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Selection Handlers ---

  const handleSelectAll = (checked: boolean) => {
    if (!cart) return;
    if (checked) {
      const allIds = new Set(cart.items.map((item) => item.itemId));
      setSelectedItemIds(allIds);
    } else {
      setSelectedItemIds(new Set());
    }
  };

  const handleSelectItem = (itemId: number) => {
    const newSelected = new Set(selectedItemIds);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItemIds(newSelected);
  };

  // Calculate Totals based on Selection
  const selectedTotal = useMemo(() => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      if (selectedItemIds.has(item.itemId)) {
        return total + item.subtotal;
      }
      return total;
    }, 0);
  }, [cart, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    if (!cart || cart.items.length === 0) return false;
    return cart.items.every((item) => selectedItemIds.has(item.itemId));
  }, [cart, selectedItemIds]);

  const selectedCount = selectedItemIds.size;

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (!user) return;
    try {
      const updatedCart = await cartService.updateQuantity(
        user.userId,
        itemId,
        newQuantity
      );
      setCart(updatedCart);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const confirmRemoveItem = (itemId: number) => {
    setItemToDelete(itemId);
    setModalOpen(true);
  };

  const handleRemoveItem = async () => {
    if (!user || !itemToDelete) return;
    try {
      const updatedCart = await cartService.removeItem(
        user.userId,
        itemToDelete
      );
      setCart(updatedCart);

      // Remove from selection if it was selected
      if (selectedItemIds.has(itemToDelete)) {
        const newSelected = new Set(selectedItemIds);
        newSelected.delete(itemToDelete);
        setSelectedItemIds(newSelected);
      }

      window.dispatchEvent(new Event("cart-updated"));
      setModalOpen(false);
      setItemToDelete(null);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng", "Thành công");
    } catch (error) {
      console.error("Error removing item:", error);
      setModalOpen(false);
      setItemToDelete(null);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.", "Lỗi");
    }
  };

  const handleCheckout = () => {
    if (selectedCount === 0) {
      toast.warning(
        "Vui lòng chọn ít nhất một sản phẩm để thanh toán",
        "Chưa chọn sản phẩm"
      );
      return;
    }

    // Save selected items to localStorage
    if (cart) {
      const selectedItems = cart.items.filter((item) =>
        selectedItemIds.has(item.itemId)
      );
      const checkoutData = {
        items: selectedItems,
        totalAmount: selectedTotal,
        totalItems: selectedCount,
      };
      localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
      toast.info("Đang chuyển đến trang thanh toán...", "Thông báo");
      router.push("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-[#f5f5f5]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#d0011b] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f5f5f5]">
      <Header />

      <div className="bg-white">
        <StepIndicator />
      </div>

      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <NotificationBanner />

          {/* Table Header */}
          <div className="bg-white rounded shadow-sm mb-4 px-10 py-4 hidden lg:grid grid-cols-12 text-sm text-gray-500 font-medium items-center">
            <div className="col-span-5 flex items-center gap-4">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-[#d0011b] cursor-pointer"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span>Sản phẩm</span>
            </div>
            <div className="col-span-2 text-center">Đơn giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-center">Số tiền</div>
            <div className="col-span-1 text-right">Thao tác</div>
          </div>

          {!cart || cart.items.length === 0 ? (
            <div className="bg-white rounded shadow-sm p-12 text-center flex flex-col items-center">
              <img
                src="https://salt.tikicdn.com/ts/upload/51/e2/9c/6ef0988cc5f3c010c2269a8df457d9f7.png"
                alt="Empty Cart"
                className="w-48 mb-6 opacity-80"
              />
              <p className="text-gray-500 text-lg mb-6">
                Chưa có sản phẩm nào trong giỏ hàng.
              </p>
              <Link
                href="/"
                className="bg-[#d0011b] text-white px-8 py-3 rounded hover:bg-[#a50115] transition-colors font-medium"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product List Group */}
              <div className="flex-1 space-y-4">
                {/* Shop Group Wrapper - Mocked as Single Shop for now */}
                <div className="bg-white rounded shadow-sm">
                  {/* Shop Header */}
                  <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 accent-[#d0011b] cursor-pointer"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <span className="material-symbols-outlined text-gray-600">
                      storefont
                    </span>
                    <span className="font-semibold text-gray-800">
                      NgayLe Official Store
                    </span>
                    <span className="bg-[#d0011b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      MALL
                    </span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-gray-50">
                    {cart.items.map((item) => (
                      <div
                        key={item.itemId}
                        className="px-5 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center group bg-white"
                      >
                        {/* Product Info */}
                        <div className="col-span-5 flex gap-3">
                          <div className="flex items-center h-full mr-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 accent-[#d0011b] cursor-pointer"
                              checked={selectedItemIds.has(item.itemId)}
                              onChange={() => handleSelectItem(item.itemId)}
                            />
                          </div>
                          <div className="w-20 h-20 border border-gray-100 shrink-0 relative">
                            <img
                              src={
                                item.imageUrl ||
                                "https://via.placeholder.com/100"
                              }
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                            {item.price < item.subtotal / item.quantity && ( // Mock logic for sale tag if needed
                              <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-1">
                                Giảm 50%
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-between py-0.5">
                            <Link
                              href={`/products/${item.productId}`}
                              className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#d0011b] mb-1"
                            >
                              {item.productName}
                            </Link>
                            <div className="flex items-center">
                              <div className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-gray-200 transition-colors w-fit">
                                Phân loại: {item.variantName}
                                <span className="material-symbols-outlined text-[14px]">
                                  expand_more
                                </span>
                              </div>
                            </div>
                            <div className="border border-[#d0011b] text-[#d0011b] text-[10px] px-1 py-0.5 rounded-sm w-fit mt-1">
                              Miễn phí đổi trả 15 ngày
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center lg:flex flex-col items-center justify-center gap-1">
                          <div className="lg:hidden text-xs text-gray-500 mb-1">
                            Đơn giá:
                          </div>
                          {/* Mock original price for visual effect - assuming 20% higher */}
                          <span className="text-gray-400 text-sm line-through block">
                            {formatCurrency(item.price * 1.2)}
                          </span>
                          <span className="text-gray-800 font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.itemId, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border-r hover:bg-gray-50 disabled:opacity-50 transition-colors text-gray-600"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-12 h-8 text-center text-sm font-medium text-gray-800 focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.itemId, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border-l hover:bg-gray-50 transition-colors text-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 text-center font-bold text-[#d0011b]">
                          <div className="lg:hidden text-xs text-gray-500 mb-1 inline-block mr-2">
                            Thành tiền:
                          </div>
                          {formatCurrency(item.subtotal)}
                        </div>

                        {/* Action */}
                        <div className="col-span-1 text-right">
                          <button
                            onClick={() => confirmRemoveItem(item.itemId)}
                            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-50 transition-all"
                            title="Xóa sản phẩm"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shop Total / Alert if needed */}
                  <div className="px-5 py-3 border-t border-gray-50 bg-[#fffefb] flex gap-2 items-center text-[#d0011b] text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      warning
                    </span>
                    <span className="font-medium">Chỉ còn 5 sản phần</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-[360px] shrink-0 space-y-4">
                {/* Voucher Box */}
                <div className="bg-white rounded shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                      <span className="material-symbols-outlined text-[#d0011b]">
                        confirmation_number
                      </span>
                      NgayLe Voucher
                    </div>
                    <button className="text-blue-600 text-sm hover:underline">
                      Chọn mã
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-red-50 text-[#d0011b] border border-red-100 text-xs px-2 py-1 rounded">
                      Giảm 15K
                    </span>
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 text-xs px-2 py-1 rounded">
                      FreeShip
                    </span>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-white rounded shadow-sm p-5 sticky top-24">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">
                    Thanh toán
                  </h3>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Tạm tính ({selectedCount} sản phẩm)</span>
                      <span className="text-gray-800">
                        {formatCurrency(selectedTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Giảm giá</span>
                      <span className="text-gray-800">-0 ₫</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-500 text-base">Tổng cộng</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#d0011b]">
                        {formatCurrency(selectedTotal)}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        (Đã bao gồm VAT nếu có)
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={selectedCount === 0}
                    className={`w-full text-white py-3.5 rounded font-bold uppercase transition-all shadow-lg ${
                      selectedCount > 0
                        ? "bg-[#d0011b] hover:bg-[#a50115] shadow-red-200 hover:shadow-red-300"
                        : "bg-gray-300 cursor-not-allowed shadow-none"
                    }`}
                  >
                    Mua Hàng ({selectedCount})
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3 leading-tight">
                    Bằng việc tiến hành Mua hàng, bạn đồng ý với{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                      Điều khoản dịch vụ
                    </Link>{" "}
                    của ngayle.com
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Section - Using reusable component or inline mock */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6 border-l-4 border-[#d0011b] pl-3">
              <h2 className="text-xl font-bold text-gray-800 uppercase">
                Có thể bạn cũng thích
              </h2>
              <Link
                href="/products"
                className="ml-auto text-sm text-[#d0011b] font-medium flex items-center hover:underline"
              >
                Xem tất cả{" "}
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </Link>
            </div>
            {/* We reuse SimilarProducts here but assume it can fetch generalized recommendations if no slug provided, or just render it */}
            <SimilarProducts categorySlug="tet-collection" />
          </div>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Xác nhận xóa"
        type="danger"
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleRemoveItem}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm font-medium"
            >
              Xóa sản phẩm
            </button>
          </>
        }
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <span className="material-symbols-outlined text-2xl">
              delete_forever
            </span>
          </div>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
          </p>
        </div>
      </Modal>
    </div>
  );
}
