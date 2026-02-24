import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { addressService, Address } from "@/services/addressService";
import { useToast } from "@/context/ToastContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
  selectedAddressId?: number;
}

export function AddressSelectionModal({
  isOpen,
  onClose,
  onSelect,
  selectedAddressId,
}: Props) {
  const [view, setView] = useState<"LIST" | "FORM">("LIST");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { success, error: toastError } = useToast();

  // Form State
  const [formData, setFormData] = useState<Address>({
    recipientName: "",
    recipientPhone: "",
    addressLine1: "", // Specific Address
    city: "",
    district: "",
    ward: "",
    isDefault: false,
    type: "DELIVERY",
  });

  useEffect(() => {
    if (isOpen) {
      loadAddresses();
      setView("LIST");
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const data = await addressService.getAll();
      setAddresses(data);
    } catch (err) {
      console.error(err);
      toastError("Không thể tải danh sách địa chỉ.", "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      recipientName: "",
      recipientPhone: "",
      addressLine1: "",
      city: "",
      district: "",
      ward: "",
      isDefault: false,
      type: "DELIVERY",
    });
    setView("FORM");
  };

  const handleEdit = (addr: Address) => {
    setEditingAddress(addr);
    setFormData({ ...addr });
    setView("FORM");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      try {
        await addressService.delete(id);
        success("Đã xóa địa chỉ thành công.", "Thành công");
        loadAddresses();
      } catch (err) {
        toastError("Không thể xóa địa chỉ.", "Lỗi");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddress && editingAddress.addressId) {
        await addressService.update(editingAddress.addressId, formData);
        success("Cập nhật địa chỉ thành công.", "Thành công");
      } else {
        await addressService.create(formData);
        success("Thêm mới địa chỉ thành công.", "Thành công");
      }
      loadAddresses();
      setView("LIST");
    } catch (err) {
      toastError("Có lỗi xảy ra. Vui lòng kiểm tra lại.", "Lỗi");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await addressService.setDefault(id);
      success("Đã đặt làm địa chỉ mặc định.", "Thành công");
      loadAddresses();
    } catch (err) {
      toastError("Không thể đặt mặc định.", "Lỗi");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === "LIST"
          ? "Địa chỉ của tôi"
          : editingAddress
          ? "Cập nhật địa chỉ"
          : "Thêm địa chỉ mới"
      }
      // Wider modal for list
      className="max-w-2xl"
    >
      {view === "LIST" ? (
        <div className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {addresses.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-8">
                Bạn chưa có địa chỉ nào. Hãy thêm mới nhé!
              </div>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.addressId}
                className={`flex flex-col sm:flex-row justify-between items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedAddressId === addr.addressId
                    ? "border-[#d0011b] bg-red-50/20"
                    : "border-gray-200"
                }`}
              >
                <div className="flex gap-3">
                  <div className="pt-1">
                    <input
                      type="radio"
                      name="address_select"
                      className="w-4 h-4 accent-[#d0011b] cursor-pointer"
                      checked={selectedAddressId === addr.addressId}
                      onChange={() => onSelect(addr)}
                    />
                  </div>
                  <div className="space-y-1 text-sm text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold border-r border-gray-300 pr-2">
                        {addr.recipientName}
                      </span>
                      <span className="text-gray-500">
                        {addr.recipientPhone}
                      </span>
                    </div>
                    <div>{addr.addressLine1}</div>
                    <div className="text-gray-500">
                      {`${addr.ward}, ${addr.district}, ${addr.city}`}
                    </div>
                    {addr.isDefault && (
                      <span className="border border-[#d0011b] text-[#d0011b] text-[10px] px-1 py-0.5 rounded font-bold uppercase inline-block mt-1">
                        Mặc định
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      onClick={() => handleEdit(addr)}
                      className="text-blue-600 hover:underline"
                    >
                      Cập nhật
                    </button>
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleDelete(addr.addressId!)}
                        className="text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.addressId!)}
                      className="text-gray-500 text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Thiết lập mặc định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-[#d0011b] text-white px-4 py-2 rounded hover:bg-[#a50115] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Thêm địa chỉ mới
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                required
                type="text"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                required
                type="text"
                value={formData.recipientPhone}
                onChange={(e) =>
                  setFormData({ ...formData, recipientPhone: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary"
                placeholder="VD: 0909123456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Tỉnh/Thành phố
              </label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary"
                placeholder="VD: Hồ Chí Minh"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Quận/Huyện
              </label>
              <input
                required
                type="text"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary"
                placeholder="VD: Quận 1"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phường/Xã
              </label>
              <input
                required
                type="text"
                value={formData.ward}
                onChange={(e) =>
                  setFormData({ ...formData, ward: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary"
                placeholder="VD: Bến Nghé"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Địa chỉ cụ thể
            </label>
            <textarea
              required
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-primary focus:border-primary resize-none h-20"
              placeholder="VD: 123 Đường Lê Lợi, Căn hộ 4B..."
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="w-4 h-4 accent-[#d0011b]"
            />
            <label
              htmlFor="isDefault"
              className="text-sm text-gray-700 cursor-pointer"
            >
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t mt-4">
            <button
              type="button"
              onClick={() => setView("LIST")}
              className="text-gray-600 px-4 py-2 hover:bg-gray-100 rounded text-sm transition-colors"
            >
              Trở lại
            </button>
            <button
              type="submit"
              className="bg-[#d0011b] text-white px-6 py-2 rounded hover:bg-[#a50115] transition-colors text-sm font-medium"
            >
              Hoàn thành
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
