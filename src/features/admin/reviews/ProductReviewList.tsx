import { ProductReview } from "@/services/reviewService";
import { ReviewReplyModal } from "./ReviewReplyModal";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface ProductReviewListProps {
  reviews: ProductReview[];
  loading: boolean;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number, isHidden?: boolean) => void;
  onReplySuccess: () => void;
}

export function ProductReviewList({
  reviews,
  loading,
  onDelete,
  onToggleVisibility,
  onReplySuccess,
}: ProductReviewListProps) {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(
    null
  );

  const handleReplyClick = (review: ProductReview) => {
    setSelectedReview(review);
    setReplyModalOpen(true);
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a2634] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Sản phẩm
              </th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Người đánh giá
              </th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                Đánh giá
              </th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-1/3">
                Nội dung
              </th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-end">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map((review) => (
              <tr
                key={review.reviewId}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={review.productImage || "/placeholder-image.png"}
                      alt={review.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="max-w-[200px]">
                      <div
                        className="font-medium text-gray-900 dark:text-white line-clamp-1"
                        title={review.productName}
                      >
                        {review.productName || `Product #${review.productId}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {review.productId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        review.userAvatar ||
                        "https://ui-avatars.com/api/?name=" + review.userName
                      }
                      className="w-8 h-8 rounded-full bg-gray-100"
                      alt=""
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {review.userName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-top text-center">
                  <div className="inline-flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded text-yellow-600 font-bold">
                    <span>{review.rating}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      star
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {review.comment}
                    </p>
                    {review.mediaUrls && (
                      <div className="flex gap-2 mt-2">
                        {/* Simplistic JSON parsing for demo. In real app, parse this properly if it's JSON string array */}
                        {/* Assuming Backend returns CSV or JSON string of URLs? Entity says JSON, DTO says String. Let's assume naive display for now */}
                        {/* Update: if it's a raw string URL or JSON string array */}
                      </div>
                    )}
                    {review.reply && (
                      <div className="mt-3 pl-3 border-l-2 border-primary/30 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-r-lg">
                        <span className="text-xs font-bold text-primary block mb-1">
                          Phản hồi của Shop:
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {review.reply}
                        </p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 align-top text-end">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        onToggleVisibility(review.reviewId, review.isHidden!)
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        review.isHidden
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={
                        review.isHidden
                          ? "Đang ẩn (Hiện lại)"
                          : "Đang hiện (Ẩn đi)"
                      }
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {review.isHidden ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleReplyClick(review)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Trả lời"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        reply
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(review.reviewId)}
                      className="p-2 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  Không tìm thấy đánh giá nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReviewReplyModal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        reviewId={selectedReview?.reviewId || null}
        onSuccess={onReplySuccess}
        existingReply={selectedReview?.reply}
        key={selectedReview?.reviewId} // Force remount on change
      />
    </div>
  );
}
