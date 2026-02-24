"use client";

import { useState } from "react";
import { RegisterHeader } from "@/features/seller/register/RegisterHeader";
import { RegisterStepper } from "@/features/seller/register/RegisterStepper";
import { RegisterForm } from "@/features/seller/register/RegisterForm";
import { RegisterSidebar } from "@/features/seller/register/RegisterSidebar";
import { useRouter } from "next/navigation";

export default function SellerRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  return (
    <div className="bg-[#fcf8f8] dark:bg-[#221010] font-display text-[#1b0d0d] dark:text-[#fcf8f8] min-h-screen flex flex-col transition-colors duration-200">
      <RegisterHeader />
      <main className="flex-grow w-full max-w-[1024px] mx-auto px-4 py-8">
        {/* Welcome Heading */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Chào mừng bạn gia nhập Ngayle.com
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vui lòng hoàn tất hồ sơ đăng ký để bắt đầu kinh doanh vào mùa lễ hội
            này.
          </p>
        </div>

        <RegisterStepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            className={currentStep === 4 ? "lg:col-span-3" : "lg:col-span-2"}
          >
            <RegisterForm
              currentStep={currentStep}
              onNext={() => setCurrentStep((prev) => prev + 1)}
              onBack={() => setCurrentStep((prev) => prev - 1)}
              onGoHome={() => router.push("/")}
            />
          </div>

          {currentStep < 4 && <RegisterSidebar />}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-6 bg-white dark:bg-[#2a1414]">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Ngayle.com - Nền tảng TMĐT Lễ Hội Việt Nam.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">
              Quy định bán hàng
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Chính sách bảo mật
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Hỗ trợ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
