"use client";

import { useEffect, useState } from "react";
import { homeFeatureService } from "@/services/homeFeature.service";
import { HomeFeatureProduct } from "@/types/home-management";
import { ProductPicker } from "@/components/admin/ProductPicker";
import { Product } from "@/types/product";
import { useToast } from "@/context/ToastContext";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AdminSuggestionsPage() {
  const { showToast, success, error } = useToast();
  const [items, setItems] = useState<HomeFeatureProduct[]>([]);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Edit Order Modal State
  const [editOrderModal, setEditOrderModal] = useState<{
    isOpen: boolean;
    id: number | null;
    currentOrder: number;
  }>({
    isOpen: false,
    id: null,
    currentOrder: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await homeFeatureService.getAdminFeatures(
        "TODAYS_SUGGESTION",
        0
      );
      setItems(data.content);
    } catch (e) {
      console.error(e);
      // error("Không thể tải danh sách gợi ý"); // Use silent fail generally for load
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: Product) => {
    try {
      await homeFeatureService.addProduct(
        product.productId,
        "TODAYS_SUGGESTION"
      );
      setIsProductPickerOpen(false);
      fetchItems();
      success("Đã thêm sản phẩm vào danh sách gợi ý");
    } catch (e: any) {
      error("Lỗi thêm sản phẩm: " + (e.response?.data?.message || e.message));
    }
  };

  const handleRemove = (id: number) => {
    setConfirmModal({
      isOpen: true,
      title: "Xóa đề xuất",
      message: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách gợi ý?",
      onConfirm: async () => {
        try {
          await homeFeatureService.removeProduct(id);
          fetchItems();
          success("Đã xóa sản phẩm khỏi danh sách");
        } catch (e) {
          error("Lỗi khi xóa sản phẩm");
        }
      },
    });
  };

  const openOrderModal = (id: number, current: number) => {
    setEditOrderModal({
      isOpen: true,
      id,
      currentOrder: current,
    });
  };

  const submitUpdateOrder = async () => {
    if (!editOrderModal.id) return;
    try {
      await homeFeatureService.updateOrder(
        editOrderModal.id,
        editOrderModal.currentOrder
      );
      setEditOrderModal({ ...editOrderModal, isOpen: false });
      fetchItems();
      success("Đã cập nhật thứ tự hiển thị");
    } catch (e) {
      error("Lỗi cập nhật thứ tự");
    }
  };

  return (
    <div className="p-6 w-full max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Gợi ý hôm nay
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Quản lý bộ sưu tập sản phẩm nổi bật xuất hiện trên trang chủ. Tối ưu
            hiển thị để tăng tỷ lệ chuyển đổi.
          </p>
        </div>
        <button
          onClick={() => setIsProductPickerOpen(true)}
          className="flex items-center justify-center gap-2 h-12 px-6 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Thêm Sản Phẩm
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Tổng sản phẩm hiển thị",
            value: items.length,
            icon: "inventory_2",
            color: "text-blue-500",
            trend: "Optimal",
            trendUp: true,
          },
          {
            label: "Giá trung bình",
            value: items.length
              ? (
                  items.reduce((acc, i) => acc + (i.price || 0), 0) /
                  items.length
                ).toLocaleString() + "đ"
              : "0đ",
            icon: "attach_money",
            color: "text-green-500",
            trend: "+5%",
            trendUp: true,
          },
          {
            label: "Lượt xem (Tuần)",
            value: "1.2k",
            icon: "visibility",
            color: "text-purple-500",
            trend: "+15%",
            trendUp: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                {stat.label}
              </p>
              <span className={`material-symbols-outlined ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <span
                className={`text-sm font-semibold px-1.5 py-0.5 rounded flex items-center ${
                  stat.trendUp
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30"
                    : "text-rose-600 bg-rose-50 dark:bg-rose-900/30"
                }`}
              >
                {stat.trendUp ? (
                  <span className="material-symbols-outlined text-[14px]">
                    trending_up
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[14px]">
                    trending_down
                  </span>
                )}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1a2632]">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              format_list_bulleted
            </span>
            Danh sách hiển thị
          </h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative group w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 group-focus-within:text-primary transition-colors text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1 bg-gray-50/30 dark:bg-[#111927]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100/50 dark:bg-gray-800/80 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-bold text-center w-32">Thứ tự</th>
                <th className="px-6 py-4 font-bold">Sản phẩm</th>
                <th className="px-6 py-4 font-bold text-center">Giá bán</th>
                <th className="px-6 py-4 font-bold text-center">Trạng thái</th>
                <th className="px-6 py-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-primary">
                      <span className="loading loading-spinner"></span>
                      <span>Đang tải danh sách...</span>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-20 text-center text-gray-500 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-5xl text-gray-300">
                        inbox
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                      Danh sách trống
                    </h4>
                    <p>Chưa có sản phẩm nào được ghim ở mục này.</p>
                  </td>
                </tr>
              ) : (
                items
                  .filter((item) =>
                    item.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              openOrderModal(item.id, item.displayOrder)
                            }
                            className="font-mono text-lg font-bold text-gray-500 hover:text-primary w-10 h-10 rounded-lg hover:bg-blue-50 flex items-center justify-center transition-colors border border-transparent hover:border-blue-200"
                            title="Nhấn để đổi vị trí"
                          >
                            {item.displayOrder}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl border border-gray-200 p-1 bg-white flex-shrink-0 shadow-sm">
                            <img
                              src={item.productImage || "/placeholder.png"}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span
                              className="font-bold text-gray-900 dark:text-white line-clamp-1 max-w-md text-base"
                              title={item.productName}
                            >
                              {item.productName}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded w-fit">
                              ID: {item.productId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-primary text-base">
                          {item.price?.toLocaleString()}đ
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          Hiển thị
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-400 hover:text-red-500 w-10 h-10 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center ml-auto"
                          title="Xóa khỏi danh sách"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductPicker
        isOpen={isProductPickerOpen}
        onClose={() => setIsProductPickerOpen(false)}
        onSelect={handleAddProduct}
        title="Chọn sản phẩm gợi ý"
      />

      {/* Edit Order Modal */}
      {editOrderModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                low_priority
              </span>
              Cập nhật thứ tự
            </h3>
            <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              Nhập số thứ tự ưu tiên hiển thị. Số nhỏ hơn sẽ hiển thị trước (VD:
              1, 2, 3...).
            </p>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">
                Thứ tự hiện tại
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-primary/50 text-center text-2xl font-bold text-primary"
                value={editOrderModal.currentOrder}
                onChange={(e) =>
                  setEditOrderModal({
                    ...editOrderModal,
                    currentOrder: parseInt(e.target.value) || 0,
                  })
                }
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditOrderModal({ ...editOrderModal, isOpen: false })
                }
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Hủy
              </button>
              <button
                onClick={submitUpdateOrder}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/20"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Confirmation Modal */}
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
