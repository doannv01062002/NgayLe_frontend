"use client";

import { useEffect, useState } from "react";
import { ECardStats } from "@/features/admin/ecards/ECardStats";
import { ECardTemplateList } from "@/features/admin/ecards/ECardTemplateList";
import { ECardTemplateFormModal } from "@/features/admin/ecards/ECardTemplateFormModal";
import { ECardPreviewModal } from "@/features/admin/ecards/ECardPreviewModal";
import { StickerManager } from "@/features/admin/ecards/StickerManager";
import { ECardTemplate } from "@/types/ecard";
import { eCardService } from "@/services/ecard.service";
import { cn } from "@/lib/utils";

export default function AdminECardsPage() {
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ECardTemplate | null>(null);

  const [activeTab, setActiveTab] = useState<"templates" | "stickers">(
    "templates"
  );

  // Data states
  const [templates, setTemplates] = useState<ECardTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 11;

  // Filter states
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchTemplates();
  }, [refreshKey, page, category, statusFilter]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const data = await eCardService.getTemplates({
        page,
        size: pageSize,
        keyword: keyword || undefined,
        category: category || undefined,
        status: statusFilter || undefined,
      });
      setTemplates(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (template: ECardTemplate) => {
    setSelectedTemplate(template);
    setIsFormModalOpen(true);
  };

  const handleView = (template: ECardTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa mẫu này?")) {
      try {
        await eCardService.deleteTemplate(id);
        setRefreshKey((prev) => prev + 1);
      } catch (error) {
        console.error("Failed to delete", error);
        alert("Xóa thất bại");
      }
    }
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleSearch = () => {
    setPage(0);
    setRefreshKey((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a
          className="hover:text-primary transition-colors flex items-center"
          href="#"
        >
          <span className="material-symbols-outlined text-lg">home</span>
        </a>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <a className="hover:text-primary font-medium" href="#">
          Quản lý Tính năng Đặc thù
        </a>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          Mẫu Thiệp điện tử
        </span>
      </nav>

      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Quản lý Mẫu Thiệp điện tử
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
            Đăng tải và quản lý các mẫu thiệp cho các dịp lễ quan trọng.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Thêm Mẫu Mới
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-1">
        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "px-4 py-2 -mb-1 font-bold transition-colors border-b-2",
            activeTab === "templates"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          Quản lý Mẫu
        </button>
        <button
          onClick={() => setActiveTab("stickers")}
          className={cn(
            "px-4 py-2 -mb-1 font-bold transition-colors border-b-2",
            activeTab === "stickers"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          Quản lý Nhãn dán
        </button>
      </div>

      {activeTab === "templates" ? (
        <div className="flex flex-col gap-6">
          <ECardStats key={refreshKey} />

          {/* Filters & Toolbar */}
          <div className="bg-white dark:bg-[#1a2634] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Tìm kiếm theo tên mẫu..."
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="relative w-full sm:w-48">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  calendar_month
                </span>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(0);
                  }}
                  className="w-full pl-10 pr-8 py-2 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="">Tất cả dịp lễ</option>
                  <option value="Tet">Tết Nguyên Đán</option>
                  <option value="Valentine">Valentine</option>
                  <option value="Birthday">Sinh Nhật</option>
                  <option value="ThankYou">Cảm ơn</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  arrow_drop_down
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">
                  search
                </span>
                <span>Tìm</span>
              </button>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <button
                onClick={() => setStatusFilter("")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                  statusFilter === ""
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                  statusFilter === "active"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent"
                }`}
              >
                Đang hiện
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
                  statusFilter === "inactive"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent"
                }`}
              >
                Đang ẩn
              </button>
            </div>
          </div>

          <ECardTemplateList
            templates={templates}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleCreate}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Hiển thị{" "}
              <span className="font-medium">
                {Math.min(page * pageSize + 1, totalElements)}
              </span>{" "}
              -{" "}
              <span className="font-medium">
                {Math.min((page + 1) * pageSize, totalElements)}
              </span>{" "}
              của <span className="font-medium">{totalElements}</span> kết quả
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Trước
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      ) : (
        <StickerManager />
      )}

      <ECardTemplateFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={handleSuccess}
        templateToEdit={selectedTemplate}
      />

      <ECardPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        template={selectedTemplate}
      />
    </>
  );
}
