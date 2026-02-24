import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f6] dark:bg-[#221010] font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-square mb-8 animate-floating">
            <Image
              src="/assets/images/not_found.png"
              alt="404 Gift Not Found"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Oops! Món quà này đã bị thất lạc
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed">
            Có vẻ như trang bạn đang tìm kiếm đã được gói ghém và chuyển đi nơi
            khác, hoặc chưa từng tồn tại.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="material-symbols-outlined mr-2">home</span>
              Về trang chủ
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-base font-bold rounded-xl text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              <span className="material-symbols-outlined mr-2">
                support_agent
              </span>
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
