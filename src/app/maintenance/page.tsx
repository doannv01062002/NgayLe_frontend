import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f6] dark:bg-[#221010] font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="relative w-full max-w-lg aspect-[4/3] mb-6 animate-pulse-slow">
            <Image
              src="/assets/images/maintenance.png"
              alt="System Maintenance"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm mb-6 border border-yellow-200">
            ⚠ Hệ thống đang bảo trì
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Chúng tôi đang tân trang lại <br />
            cửa hàng quà tặng
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed">
            NgayLe.com đang nâng cấp hệ thống để mang đến trải nghiệm mua sắm
            tuyệt vời hơn cho bạn.
            <br className="hidden md:block" />
            Vui lòng quay lại sau ít phút nhé!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <span className="material-symbols-outlined mr-2">refresh</span>
              Tải lại trang
            </button>
            <a
              href="mailto:support@ngayle.com"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-base font-bold rounded-xl text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              <span className="material-symbols-outlined mr-2">mail</span>
              Gửi email hỗ trợ
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
