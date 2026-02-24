"use client";

import { affiliateService } from "@/services/affiliateService";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export function AffiliateCTA() {
  const { showToast } = useToast();
  const router = useRouter();

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?redirect=/affiliate");
      return;
    }

    try {
      await affiliateService.register("Direct_CTA");
      showToast("Đăng ký thành công! Vui lòng chờ duyệt.", "success");
    } catch (error) {
      console.error(error);
      showToast("Đăng ký thất bại hoặc bạn đã đăng ký rồi.", "info");
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Sẵn sàng gia tăng thu nhập ngay hôm nay?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl">
            Tham gia cộng đồng hơn 10,000 đối tác của NgayLe.com và bắt đầu
            chiến dịch kiếm tiền online bền vững.
          </p>
          <button
            onClick={handleRegister}
            className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            Đăng ký Đối tác ngay
          </button>
        </div>
      </div>
    </div>
  );
}
