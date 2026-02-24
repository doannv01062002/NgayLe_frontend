"use client";

import { useEffect, useState, useMemo } from "react";
import { flashSaleService } from "@/services/flashSale.service";
import { shopService, ShopResponse } from "@/services/shopService";
import { FlashSaleSession } from "@/types/home-management";
import { SellerProductPicker } from "@/components/seller/SellerProductPicker";
import { Product } from "@/types/product";
import { useToast } from "@/context/ToastContext";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import Link from "next/link";

export default function SellerFlashSalesPage() {
  const { showToast, success, error } = useToast();
  const [shop, setShop] = useState<ShopResponse | null>(null);
  const [sessions, setSessions] = useState<FlashSaleSession[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");

  // Managing a specific session
  const [managingSession, setManagingSession] =
    useState<FlashSaleSession | null>(null);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);

  // New session form
  const [newSessionData, setNewSessionData] = useState({
    startTime: "",
    endTime: "",
  });

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Product Config Modal State
  const [productConfig, setProductConfig] = useState<{
    isOpen: boolean;
    product: Product | null;
    flashSalePrice: number;
    quantity: number;
  }>({
    isOpen: false,
    product: null,
    flashSalePrice: 0,
    quantity: 1,
  });

  useEffect(() => {
    fetchShopAndSessions();
  }, []);

  const fetchShopAndSessions = async () => {
    try {
      const shopData = await shopService.getCurrentShop();
      setShop(shopData);
      if (shopData) {
        fetchSessions(shopData.shopId);
      }
    } catch (e) {
      console.error(e);
      error("Không tải được thông tin shop");
    }
  };

  const fetchSessions = async (shopId: number) => {
    try {
      const data = await flashSaleService.getShopSessions(shopId);
      setSessions(data.content);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateSession = async () => {
    if (!shop) return;
    try {
      await flashSaleService.createShopSession(shop.shopId, newSessionData);
      setIsCreateModalOpen(false);
      setNewSessionData({ startTime: "", endTime: "" });
      fetchSessions(shop.shopId);
      success("Tạo phiên Flash Sale thành công");
    } catch (e: any) {
      error("Lỗi tạo session: " + (e.response?.data?.message || e.message));
    }
  };

  const handleDelete = (sessionId: number) => {
    if (!shop) return;
    setConfirmModal({
      isOpen: true,
      title: "Xóa phiên Flash Sale",
      message:
        "Bạn có chắc chắn muốn xóa phiên này không? Hành động này không thể hoàn tác.",
      onConfirm: async () => {
        try {
          await flashSaleService.deleteShopSession(shop.shopId, sessionId);
          fetchSessions(shop.shopId);
          success("Đã xóa phiên Flash Sale");
        } catch (e) {
          error("Lỗi khi xóa phiên");
        }
      },
    });
  };

  const openManageModal = async (session: FlashSaleSession) => {
    // Ideally use backend endpoint to get fresh details
    // Here we can use the one from list if it has products,
    // OR fetch details if list doesn't include products fully (usually list logic might skip products for perf)
    // admin calls getSession(id). Since request allows generic reading if owned, we can try calling getSession
    // BUT we added getShopSessions only.
    // For now, let's assume getShopSessions returns partial data and we re-fetch via generic getSession if accessible,
    // OR we just use what we have if the list includes products.
    // Wait, createShopSession returns the session.
    // The safest is adding getShopSession to service as planned or trusting getSession(id) works for owner.
    // Let's rely on getSession(id) from flashSaleService which hits /admin/flash-sales/{id} - wait that was ADMIN path.
    // I need to use the SELLER endpoint if I created one or generic public?
    // I did NOT create a specific GET single session endpoint for seller in Controller.
    // I only made getShopSessions (List).
    // I should fix the Controller to allow fetching SINGLE session for seller or public current.
    // However, I can fetch the list again or just use the item from the list if it contains products.
    // FlashSaleDTO response includes products list.
    setManagingSession(session);
  };

  const handleProductSelect = (product: Product) => {
    setProductConfig({
      isOpen: true,
      product: product,
      flashSalePrice: product.promotionalPrice || product.basePrice,
      quantity: 1,
    });
  };

  const submitAddProduct = async () => {
    if (!managingSession || !productConfig.product || !shop) return;

    try {
      await flashSaleService.addShopProducts(
        shop.shopId,
        managingSession.sessionId,
        [
          {
            productId: productConfig.product.productId,
            flashSalePrice: productConfig.flashSalePrice,
            quantity: productConfig.quantity,
          },
        ]
      );

      setIsProductPickerOpen(false);
      setProductConfig({ ...productConfig, isOpen: false });

      // Refresh list to update managingSession
      const data = await flashSaleService.getShopSessions(shop.shopId);
      setSessions(data.content);
      const updated = data.content.find(
        (s) => s.sessionId === managingSession.sessionId
      );
      if (updated) setManagingSession(updated);

      success("Đã thêm sản phẩm vào Flash Sale");
    } catch (e: any) {
      error("Lỗi thêm sản phẩm: " + (e.response?.data?.message || e.message));
    }
  };

  const filteredSessions = useMemo(() => {
    if (activeTab === "ALL") return sessions;
    return sessions.filter((s) => s.status === activeTab);
  }, [sessions, activeTab]);

  if (!shop) return <div className="p-6">Đang tải thông tin shop...</div>;

  return (
    <div className="p-6 w-full max-w-[1600px] mx-auto space-y-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link
          className="hover:text-primary transition-colors flex items-center"
          href="/seller/dashboard"
        >
          <span className="material-symbols-outlined text-lg">home</span>
        </Link>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-500 font-medium">Marketing</span>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Flash Sale Của Shop
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Flash Sale Của Shop
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Tạo các chương trình khuyến mãi chớp nhoáng để thu hút khách hàng.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary hover:bg-blue-600 text-white h-12 px-6 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add_alarm</span>
          <span>Tạo Phiên Mới</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Tabs & Filter Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#1a2632] z-10 sticky top-0">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {[
              { id: "ALL", label: "Tất cả" },
              { id: "ONGOING", label: "Đang diễn ra" },
              { id: "UPCOMING", label: "Sắp diễn ra" },
              { id: "ENDED", label: "Đã kết thúc" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50/30 dark:bg-[#111927] flex-1">
          {filteredSessions.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
              <span className="material-symbols-outlined text-5xl mb-2 opacity-50">
                event_busy
              </span>
              <p>Không tìm thấy phiên Flash Sale nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredSessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-[#1f2937] ${
                    session.isActive
                      ? "border-primary/50 ring-1 ring-primary/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner ${
                          session.isActive
                            ? "bg-gradient-to-br from-red-50 to-red-100 text-primary"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[26px]">
                          flash_on
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold border shadow-sm ${
                            session.status === "ONGOING"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : session.status === "UPCOMING"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {session.status}
                        </span>

                        <button
                          className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => handleDelete(session.sessionId)}
                          title="Xóa phiên"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        Phiên ngày{" "}
                        {new Date(session.startTime).toLocaleDateString(
                          "vi-VN"
                        )}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-[18px]">
                          schedule
                        </span>
                        <span className="font-mono font-medium">
                          {new Date(session.startTime).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                          {" - "}
                          {new Date(session.endTime).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                          {session.products?.length || 0}
                        </span>{" "}
                        sản phẩm
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openManageModal(session)}
                          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-gray-800 text-white hover:bg-gray-900 shadow-sm hover:shadow active:scale-95 transition-all"
                        >
                          Chi tiết & SP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Tạo Phiên Flash Sale
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Bắt đầu
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={newSessionData.startTime}
                  onChange={(e) =>
                    setNewSessionData({
                      ...newSessionData,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Kết thúc
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={newSessionData.endTime}
                  onChange={(e) =>
                    setNewSessionData({
                      ...newSessionData,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/20 transition-all"
              >
                Tạo Phiên
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Products Modal */}
      {managingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
              <div>
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    flash_on
                  </span>
                  Chi tiết Phiên Flash Sale
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(managingSession.startTime).toLocaleString("vi-VN")}{" "}
                  - {new Date(managingSession.endTime).toLocaleString("vi-VN")}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsProductPickerOpen(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    add_circle
                  </span>
                  Thêm Sản Phẩm
                </button>
                <button
                  onClick={() => setManagingSession(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Modal Content - Table */}
            <div className="flex-1 overflow-y-auto p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4 font-bold">Sản phẩm</th>
                    <th className="px-6 py-4 font-bold text-center">Giá gốc</th>
                    <th className="px-6 py-4 font-bold text-center">
                      Giá Flash Sale
                    </th>
                    <th className="px-6 py-4 font-bold text-center">
                      Số lượng
                    </th>
                    <th className="px-6 py-4 font-bold text-center">Đã bán</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {managingSession.products?.map((p) => (
                    <tr
                      key={p.id}
                      className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg border border-gray-200 p-1 bg-white">
                            <img
                              src={p.productImage || "/placeholder.png"}
                              className="w-full h-full object-contain rounded-md"
                            />
                          </div>
                          <span
                            className="font-semibold dark:text-white line-clamp-2 max-w-[200px]"
                            title={p.productName}
                          >
                            {p.productName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500 line-through">
                        {p.originalPrice.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 bg-red-50 text-red-600 font-bold rounded-lg border border-red-100">
                          {p.flashSalePrice.toLocaleString()}đ
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-900 dark:text-white font-medium">
                        {p.quantity}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-900 dark:text-white">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2 max-w-[80px] mx-auto">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(
                                (p.soldQuantity / p.quantity) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {p.soldQuantity} / {p.quantity}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!managingSession.products ||
                    managingSession.products.length === 0) && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-20 text-center text-gray-500 flex flex-col items-center justify-center gap-3"
                      >
                        <span className="material-symbols-outlined text-4xl text-gray-300">
                          production_quantity_limits
                        </span>
                        <span>Chưa có sản phẩm nào trong phiên này</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <SellerProductPicker
        isOpen={isProductPickerOpen}
        onClose={() => setIsProductPickerOpen(false)}
        onSelect={handleProductSelect}
        title="Chọn sản phẩm cho Flash Sale"
      />

      {/* Product Config Modal */}
      {productConfig.isOpen && productConfig.product && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                settings
              </span>
              Thiết lập Flash Sale
            </h3>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex gap-3 items-center">
              <img
                src={productConfig.product.imageUrls?.[0] || "/placeholder.png"}
                className="w-12 h-12 rounded object-cover border"
              />
              <div>
                <div className="font-semibold text-sm line-clamp-1">
                  {productConfig.product.name}
                </div>
                <div className="text-xs text-gray-500">
                  Giá gốc: {productConfig.product.basePrice.toLocaleString()}đ
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Giá Flash Sale (đ)
                </label>
                <input
                  type="number"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold text-red-600"
                  value={productConfig.flashSalePrice}
                  onChange={(e) =>
                    setProductConfig({
                      ...productConfig,
                      flashSalePrice: Number(e.target.value),
                    })
                  }
                />
                {productConfig.flashSalePrice >=
                  productConfig.product.basePrice && (
                  <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      warning
                    </span>
                    Giá Flash Sale nên thấp hơn giá gốc
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Số lượng bán
                </label>
                <input
                  type="number"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={productConfig.quantity}
                  onChange={(e) =>
                    setProductConfig({
                      ...productConfig,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() =>
                  setProductConfig({ ...productConfig, isOpen: false })
                }
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Hủy
              </button>
              <button
                onClick={submitAddProduct}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/20"
              >
                Xác nhận thêm
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type="danger"
        confirmText="Xác nhận"
        cancelText="Hủy"
      />
    </div>
  );
}
