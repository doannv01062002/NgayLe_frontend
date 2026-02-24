"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sticker, ECardState, ECardTemplate } from "@/types/ecard";
import { eCardService } from "@/services/ecard.service";
import { useToast } from "@/context/ToastContext";
import React, { useRef } from "react";

import { ShareModal } from "./ShareModal";

interface ECardEditorProps {
  state: ECardState;
  setState: React.Dispatch<React.SetStateAction<ECardState>>;
  onPreview?: () => void;
}

export function ECardEditor({ state, setState, onPreview }: ECardEditorProps) {
  const { success, info, error } = useToast();
  const [activeTab, setActiveTab] = useState<
    "template" | "message" | "decoration"
  >("template");

  const [templates, setTemplates] = useState<ECardTemplate[]>([]);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [stickersList, setStickersList] = useState<Sticker[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    fetchTemplates();
    fetchStickers();
  }, [selectedCategory]);

  const fetchStickers = async () => {
    try {
      const res = await eCardService.getStickers();
      setStickersList(res);
    } catch (error) {
      console.error("Failed to fetch stickers", error);
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const categoryParam =
        selectedCategory === "Tất cả" ? undefined : selectedCategory;
      const res = await eCardService.getPublicTemplates({
        page: 0,
        size: 20,
        category: categoryParam,
      });
      setTemplates(res.content);

      // Select first template if none selected
      if (!state.template && res.content.length > 0) {
        setState((prev) => ({ ...prev, template: res.content[0] }));
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (tpl: ECardTemplate) => {
    setState((prev) => ({ ...prev, template: tpl }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, message: e.target.value }));
  };

  const updateStyle = (key: keyof typeof state.messageStyle, value: any) => {
    setState((prev) => ({
      ...prev,
      messageStyle: {
        ...prev.messageStyle,
        [key]: value,
      },
    }));
  };

  const addSticker = (url: string) => {
    setState((prev) => ({
      ...prev,
      stickers: [
        ...prev.stickers,
        {
          id: crypto.randomUUID(),
          url,
          x: 50, // center (percentage)
          y: 50, // center (percentage)
          scale: 1,
          rotation: 0,
        },
      ],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          addSticker(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCanvasBlob = async (): Promise<Blob | null> => {
    try {
      const { toBlob } = await import("html-to-image");
      const element = document.getElementById("ecard-canvas-node");
      if (!element) return null;

      // Filter out non-element nodes if necessary or just pass element
      // html-to-image handles most things well.
      // We target the inner card specifically if we want just the card, but the ID points to the wrapper.
      // ECardCanvas has ID "ecard-canvas-node" on the wrapper.
      // Inside is the card. We might want to capture the card div.
      // The previous implementation captured the wrapper. Let's stick to that or improve.
      // If we capture wrapper, we get the background.
      // Let's find the card container inside to be precise if needed.
      // But for now, let's keep behavior consistent: capture the element by ID.

      let blob;
      try {
        blob = await toBlob(element, {
          cacheBust: true,
          pixelRatio: 2,
        });
      } catch (error) {
        console.warn("Retrying with skipFonts...", error);
        blob = await toBlob(element, {
          cacheBust: true,
          pixelRatio: 2,
          skipFonts: true,
        });
      }
      return blob;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleDownload = async () => {
    const blob = await generateCanvasBlob();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ecard-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
      success("Đã tải xuống thiệp điện tử!", "Thành công");
    } else {
      info("Có lỗi khi tạo ảnh, vui lòng thử lại.");
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const blob = await generateCanvasBlob();
      if (!blob) {
        throw new Error("Không thể tạo ảnh từ thiệp");
      }

      // Upload to get URL
      const url = await eCardService.uploadUserCard(blob);
      setShareImageUrl(url);
      setIsShareModalOpen(true);
    } catch (err) {
      console.error(err);
      error("Có lỗi xảy ra khi tạo liên kết chia sẻ.", "Lỗi");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm border border-[#efe7f3] dark:border-gray-700 flex flex-col flex-grow overflow-hidden h-full max-h-[800px]">
        {/* Tabs */}
        <div className="flex border-b border-[#efe7f3] dark:border-gray-700">
          <button
            onClick={() => setActiveTab("template")}
            className={cn(
              "flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-all",
              activeTab === "template"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-[#faf8fc] dark:hover:bg-gray-800"
            )}
          >
            Mẫu thiệp
          </button>
          <button
            onClick={() => setActiveTab("message")}
            className={cn(
              "flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-all",
              activeTab === "message"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-[#faf8fc] dark:hover:bg-gray-800"
            )}
          >
            Lời chúc
          </button>
          <button
            onClick={() => setActiveTab("decoration")}
            className={cn(
              "flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-all",
              activeTab === "decoration"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-[#faf8fc] dark:hover:bg-gray-800"
            )}
          >
            Trang trí
          </button>
        </div>

        {/* Content Area Scrollable */}
        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
          {activeTab === "template" && (
            <>
              {/* Chips Filter */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                {["Tất cả", "Sinh nhật", "20/10", "Tình yêu", "Cảm ơn"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedCategory(item)}
                      className={cn(
                        "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                        selectedCategory === item
                          ? "bg-primary text-white"
                          : "bg-[#efe7f3] text-gray-900 hover:bg-primary/20 dark:bg-gray-700 dark:text-gray-200"
                      )}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              {/* Templates Grid */}
              {loading ? (
                <div className="flex justify-center p-10">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleTemplateSelect(tpl)}
                      className={cn(
                        "cursor-pointer group relative rounded-lg overflow-hidden transition-all border",
                        state.template?.id === tpl.id
                          ? "ring-2 ring-primary border-primary"
                          : "border-gray-100 dark:border-gray-700 hover:ring-2 hover:ring-primary/50"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={tpl.name}
                        className="w-full aspect-[3/4] object-cover"
                        src={tpl.thumbnailUrl}
                      />
                      <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/70 px-2 py-0.5 rounded text-xs font-bold text-gray-800 dark:text-white">
                        {tpl.isPremium ? "Premium" : "Miễn phí"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "message" && (
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-bold text-gray-900 dark:text-white">
                Nội dung lời chúc
              </label>
              <textarea
                value={state.message}
                onChange={handleMessageChange}
                className="w-full rounded-xl border-[#efe7f3] bg-[#faf8fc] dark:bg-gray-800 dark:border-gray-700 p-4 text-sm focus:ring-primary focus:border-primary min-h-[120px] outline-none"
                placeholder="Nhập lời chúc của bạn..."
              ></textarea>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateStyle("bold", !state.messageStyle.bold)
                    }
                    className={cn(
                      "size-8 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center font-sans font-bold",
                      state.messageStyle.bold
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    B
                  </button>
                  <div className="dropdown dropdown-top">
                    <button
                      tabIndex={0}
                      className="size-8 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 font-[Dancing_Script] text-lg"
                    >
                      A
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 overflow-y-auto max-h-60"
                    >
                      {[
                        "Dancing Script",
                        "Arial",
                        "Times New Roman",
                        "Courier New",
                        "Verdana",
                        "Georgia",
                        "Tahoma",
                        "Trebuchet MS",
                        "Impact",
                        "Comic Sans MS",
                      ].map((font) => (
                        <li key={font}>
                          <a
                            onClick={() => updateStyle("fontFamily", font)}
                            style={{ fontFamily: font }}
                          >
                            {font}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() =>
                      updateStyle("italic", !state.messageStyle.italic)
                    }
                    className={cn(
                      "size-8 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center italic font-serif",
                      state.messageStyle.italic
                        ? "bg-primary text-white border-primary"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    I
                  </button>
                </div>
                <div className="flex gap-1 flex-wrap items-center">
                  {[
                    "#000000",
                    "#ffffff",
                    "#ef4444",
                    "#f97316",
                    "#f59e0b",
                    "#84cc16",
                    "#10b981",
                    "#06b6d4",
                    "#3b82f6",
                    "#6366f1",
                    "#8b5cf6",
                    "#d946ef",
                    "#ec4899",
                  ].map((color) => (
                    <div
                      key={color}
                      onClick={() => updateStyle("color", color)}
                      className={cn(
                        "size-6 rounded-full border border-gray-200 cursor-pointer",
                        state.messageStyle.color === color
                          ? "ring-2 ring-offset-1 ring-primary"
                          : ""
                      )}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                  <label className="relative size-6 cursor-pointer rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500">
                    <input
                      type="color"
                      className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                      value={state.messageStyle.color}
                      onChange={(e) => updateStyle("color", e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="flex bg-primary/5 border border-primary/20 rounded-xl p-4 mt-2 hidden">
                {/* AI section removed */}
              </div>
            </div>
          )}

          {activeTab === "decoration" && (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-bold hover:bg-primary/5 transition-colors"
              >
                <span className="material-symbols-outlined">upload_file</span>
                Tải ảnh từ máy
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />

              <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                {stickersList.length > 0 ? (
                  stickersList.map((sticker) => (
                    <button
                      key={sticker.id}
                      onClick={() => addSticker(sticker.url)}
                      className="aspect-square p-2 border border-gray-100 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sticker.url}
                        alt={sticker.name}
                        className="w-[80%] h-[80%] object-contain"
                      />
                    </button>
                  ))
                ) : (
                  <div className="col-span-4 text-center text-gray-400 py-4">
                    Chưa có nhãn dán nào
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-[#efe7f3] dark:border-gray-700 bg-[#faf8fc] dark:bg-[#1a2632]/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Tổng cộng:</span>
            <span className="text-xl font-bold text-primary">
              {state.template?.isPremium ? "15,000₫" : "0₫"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="py-3 px-4 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              {isSharing ? (
                <span className="loading loading-spinner w-4 h-4"></span>
              ) : (
                <span className="material-symbols-outlined text-[20px]">
                  share
                </span>
              )}
              {isSharing ? "Đang xử lý..." : "Chia sẻ"}
            </button>
            <button
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-[#b00e0e] shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              Tải xuống
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
            </button>
          </div>
          <button className="w-full mt-3 py-2 text-xs font-medium text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              inventory_2
            </span>
            Chỉ lưu và quay lại giỏ hàng
          </button>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        imageUrl={shareImageUrl}
      />
    </div>
  );
}
