"use client";

import { ECardTemplate } from "@/types/ecard";

interface ECardTemplateListProps {
  templates: ECardTemplate[];
  loading: boolean;
  onView: (template: ECardTemplate) => void;
  onEdit: (template: ECardTemplate) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}

export function ECardTemplateList({
  templates,
  loading,
  onView,
  onEdit,
  onDelete,
  onAddNew,
}: ECardTemplateListProps) {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Tet":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "Valentine":
        return "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800";
      case "Birthday":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      case "ThankYou":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Add New Card */}
      <div
        onClick={onAddNew}
        className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all hover:border-primary hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-primary dark:hover:bg-gray-800 cursor-pointer min-h-[300px]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 group-hover:scale-110 transition-transform duration-300 dark:bg-gray-800">
          <span className="material-symbols-outlined text-primary text-[24px]">
            add_photo_alternate
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Thêm mẫu mới
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Hỗ trợ SVG, PNG, JPG
          </p>
        </div>
      </div>

      {loading && templates.length === 0 ? (
        <div className="col-span-3 flex justify-center p-10">Loading...</div>
      ) : (
        templates.map((template) => (
          <div
            key={template.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-[#1a2634]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${
                    template.thumbnailUrl || "/placeholder-image.png"
                  }')`,
                }}
              ></div>
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={() => onView(template)}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    visibility
                  </span>
                  Xem thử
                </button>
                <button
                  onClick={() => onEdit(template)}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    edit
                  </span>
                  Chỉnh sửa
                </button>
              </div>
              {/* Badge */}
              <span
                className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm border ${getBadgeColor(
                  template.category
                )}`}
              >
                {template.category}
              </span>
              {template.isPremium && (
                <span className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm border bg-yellow-100 text-yellow-700 border-yellow-200">
                  PREMIUM
                </span>
              )}
            </div>
            <div className="flex flex-col p-4">
              <div className="flex justify-between items-start mb-1">
                <h3
                  className="font-semibold text-gray-900 dark:text-white line-clamp-1"
                  title={template.name}
                >
                  {template.name}
                </h3>
                <div className="relative group/menu">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <span className="material-symbols-outlined text-[20px]">
                      more_vert
                    </span>
                  </button>
                  {/* Dropdown Menu (Simple hover for demo, better with state) */}
                  <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover/menu:block z-10">
                    <button
                      onClick={() => onDelete(template.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                ID: #{template.id}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <div
                  className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
                  title="Lượt sử dụng"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    bar_chart
                  </span>
                  {template.usageCount}
                </div>
                {template.isActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                    Đang hiện
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                    Đang ẩn
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
