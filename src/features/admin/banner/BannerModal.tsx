import React, { useState, useEffect, useRef } from "react";
import { Banner, BannerPosition } from "@/types/banner";
import { bannerService } from "@/services/bannerService";
import { useToast } from "@/context/ToastContext";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  banner?: Banner;
  onSave: () => void;
  existingBanners?: Banner[];
}

export default function BannerModal({
  isOpen,
  onClose,
  banner,
  onSave,
  existingBanners = [],
}: Props) {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Banner>>({
    title: "",
    linkUrl: "",
    position: BannerPosition.HOME_SLIDER,
    isActive: true,
    displayOrder: 0,
    startTime: "",
    endTime: "",
    imageUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Conflict Modal State
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictBanner, setConflictBanner] = useState<Banner | null>(null);

  useEffect(() => {
    if (banner) {
      setFormData({
        ...banner,
        startTime: banner.startTime
          ? new Date(banner.startTime).toISOString().slice(0, 16)
          : "",
        endTime: banner.endTime
          ? new Date(banner.endTime).toISOString().slice(0, 16)
          : "",
      });
      setPreview(banner.imageUrl);
    } else {
      setFormData({
        title: "",
        linkUrl: "",
        position: BannerPosition.HOME_SLIDER,
        isActive: true,
        displayOrder: 0,
        startTime: new Date().toISOString().slice(0, 16),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 16),
        imageUrl: "",
      });
      setPreview(null);
    }
    setSelectedFile(null);
  }, [banner, isOpen]);

  useEffect(() => {
    if (isOpen && formData.position) {
      if (formData.position === BannerPosition.HOME_SUB_BANNER) {
        if (formData.displayOrder !== 1 && formData.displayOrder !== 2) {
          setFormData((prev) => ({ ...prev, displayOrder: 1 }));
        }
      } else {
        for (let i = 1; i <= 20; i++) {
          const isTaken = existingBanners.some(
            (b) =>
              b.position === formData.position &&
              b.displayOrder === i &&
              b.isActive &&
              b.bannerId !== banner?.bannerId
          );
          if (!isTaken) {
            setFormData((prev) => ({ ...prev, displayOrder: i }));
            break;
          }
        }
      }
    }
  }, [formData.position, isOpen, existingBanners]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const saveBanner = async () => {
    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (selectedFile) {
        finalImageUrl = await bannerService.uploadImage(selectedFile);
      }

      if (!finalImageUrl) {
        error("Vui lòng chọn ảnh banner");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        startTime: formData.startTime
          ? new Date(formData.startTime).toISOString()
          : undefined,
        endTime: formData.endTime
          ? new Date(formData.endTime).toISOString()
          : undefined,
      };

      if (banner?.bannerId) {
        await bannerService.updateBanner(banner.bannerId, payload);
        success("Cập nhật banner thành công!");
      } else {
        await bannerService.createBanner(payload);
        success("Tạo banner mới thành công!");
      }
      onSave();
      onClose();
    } catch (e: any) {
      console.error("Save failed", e);
      error("Có lỗi xảy ra khi lưu banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.position === BannerPosition.HOME_SUB_BANNER) {
      if (formData.displayOrder !== 1 && formData.displayOrder !== 2) {
        error("Banner phụ trang chủ chỉ chấp nhận thứ tự hiển thị 1 hoặc 2");
        return;
      }

      if (formData.isActive) {
        const conflict = existingBanners.find(
          (b) =>
            b.position === BannerPosition.HOME_SUB_BANNER &&
            b.displayOrder === formData.displayOrder &&
            b.isActive &&
            b.bannerId !== banner?.bannerId
        );

        if (conflict) {
          setConflictBanner(conflict);
          setShowConflictModal(true);
          return;
        }
      }
    }

    await saveBanner();
  };

  const handleConfirmOverwrite = async () => {
    if (!conflictBanner) return;
    try {
      await bannerService.toggleStatus(conflictBanner.bannerId);
    } catch (e) {
      error("Không thể tắt banner cũ. Vui lòng thử lại.");
      setShowConflictModal(false);
      return;
    }
    await saveBanner();
    setShowConflictModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              {banner ? "Chỉnh sửa Banner" : "Thêm Banner Mới"}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form id="bannerForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình ảnh Banner
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors aspect-video relative group overflow-hidden"
                  >
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-[32px]">
                            edit
                          </span>
                        </div>
                      </>
                    ) : loading ? (
                      <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
                          add_photo_alternate
                        </span>
                        <span className="text-sm text-gray-500">
                          Click để tải ảnh lên
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 5MB
                        </span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên Banner / Chiến dịch
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="Ví dụ: Sale Lễ 2/9 - Big Sale"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vị trí hiển thị
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        position: e.target.value as BannerPosition,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
                  >
                    {Object.values(BannerPosition).map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link liên kết (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.linkUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="https://..."
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian bắt đầu
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian kết thúc
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thứ tự hiển thị
                  </label>
                  <select
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
                  >
                    {formData.position === BannerPosition.HOME_SUB_BANNER
                      ? [1, 2].map((num) => (
                          <option key={num} value={num}>
                            {num}{" "}
                            {existingBanners.some(
                              (b) =>
                                b.position === BannerPosition.HOME_SUB_BANNER &&
                                b.displayOrder === num &&
                                b.isActive &&
                                b.bannerId !== banner?.bannerId
                            )
                              ? "(Đang hiển thị)"
                              : ""}
                          </option>
                        ))
                      : Array.from({ length: 20 }, (_, i) => i + 1)
                          .filter(
                            (num) =>
                              !existingBanners.some(
                                (b) =>
                                  b.position === formData.position &&
                                  b.displayOrder === num &&
                                  b.isActive &&
                                  b.bannerId !== banner?.bannerId
                              )
                          )
                          .map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.position === BannerPosition.HOME_SUB_BANNER
                      ? "Vị trí này chỉ cho phép thứ tự 1 và 2."
                      : "Các thứ tự đang được sử dụng đã bị ẩn."}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Kích hoạt ngay
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              form="bannerForm"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none flex items-center gap-2"
            >
              {loading && (
                <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {banner ? "Cập nhật Banner" : "Tạo Banner Mới"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        onConfirm={handleConfirmOverwrite}
        title="Xác nhận thay thế"
        message={`Vị trí ${formData.displayOrder} đang hiển thị banner "${conflictBanner?.title}". Bạn có muốn tắt banner đó để hiển thị banner này không?`}
        confirmText="Đồng ý tắt & Lưu"
        cancelText="Hủy bỏ"
        type="warning"
      />
    </>
  );
}
