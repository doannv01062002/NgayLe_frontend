"use client";
import React, { useEffect, useState } from "react";
import { reviewService, ProductReview } from "@/services/reviewService";

import { useToast } from "@/context/ToastContext";
import { AuthResponse } from "@/services/authService";

interface ProductReviewsProps {
  productId?: number;
  averageRating?: number;
  totalReviews?: number;
  onReviewSubmitted?: () => void;
}

export function ProductReviews({
  productId,
  averageRating = 0,
  totalReviews = 0,
  onReviewSubmitted,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(false);

  // Create Review State
  const [isWriting, setIsWriting] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const fetchReviews = async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const data = await reviewService.getProductReviews(productId, 0, 10);
      setReviews(data.content);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }

    if (!newComment.trim()) {
      toast.warning("Vui lòng nhập nội dung đánh giá");
      return;
    }

    if (newRating === 0) {
      toast.warning("Vui lòng chọn số sao");
      return;
    }

    try {
      setSubmitting(true);
      await reviewService.addProductReview({
        productId: productId!,
        rating: newRating,
        comment: newComment,
        mediaUrls: "[]", // Placeholder for now
      });
      toast.success("Đánh giá thành công!");
      setIsWriting(false);
      setNewComment("");
      setNewRating(5);
      fetchReviews(); // Refresh list locally
      if (onReviewSubmitted) {
        onReviewSubmitted(); // Trigger parent refresh
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const extraFull = decimal >= 0.75; // if .8 or .9, count as full? or allow standard rounding?
    // Let's stick to standard simpler logic: if >= 0.5, half. if >= 0.8 full?
    // Actually standard Material Design often uses half stars.
    // Let's rely on standard logic:
    // 3.5 -> 3 full, 1 half, 1 empty.

    // Revised logic to match 3.5 exactly:
    // We iterate 1 to 5.

    for (let i = 1; i <= 5; i++) {
      let iconName = "star_border";
      let isFilled = false;

      if (i <= rating) {
        iconName = "star";
        isFilled = true;
      } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
        // Handle 3.5 -> 4th star is half
        // Material Symbols has 'star_half'
        iconName = "star_half";
        isFilled = true;
      }

      stars.push(
        <span
          key={i}
          className="material-symbols-outlined fill-current"
          style={
            isFilled
              ? { fontVariationSettings: "'FILL' 1" }
              : { fontVariationSettings: "'FILL' 0" }
          }
        >
          {iconName}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold mb-6">ĐÁNH GIÁ SẢN PHẨM</h2>
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-6 bg-primary/5 p-6 rounded-lg mb-8 border border-primary/10">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <span className="text-4xl font-extrabold text-primary">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-slate-500">trên 5</span>
          <div className="flex text-primary text-[20px] my-1">
            {renderStars(averageRating)}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button className="px-3 py-1 bg-white border border-primary text-primary text-sm font-medium rounded">
              Tất cả ({totalReviews})
            </button>
          </div>

          {/* Write Review Button */}
          {!isWriting && (
            <button
              onClick={() => setIsWriting(true)}
              className="px-4 py-2 bg-[#d0011b] text-white text-sm font-bold rounded hover:bg-[#a50115] transition-colors"
            >
              Viết đánh giá
            </button>
          )}
        </div>
      </div>

      {/* Write Review Form */}
      {isWriting && (
        <div className="mb-8 p-4 border border-slate-200 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold mb-3">Gửi đánh giá của bạn</h3>

          {/* Star Rating Select */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Chọn số sao:</span>
            <div className="flex text-yellow-500 cursor-pointer">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  onClick={() => setNewRating(s)}
                  className="material-symbols-outlined text-2xl hover:scale-110 transition-transform"
                  style={{
                    fontVariationSettings:
                      s <= newRating ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {s <= newRating ? "star" : "star_border"}
                </span>
              ))}
            </div>
            <span className="text-sm text-slate-500 ml-2">
              ({newRating} sao)
            </span>
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <textarea
              className="w-full p-3 border border-slate-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none dark:bg-slate-700 dark:border-slate-600"
              rows={4}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded transition-colors"
              disabled={submitting}
            >
              Hủy
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="px-6 py-2 bg-[#d0011b] text-white font-bold rounded hover:bg-[#a50115] transition-colors disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-4 text-slate-500">
            Đang tải đánh giá...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-4 text-slate-500">
            Chưa có đánh giá nào.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="border-b border-slate-100 pb-6"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    src={
                      review.userAvatar ||
                      "https://ui-avatars.com/api/?name=" + review.userName
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{review.userName}</div>
                  <div className="flex text-yellow-400 text-[14px] mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    {review.comment}
                  </p>
                  {review.mediaUrls && (
                    <div className="flex gap-2">
                      {/* Assuming mediaUrls is JSON string of array */}
                      {(() => {
                        try {
                          const urls = JSON.parse(review.mediaUrls);
                          return Array.isArray(urls)
                            ? urls.map((url: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="size-16 rounded bg-slate-100 overflow-hidden cursor-pointer"
                                >
                                  <img
                                    className="w-full h-full object-cover"
                                    src={url}
                                    alt="review"
                                  />
                                </div>
                              ))
                            : null;
                        } catch (e) {
                          return null;
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalReviews > 10 && (
        <button className="w-full mt-4 py-2 text-slate-500 text-sm font-medium border border-slate-200 rounded hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer">
          Xem tất cả đánh giá
        </button>
      )}
    </div>
  );
}
