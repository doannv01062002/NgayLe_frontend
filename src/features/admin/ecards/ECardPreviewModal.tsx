"use client";

import { ECardTemplate } from "@/types/ecard";

interface ECardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: ECardTemplate | null;
}

export function ECardPreviewModal({
  isOpen,
  onClose,
  template,
}: ECardPreviewModalProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-[#1a2632] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Image Section */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8 overflow-auto">
          <img
            src={template.thumbnailUrl || "/placeholder-image.png"}
            alt={template.name}
            className="max-w-full max-h-[70vh] object-contain shadow-lg rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-80 bg-white dark:bg-[#1a2632] p-6 flex flex-col border-l border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <span
              className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold mb-3 border ${
                template.category === "Tet"
                  ? "bg-red-100 text-red-700 border-red-200"
                  : template.category === "Valentine"
                  ? "bg-pink-100 text-pink-700 border-pink-200"
                  : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              {template.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {template.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: #{template.id}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Trạng thái
              </span>
              {template.isActive ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Đang hiện
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  Đang ẩn
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Loại mẫu
              </span>
              {template.isPremium ? (
                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded border border-yellow-200">
                  Premium
                </span>
              ) : (
                <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                  Miễn phí
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Lượt sử dụng
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {template.usageCount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Ngày tạo
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(template.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
