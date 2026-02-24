"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { affiliateService } from "@/services/affiliateService"; // Customer service
import { useToast } from "@/context/ToastContext"; // Verify path
import { useRouter } from "next/navigation";

export function AffiliateHeader() {
  const [status, setStatus] = useState<string>("LOADING");
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check status if logged in (token exists)
    const token = localStorage.getItem("token");
    if (token) {
      affiliateService
        .getStatus()
        .then((s) => setStatus(s))
        .catch(() => setStatus("NOT_REGISTERED"));
    } else {
      setStatus("NOT_LOGGED_IN");
    }
  }, []);

  const handleRegister = async () => {
    if (status === "NOT_LOGGED_IN") {
      router.push("/login?redirect=/affiliate");
      return;
    }

    try {
      await affiliateService.register("Direct_Header");
      showToast("Đăng ký thành công! Vui lòng chờ duyệt.", "success");
      setStatus("PENDING");
    } catch (error) {
      console.error(error);
      showToast("Đăng ký thất bại. Vui lòng thử lại.", "error");
    }
  };

  return (
    <div className="relative w-full border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a202c]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <header className="flex items-center justify-between whitespace-nowrap py-3">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <div className="flex items-center justify-center rounded bg-red-600 p-1 text-white">
              <span className="material-symbols-outlined text-[20px]">
                local_mall
              </span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              ngayle.com Affiliate
            </h2>
          </div>
          <div className="hidden lg:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link
                className="text-gray-900 dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                href="/"
              >
                Trang chủ
              </Link>
              <a
                className="text-gray-900 dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Chính sách hoa hồng
              </a>
              <a
                className="text-gray-900 dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Quy định
              </a>
              <a
                className="text-gray-900 dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Hỗ trợ
              </a>
            </div>
            <div className="flex gap-2">
              {status === "PENDING" ? (
                <button className="flex min-w-[84px] cursor-not-allowed opacity-70 items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-yellow-500 text-white text-sm font-bold">
                  <span className="truncate">Đang chờ duyệt</span>
                </button>
              ) : status === "ACTIVE" ? (
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-colors">
                  <span className="truncate">Đến Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors"
                >
                  <span className="truncate">Đăng ký ngay</span>
                </button>
              )}

              {status === "NOT_LOGGED_IN" && (
                <Link
                  href="/login"
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold transition-colors"
                >
                  <span className="truncate">Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>
          {/* Mobile Menu Icon */}
          <button className="lg:hidden text-gray-900 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
      </div>
    </div>
  );
}
