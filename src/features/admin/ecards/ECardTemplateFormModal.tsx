"use client";

import { useEffect, useState, useRef } from "react";
import { CreateECardTemplateParams, ECardTemplate } from "@/types/ecard";
import { eCardService } from "@/services/ecard.service";

interface ECardTemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  templateToEdit?: ECardTemplate | null;
}

export function ECardTemplateFormModal({
  isOpen,
  onClose,
  onSuccess,
  templateToEdit,
}: ECardTemplateFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CreateECardTemplateParams>({
    name: "",
    category: "Tet",
    isPremium: false,
    canvasDataJson: "{}",
  });

  useEffect(() => {
    if (templateToEdit) {
      setFormData({
        name: templateToEdit.name,
        category: templateToEdit.category,
        isPremium: templateToEdit.isPremium,
        canvasDataJson: templateToEdit.canvasDataJson,
      });
      setPreviewUrl(templateToEdit.thumbnailUrl || "");
      setImageFile(null);
    } else {
      setFormData({
        name: "",
        category: "Tet",
        isPremium: false,
        canvasDataJson: "{}",
      });
      setPreviewUrl("");
      setImageFile(null);
    }
  }, [templateToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clean up memory when component unmounts or preview changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, image: imageFile };

      if (templateToEdit) {
        await eCardService.updateTemplate(templateToEdit.id, payload);
      } else {
        await eCardService.createTemplate(payload);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save template", error);
      alert("Lỗi khi lưu mẫu thiệp");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {templateToEdit ? "Chỉnh sửa Mẫu" : "Thêm Mẫu Mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên Mẫu
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Ví dụ: Thiệp Tết 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Tet">Tết Nguyên Đán</option>
              <option value="Christmas">Giáng Sinh</option>
              <option value="Valentine">Valentine</option>
              <option value="Birthday">Sinh Nhật</option>
              <option value="ThankYou">Cảm Ơn</option>
              <option value="Wedding">Đám Cưới</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hình ảnh mẫu (Thumbnail)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary dark:hover:border-primary transition-colors bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <span className="material-symbols-outlined text-4xl text-gray-400">
                    cloud_upload
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    Nhấn để tải ảnh lên
                  </span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPremium"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
              className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <label
              htmlFor="isPremium"
              className="text-sm text-gray-700 dark:text-gray-300 select-none"
            >
              Mẫu cao cấp (Premium)
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-sm">
                  progress_activity
                </span>
              )}
              {templateToEdit ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
