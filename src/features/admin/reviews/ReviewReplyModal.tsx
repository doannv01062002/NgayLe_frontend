import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { reviewService } from "@/services/reviewService";

interface ReviewReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: number | null;
  onSuccess: () => void;
  existingReply?: string;
}

export function ReviewReplyModal({
  isOpen,
  onClose,
  reviewId,
  onSuccess,
  existingReply,
}: ReviewReplyModalProps) {
  const [reply, setReply] = useState(existingReply || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reviewId || !reply.trim()) return;

    setIsSubmitting(true);
    try {
      await reviewService.replyReview(reviewId, reply);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Reply failed", error);
      alert("Gửi phản hồi thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trả lời đánh giá">
      <div className="p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nội dung phản hồi
          </label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[150px]"
            placeholder="Nhập nội dung phản hồi của bạn..."
          ></textarea>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !reply.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : null}
            Gửi phản hồi
          </button>
        </div>
      </div>
    </Modal>
  );
}
