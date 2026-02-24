import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export function ShareModal({ isOpen, onClose, imageUrl }: ShareModalProps) {
  const { success } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    success("Đã sao chép liên kết ảnh!");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleZaloShare = () => {
    // Zalo doesn't have a direct "share this url" intent that works well on web consistently for images without OG tags on a page.
    // Best approach is enticing user to copy link or image.
    // However, we'll try the sharer link if available/supported or fallback to copy.
    // Using Zalo Web Share: https://zalo.me/share?url=...
    const url = `https://zalo.me/share?url=${encodeURIComponent(imageUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
    // Alternately, Zalo often requires users to be logged in web.
  };

  const handleDownloadIntention = (platform: string) => {
    // TikTok and Instagram work best with native file uploads.
    success(
      `Với ${platform}, bạn hãy Tải ảnh xuống và đăng tải thủ công nhé!`,
      "Hướng dẫn"
    );
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ngayle-share-${Date.now()}.png`;
    link.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chia sẻ Thiệp">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Shared Card"
            className="rounded-lg shadow-md max-h-[300px] object-contain bg-gray-50 border"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-brands fa-facebook-f text-xl font-bold">f</i>
            </div>
            <span className="text-xs text-gray-600 font-medium">Facebook</span>
          </button>

          <button
            onClick={handleZaloShare}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform font-bold text-sm">
              Zalo
            </div>
            <span className="text-xs text-gray-600 font-medium">Zalo</span>
          </button>

          <button
            onClick={() => handleDownloadIntention("TikTok")}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <span className="font-bold text-xs">TikTok</span>
            </div>
            <span className="text-xs text-gray-600 font-medium">TikTok</span>
          </button>

          <button
            onClick={() => handleDownloadIntention("Instagram")}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <span className="font-bold text-xs">Insta</span>
            </div>
            <span className="text-xs text-gray-600 font-medium">Instagram</span>
          </button>
        </div>

        <div className="flex items-center gap-2 border rounded-lg p-3 bg-gray-50">
          <div className="flex-grow truncate text-xs text-gray-500 font-mono">
            {imageUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="text-primary font-bold text-sm hover:underline"
          >
            Sao chép
          </button>
        </div>
      </div>
    </Modal>
  );
}
