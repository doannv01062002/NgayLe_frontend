import { useEffect, useState, useRef } from "react";
import { Sticker } from "@/types/ecard";
import { eCardService } from "@/services/ecard.service";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export function StickerManager() {
  const { success, error: toastError } = useToast();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStickers();
  }, []);

  const fetchStickers = async () => {
    try {
      setLoading(true);
      const data = await eCardService.getStickers();
      setStickers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Prompt for name/category or just use filename/default
      const name = file.name.split(".")[0];
      await eCardService.createSticker(name, "General", file);
      success("Đã thêm nhãn dán");
      fetchStickers();
    } catch (err) {
      toastError("Lỗi khi tải lên");
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await eCardService.deleteSticker(id);
      success("Đã xóa nhãn dán");
      setStickers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      toastError("Lỗi khi xóa");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2634] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Danh sách Nhãn dán
        </h3>
        <button
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {isUploading ? (
            <span className="loading loading-spinner w-4 h-4"></span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">
              add_photo_alternate
            </span>
          )}
          Thêm Nhãn Dán
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-10">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {stickers.map((sticker) => (
            <div
              key={sticker.id}
              className="group relative aspect-square border border-gray-100 rounded-lg p-2 flex items-center justify-center bg-gray-50 hover:bg-white transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sticker.url}
                alt={sticker.name}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => handleDelete(sticker.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </button>
            </div>
          ))}
          {stickers.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">
              Chưa có nhãn dán nào.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
