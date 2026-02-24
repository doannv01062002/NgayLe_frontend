"use client";

import { useEffect, useState } from "react";
import {
  adminSupportService,
  SupportArticleDTO,
} from "@/services/adminSupportService";
import { useToast } from "@/context/ToastContext";

export function SupportTable() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [articles, setArticles] = useState<SupportArticleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] =
    useState<SupportArticleDTO | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    content: string;
    status: string;
  }>({
    title: "",
    category: "Chung",
    content: "",
    status: "DRAFT",
  });

  // Debouce Search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await adminSupportService.getArticles({
        status: activeTab === "ALL" ? undefined : activeTab,
        category: activeCategory === "ALL" ? undefined : activeCategory,
        search: debouncedSearch,
        page,
        size: 10,
      });
      setArticles(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [activeTab, activeCategory, debouncedSearch]);

  useEffect(() => {
    fetchArticles();
  }, [activeTab, activeCategory, debouncedSearch, page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Xác nhận xóa bài viết này?")) return;
    try {
      await adminSupportService.deleteArticle(id);
      showToast("Xóa bài viết thành công", "success");
      fetchArticles();
    } catch (error) {
      showToast("Xóa thất bại", "error");
    }
  };

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      category: "Chung",
      content: "",
      status: "DRAFT",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: SupportArticleDTO) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category || "Chung",
      content: article.content || "",
      status: article.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      showToast("Vui lòng nhập tiêu đề và nội dung.", "error");
      return;
    }
    try {
      if (editingArticle && editingArticle.id) {
        await adminSupportService.updateArticle(editingArticle.id, {
          ...formData,
          id: editingArticle.id, // keep ID
        });
        showToast("Cập nhật bài viết thành công", "success");
      } else {
        await adminSupportService.createArticle(formData);
        showToast("Thêm bài viết thành công", "success");
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (error) {
      showToast("Thao tác thất bại", "error");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col dark:bg-[#1a2632] dark:border-gray-700">
      {/* Tabs */}
      <div className="border-b border-gray-200 px-6 dark:border-gray-700">
        <div className="flex gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`flex items-center gap-2 border-b-[3px] pb-3 pt-4 px-1 whitespace-nowrap transition-colors ${
              activeTab === "ALL"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <p className="text-sm font-bold leading-normal">Tất cả bài viết</p>
          </button>
          <button
            onClick={() => setActiveTab("PUBLISHED")}
            className={`flex items-center gap-2 border-b-[3px] pb-3 pt-4 px-1 whitespace-nowrap transition-colors ${
              activeTab === "PUBLISHED"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <p className="text-sm font-medium leading-normal">Đã xuất bản</p>
          </button>
          <button
            onClick={() => setActiveTab("DRAFT")}
            className={`flex items-center gap-2 border-b-[3px] pb-3 pt-4 px-1 whitespace-nowrap transition-colors ${
              activeTab === "DRAFT"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <p className="text-sm font-medium leading-normal">Nháp</p>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="flex flex-1 items-center gap-2 min-w-[200px] max-w-sm bg-gray-50 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/50 focus-within:bg-white transition-all dark:bg-gray-800 dark:focus-within:bg-gray-800 dark:focus-within:border-primary">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              search
            </span>
            <input
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 focus:ring-0 p-0 text-gray-900 dark:text-white dark:placeholder-gray-400"
              placeholder="Tìm kiếm..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Category Filter */}
          <select
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="ALL">Tất cả danh mục</option>
            <option value="Chung">Chung</option>
            <option value="Chính sách">Chính sách</option>
            <option value="Hướng dẫn">Hướng dẫn</option>
            <option value="Thanh toán">Thanh toán</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Thêm bài viết</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-900 dark:text-white">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 font-medium" scope="col">
                Tiêu đề
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Danh mục
              </th>
              <th className="px-6 py-3 font-medium" scope="col">
                Cập nhật lần cuối
              </th>
              <th className="px-6 py-3 font-medium text-center" scope="col">
                Trạng thái
              </th>
              <th className="px-6 py-3 font-medium text-center" scope="col">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Đang tải...
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="bg-white hover:bg-gray-50 transition-colors group dark:bg-[#1a2632] dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {article.title}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5 text-xs font-medium dark:bg-blue-900/30 dark:text-blue-400">
                      {article.category || "Chung"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {article.updatedAt
                      ? new Date(article.updatedAt).toLocaleDateString("vi-VN")
                      : "N/A"}
                    <br />
                    <span className="text-xs">
                      bởi {article.updatedBy || "Admin"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {article.status === "PUBLISHED" && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                        Đã xuất bản
                      </span>
                    )}
                    {article.status === "DRAFT" && (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                        Nháp
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(article)}
                        className="text-gray-500 hover:text-primary transition-colors p-1 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => article.id && handleDelete(article.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50 dark:text-gray-400 dark:hover:bg-red-900/20"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Trang {page + 1} / {totalPages || 1}
        </span>
        <div className="inline-flex -space-x-px text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingArticle ? "Cập nhật bài viết" : "Thêm bài viết mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Danh mục
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Chung">Chung</option>
                  <option value="Chính sách">Chính sách</option>
                  <option value="Hướng dẫn">Hướng dẫn</option>
                  <option value="Thanh toán">Thanh toán</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trạng thái
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="DRAFT">Nháp</option>
                  <option value="PUBLISHED">Xuất bản</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nội dung
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg"
              >
                {editingArticle ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
