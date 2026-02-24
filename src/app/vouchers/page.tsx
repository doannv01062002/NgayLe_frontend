"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { voucherService, VoucherDTO } from "@/services/voucherService";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function VouchersPage() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [vouchers, setVouchers] = useState<VoucherDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchVouchers();
  }, [selectedFilter]);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const type = selectedFilter === "ALL" ? undefined : selectedFilter;
      const data = await voucherService.getPublicVouchers({ size: 20, type });
      setVouchers(data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVoucher = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?redirect=/vouchers");
      return;
    }
    try {
      await voucherService.saveVoucher(id);
      showToast("Lưu voucher thành công!", "success");
      setVouchers((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isSaved: true } : v))
      );
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Lỗi khi lưu voucher";
      if (msg.includes("already saved")) {
        showToast("Bạn đã lưu voucher này rồi.", "info");
      } else {
        showToast("Lỗi khi lưu voucher.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f6] dark:bg-[#102216] font-sans text-[#0d1b12] dark:text-white antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow w-full flex flex-col">
        {/* Breadcrumbs */}
        <div className="w-full bg-white dark:bg-[#102216] border-b border-[#e7f3eb] dark:border-[#1e3a29]">
          <div className="max-w-[1240px] mx-auto px-4 lg:px-4 py-3">
            <div className="flex flex-wrap gap-2 items-center">
              <Link
                href="/"
                className="text-[#4c9a66] text-sm font-medium hover:underline"
              >
                Trang chủ
              </Link>
              <span className="material-symbols-outlined text-[#4c9a66] text-sm">
                chevron_right
              </span>
              <span className="text-[#0d1b12] dark:text-white text-sm font-medium">
                Kho Mã Giảm Giá
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-4 py-6 flex flex-col gap-8">
          {/* Hero Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ... Keep banner content same ... */}
            <div className="md:col-span-2 relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d90429] to-orange-500 mix-blend-multiply opacity-80"></div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2H2k5Gs7HAQ2nGO8NzFks4IOy9uW41A3Md3oCJ2MpvvKBstctDR-739JaPKB30yuDf5rUIJ4_Aal_nltjNdTLEDLJkgw4keg7LUiZ4F5eP2Rb0Idu33AY5Eawe6iyJDEOevycWWtd5EK4ov6klypQEufk8xYOwUnE8QI510vopWIYSSGyuOGPTcBGSJjycVvNbReDxBjAiPeBCUC3bV7UUWgsFcbJqKMiKRwm-BbZGJRiVq4kCoINvQEuDOTKzZq3hYJKAtxCOzo')",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 z-10">
                <span className="bg-[#13ec5b] text-black text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                  SIÊU SALE 9.9
                </span>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-md">
                  Săn Voucher
                  <br />
                  Đến 1 Triệu Đồng
                </h2>
                <p className="text-white/90 text-sm md:text-base font-medium mb-4">
                  Duy nhất khung giờ vàng 12H - 20H hôm nay
                </p>
                <button className="bg-white text-[#d90429] font-bold py-2 px-6 rounded-lg w-fit hover:bg-gray-100 transition-colors shadow-md">
                  Lưu Ngay
                </button>
              </div>
            </div>
            {/* Side Banners */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-md">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-t6ki02a40wDVwijMGJ_GzNE7qkBIIVDDVJyWFM4nWXAU0iwDjwIjGrcDxAXu9ebx00c38kjzOX_sRQrssJwy0OLzbQJ0wzEh8LHN0zG6P5aXmjGCV-uyis0kzfYRat0vjJ_-_vOBHyawL1atKiTdk4_NP0MHri64a3HYpif0fvYTPEdWiUqD47bJH6vCYmXG19oawL1atKiTdk4_NP0MHri64a3HYpif0fvYTPEdWiUqD47bJH6vCYmXG19oawL_TXyFCMSINjOD3039xd1GYkdHETSDlJqTXGM0cInenuJMFig2aN6juyVKdZiikBTunU_8')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-lg">
                    Giảm 50K qua thẻ VISA
                  </p>
                  <span className="text-[#13ec5b] text-xs font-bold">
                    Lưu mã ngay →
                  </span>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-md">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeHgGHgpo4IMyfqLMmyi5mJn51nvIBTp_bZrjqmBX6PbYyuoY9PeZru31DqwRjtK4JZmylDwIN_th2KqEZ17qotb08P6yGNUvwecWuCKYwi0wflfnrsncqaW1gIDjQJLFIC-GJ5SlYrFKyctn8aas9FHJd48b6T5gFEG09mE5nx5YDyqzyrxzfr87kQ88MHRwdcZrUBdyeRcKITWgq8jM1Uvt4TVn5sQsd0K9kxO2sn6KWsn0IMD8gqqT5KuHGzC-YjX1u3nIxWoM')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-lg">Freeship Xtra</p>
                  <span className="text-[#13ec5b] text-xs font-bold">
                    Lấy mã vận chuyển →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Filter Bar */}
          <div className="sticky top-[60px] z-40 bg-[#f8fcf9] dark:bg-[#102216] pt-2 pb-4 px-4 lg:px-0 -mx-4 lg:mx-0 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] border-b border-[#e7f3eb]/50">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Horizontal Scroll Chips */}
              <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar px-1">
                <button
                  onClick={() => setSelectedFilter("ALL")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 shadow-sm transition-transform active:scale-95 ${
                    selectedFilter === "ALL"
                      ? "bg-[#13ec5b] text-[#0d1b12]"
                      : "bg-white dark:bg-[#1e3a29] border border-[#e7f3eb] dark:border-[#2a4030] hover:border-[#13ec5b]"
                  }`}
                >
                  <span className="text-sm font-bold">Tất cả</span>
                </button>
                <button
                  onClick={() => setSelectedFilter("SHIPPING")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 shadow-sm transition-transform active:scale-95 group ${
                    selectedFilter === "SHIPPING"
                      ? "bg-[#13ec5b] text-[#0d1b12]"
                      : "bg-white dark:bg-[#1e3a29] border border-[#e7f3eb] dark:border-[#2a4030] hover:border-[#13ec5b]"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      selectedFilter === "SHIPPING"
                        ? "text-[#0d1b12]"
                        : "text-[#d90429]"
                    }`}
                  >
                    local_shipping
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      selectedFilter === "SHIPPING"
                        ? "text-[#0d1b12]"
                        : "text-[#0d1b12] dark:text-white"
                    }`}
                  >
                    Miễn phí vận chuyển
                  </span>
                </button>
                <button
                  onClick={() => setSelectedFilter("PAYMENT")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-5 shadow-sm transition-transform active:scale-95 group ${
                    selectedFilter === "PAYMENT"
                      ? "bg-[#13ec5b] text-[#0d1b12]"
                      : "bg-white dark:bg-[#1e3a29] border border-[#e7f3eb] dark:border-[#2a4030] hover:border-[#13ec5b]"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      selectedFilter === "PAYMENT"
                        ? "text-[#0d1b12]"
                        : "text-purple-500"
                    }`}
                  >
                    credit_card
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      selectedFilter === "PAYMENT"
                        ? "text-[#0d1b12]"
                        : "text-[#0d1b12] dark:text-white"
                    }`}
                  >
                    Thanh toán
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Platform Vouchers Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-1 bg-[#d90429] rounded-full"></div>
              <h3 className="text-xl font-bold text-[#0d1b12] dark:text-white">
                Voucher Mới Nhất
              </h3>
              <span className="ml-2 px-2 py-0.5 bg-[#d90429]/10 text-[#d90429] text-xs font-bold rounded">
                Hot
              </span>
            </div>

            {loading && vouchers.length === 0 ? (
              <div className="w-full text-center py-10">
                Đang tải voucher...
              </div>
            ) : vouchers.length === 0 ? (
              <div className="w-full text-center py-10">
                Chưa có voucher nào.
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
                  loading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="flex bg-white dark:bg-[#1e3a29] rounded-lg shadow-sm border border-[#e7f3eb] dark:border-[#2a4030] overflow-hidden hover:shadow-md transition-shadow relative h-32"
                  >
                    {/* Left: Value */}
                    <div className="w-32 bg-[#e8fbf0] dark:bg-[#152e20] flex flex-col items-center justify-center p-2 border-r border-dashed border-[#13ec5b] relative shrink-0">
                      <span className="text-[#0dbd47] font-black text-xl text-center">
                        {voucher.discountType === "PERCENTAGE"
                          ? `${voucher.discountValue}%`
                          : `${(voucher.discountValue || 0).toLocaleString()}đ`}
                      </span>
                      <span className="text-[#0dbd47] font-bold text-[10px] text-center uppercase">
                        {voucher.type === "SHIPPING" ? "Freeship" : "Giảm giá"}
                      </span>
                    </div>
                    {/* Right: Info */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-sm font-semibold text-[#0d1b12] dark:text-white line-clamp-1">
                          {voucher.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                          {voucher.description}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          HSD: {new Date(voucher.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-end justify-between gap-3 mt-2">
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-1 overflow-hidden">
                            <div
                              className="bg-[#13ec5b] h-1.5 rounded-full"
                              style={{
                                width: `${Math.min(
                                  ((voucher.usageCount || 0) /
                                    (voucher.usageLimit || 1)) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-[10px] text-[#d90429] font-medium">
                            Đã dùng{" "}
                            {Math.round(
                              ((voucher.usageCount || 0) /
                                (voucher.usageLimit || 1)) *
                                100
                            )}
                            %
                          </p>
                        </div>
                        {voucher.isSaved ? (
                          <button
                            disabled
                            className="bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm shrink-0"
                          >
                            Đã lưu
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSaveVoucher(voucher.id)}
                            className="bg-[#13ec5b] hover:bg-[#0dbd47] text-[#0d1b12] text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm shrink-0"
                          >
                            Lưu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Partner Vouchers Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-blue-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-[#0d1b12] dark:text-white">
                  Ưu đãi từ Đối tác
                </h3>
              </div>
              <a
                className="text-sm text-[#13ec5b] font-bold hover:underline"
                href="#"
              >
                Xem tất cả →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Partner Card 1 */}
              <div className="flex bg-white dark:bg-[#1e3a29] rounded-lg shadow-sm border border-[#e7f3eb] dark:border-[#2a4030] overflow-hidden hover:shadow-md transition-shadow relative h-32 opacity-75">
                {/* Saved Overlay Example */}
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-20 flex items-center justify-center">
                  <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>{" "}
                    Đã lưu
                  </div>
                </div>
                <div className="w-32 bg-blue-50 dark:bg-blue-900/10 flex flex-col items-center justify-center p-2 border-r border-dashed border-blue-200 relative shrink-0">
                  <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-[#f8fcf9] dark:bg-[#102216] rounded-full z-10"></div>
                  <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#f8fcf9] dark:bg-[#102216] rounded-full z-10"></div>
                  <span className="material-symbols-outlined text-blue-600 text-3xl mb-1">
                    credit_card
                  </span>
                  <span className="text-blue-600 font-bold text-xs text-center">
                    VISA
                  </span>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0d1b12] dark:text-white">
                      Giảm 50k cho thẻ VISA
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Đơn từ 500k vào thứ 5
                    </p>
                  </div>
                  <div className="flex items-end justify-end gap-3 mt-2">
                    <button className="bg-gray-200 text-gray-500 cursor-not-allowed text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm shrink-0">
                      Đã lưu
                    </button>
                  </div>
                </div>
              </div>
              {/* Partner Card 2 */}
              <div className="flex bg-white dark:bg-[#1e3a29] rounded-lg shadow-sm border border-[#e7f3eb] dark:border-[#2a4030] overflow-hidden hover:shadow-md transition-shadow relative h-32">
                <div className="w-32 bg-purple-50 dark:bg-purple-900/10 flex flex-col items-center justify-center p-2 border-r border-dashed border-purple-200 relative shrink-0">
                  <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-[#f8fcf9] dark:bg-[#102216] rounded-full z-10"></div>
                  <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-[#f8fcf9] dark:bg-[#102216] rounded-full z-10"></div>
                  <span className="material-symbols-outlined text-purple-600 text-3xl mb-1">
                    account_balance_wallet
                  </span>
                  <span className="text-purple-600 font-bold text-xs text-center">
                    E-Wallet
                  </span>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0d1b12] dark:text-white">
                      Giảm 20k thanh toán ví
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Áp dụng cho khách hàng mới
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-3 mt-2">
                    <p className="text-[10px] text-gray-500 font-medium pt-3">
                      Số lượng có hạn
                    </p>
                    <button className="bg-[#13ec5b] hover:bg-[#0dbd47] text-[#0d1b12] text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm shrink-0">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shop Vouchers Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-1 bg-[#13ec5b] rounded-full"></div>
              <h3 className="text-xl font-bold text-[#0d1b12] dark:text-white">
                Voucher từ Shop Nổi Bật
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Shop Voucher with Product Image */}
              <div className="flex bg-white dark:bg-[#1e3a29] rounded-lg shadow-sm border border-[#e7f3eb] dark:border-[#2a4030] overflow-hidden group">
                {/* Image Side */}
                <div className="w-32 md:w-40 bg-gray-100 relative shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVRVw6yGtmqZ-D6wK2LPOfpmH5nJrBJVAabnxnfU6AVpQpGK9pqCwy2G2wUrcKHSwbqzaleQKhuZY1klZrtt4R4hoyw-NYDDl57z51mpOCeAtB9-lKTzkFai01_F3i3dEyHZM5juSwvgepk-xdT8gtum5j5iNEwl_6FAOI9MVkh7A5srgZ_8IeOXopVGcu3Az55fozTz-nC2JvOjLTCDE_p_kuCOl6pIjxYlkj0LmDFnfonuim_WfMAPaTIS3jI1MKazksHO7nsws')",
                    }}
                  ></div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                    TechZone
                  </div>
                </div>
                {/* Content Side */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#d90429] text-white text-[10px] px-1 rounded font-bold">
                          Mall
                        </span>
                        <h4 className="text-sm font-bold text-[#0d1b12] dark:text-white line-clamp-1">
                          Giảm 500k cho Apple Watch
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Đơn tối thiểu 5tr
                      </p>
                    </div>
                    <div className="bg-red-50 text-[#d90429] border border-red-100 px-2 py-1 rounded text-center shrink-0">
                      <span className="block text-xs font-bold">Giảm</span>
                      <span className="block text-sm font-black">10%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
                    <div className="text-xs text-gray-400">HSD: 31.12.2023</div>
                    <button className="bg-[#13ec5b] hover:bg-[#0dbd47] text-[#0d1b12] text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm">
                      Lưu Mã
                    </button>
                  </div>
                </div>
              </div>
              {/* Shop Voucher 2 */}
              <div className="flex bg-white dark:bg-[#1e3a29] rounded-lg shadow-sm border border-[#e7f3eb] dark:border-[#2a4030] overflow-hidden group">
                {/* Image Side */}
                <div className="w-32 md:w-40 bg-gray-100 relative shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8PDE_4ftecnF5S_CVKF8J1hn1ZpivGKPGTq7z7U_3cRq7Lrc_7r43wRBoppzZRTIRd3bMG-d4z-BGSbjP5bZu4yi0EeRt46naW2FReUNP4WEVo9nQl1KAZZzVrRAJBulKKvBDnBlC53BF2DCxPBboGeKeG1h7chxcFqcx1kcom_JFbcsDw0kbfrk-coXQ7x5pxmUysrnwz3jqvrbZpL2HhaienjWpsveQen-ZRBlLCDGsUUISNFpSJ-kiI8V3JzjuYTjWGoWkh0s')",
                    }}
                  ></div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                    Camera World
                  </div>
                </div>
                {/* Content Side */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-500 text-white text-[10px] px-1 rounded font-bold">
                          Yêu thích
                        </span>
                        <h4 className="text-sm font-bold text-[#0d1b12] dark:text-white line-clamp-1">
                          Voucher Shop 50k
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cho tất cả sản phẩm
                      </p>
                    </div>
                    <div className="bg-red-50 text-[#d90429] border border-red-100 px-2 py-1 rounded text-center shrink-0">
                      <span className="block text-xs font-bold">Giảm</span>
                      <span className="block text-sm font-black">50k</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
                    <div className="text-xs text-gray-400">HSD: 15.10.2023</div>
                    <button className="bg-[#13ec5b] hover:bg-[#0dbd47] text-[#0d1b12] text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm">
                      Lưu Mã
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Load More */}
          <div className="flex justify-center pt-4 pb-8">
            <button className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-[#1e3a29] border border-[#e7f3eb] dark:border-[#2a4030] rounded-full text-sm font-bold text-[#4c9a66] hover:bg-[#e7f3eb] dark:hover:bg-[#2a4030] transition-colors shadow-sm">
              Xem thêm voucher khác
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
