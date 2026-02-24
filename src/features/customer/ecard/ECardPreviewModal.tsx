"use client";
import React, { useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ECardState } from "@/types/ecard";
import { ECardCanvas } from "./ECardCanvas";
import html2canvas from "html2canvas";
import { useToast } from "@/context/ToastContext";

interface ECardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ECardState;
}

export function ECardPreviewModal({
  isOpen,
  onClose,
  state,
}: ECardPreviewModalProps) {
  const { success, error } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const element = document.getElementById("ecard-preview-node");
      if (!element) {
        throw new Error("Không tìm thấy nội dung thiệp");
      }

      // Select the inner card container (the one with the shadow and overflow hidden)
      // The element structure in ECardCanvas is: Wrapper > Card Mockup > Content
      // "ecard-preview-node" points to the Wrapper. The Card Mockup is the first child.
      const cardElement = element.querySelector(
        ".relative.w-full.max-w-\\[480px\\]"
      ) as HTMLElement;

      const { toPng } = await import("html-to-image");
      let canvasDataUrl;
      try {
        canvasDataUrl = await toPng(cardElement || element, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        });
      } catch (e) {
        console.warn("Retrying with skipFonts...", e);
        canvasDataUrl = await toPng(cardElement || element, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          skipFonts: true,
        });
      }

      const link = document.createElement("a");
      link.href = canvasDataUrl;
      link.download = `ngayle-ecard-${Date.now()}.png`;
      link.click();
      success("Đã tải ảnh thiệp thành công!", "Thành công");
    } catch (err) {
      console.error(err);
      error("Có lỗi khi tải ảnh. Vui lòng thử lại.", "Lỗi");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xem trước thiệp"
      className="max-w-2xl"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#b00e0e] transition-colors shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
            )}
            {isDownloading ? "Đang xử lý..." : "Tải về máy"}
          </button>
        </>
      }
    >
      <div className="flex justify-center bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
        <div className="w-[300px] pointer-events-none select-none">
          {/* We pass a dummy setState because it's read-only */}
          <ECardCanvas
            id="ecard-preview-node"
            state={state}
            setState={() => {}}
            readOnly={true}
          />
        </div>
      </div>
    </Modal>
  );
}
