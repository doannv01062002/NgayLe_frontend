"use client";

import { useEffect, useState } from "react";
import { ProductReview, reviewService } from "@/services/reviewService";
import { ProductReviewList } from "@/features/admin/reviews/ProductReviewList";
import { RatingFilter } from "@/features/admin/reviews/RatingFilter";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useToast } from "@/context/ToastContext";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(false);
  const { success, error: toastError, info } = useToast();

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: (() => void) | null;
  }>({
    isOpen: false,
    title: "",
    message: "",
    action: null,
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  // Filters
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [page, rating, searchTrigger]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getAdminReviews(
        page,
        pageSize,
        keyword,
        rating
      );
      setReviews(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setSearchTrigger((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleDelete = (id: number) => {
    setConfirmModal({
      isOpen: true,
      title: "Xác nhận xóa",
      message:
        "Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác.",
      action: async () => {
        try {
          await reviewService.deleteReview(id);
          success("Đã xóa đánh giá thành công.");
          fetchReviews();
        } catch (err) {
          console.error("Delete failed", err);
          toastError("Xóa thất bại. Vui lòng thử lại.");
        }
      },
    });
  };

  const handleToggleVisibility = (
    id: number,
    isCurrentlyHidden: boolean | undefined
  ) => {
    const actionText = isCurrentlyHidden ? "hiện" : "ẩn";
    setConfirmModal({
      isOpen: true,
      title: `Xác nhận ${actionText} đánh giá`,
      message: `Bạn có chắc chắn muốn ${actionText} đánh giá này?`,
      action: async () => {
        try {
          await reviewService.toggleVisibility(id);
          // Optimistic update
          setReviews((prev) =>
            prev.map((r) =>
              r.reviewId === id ? { ...r, isHidden: !r.isHidden } : r
            )
          );
          success(`Đã ${actionText} đánh giá thành công.`);
        } catch (err) {
          console.error("Toggle visibility failed", err);
          toastError("Thao tác thất bại.");
        }
      },
    });
  };

  const handleReplySuccess = () => {
    fetchReviews();
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
        <span className="text-gray-900 dark:text-white font-medium">
          Quản lý Đánh giá
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Quản lý Đánh giá sản phẩm
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl">
            Xem, ẩn/hiện và trả lời đánh giá từ khách hàng.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Toolbar */}
        <div className="bg-white dark:bg-[#1a2634] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Tìm theo sản phẩm, người dùng, nội dung..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <RatingFilter selectedRating={rating} onChange={setRating} />
          </div>
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm shadow-primary/30"
          >
            <span className="material-symbols-outlined text-[18px]">
              search
            </span>
            Tìm kiếm
          </button>
        </div>

        <ProductReviewList
          reviews={reviews}
          loading={loading}
          onDelete={handleDelete}
          onToggleVisibility={handleToggleVisibility}
          onReplySuccess={handleReplySuccess}
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
            của <span className="font-medium">{totalElements}</span> đánh giá
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

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => confirmModal.action && confirmModal.action()}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.title.includes("xóa") ? "danger" : "default"}
      />
    </>
  );
}
