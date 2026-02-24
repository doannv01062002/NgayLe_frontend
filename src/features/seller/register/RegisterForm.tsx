"use client";

import { useState } from "react";
import { shopService, ShopRegisterRequest } from "@/services/shopService";
import { useToast } from "@/context/ToastContext";
import { ShopInfoStep } from "./steps/ShopInfoStep";
import { ShippingStep } from "./steps/ShippingStep";
import { TaxIdentityStep } from "./steps/TaxIdentityStep";
import { CompleteStep } from "./steps/CompleteStep";

interface RegisterFormProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onGoHome: () => void;
}

export function RegisterForm({
  currentStep,
  onNext,
  onBack,
  onGoHome,
}: RegisterFormProps) {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [formData, setFormData] = useState<ShopRegisterRequest>({
    shopName: "",
    email: "",
    phoneNumber: "",
    city: "Hồ Chí Minh",
    district: "",
    ward: "",
    addressDetail: "",
    taxCode: "",
    identityNumber: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (
      !formData.shopName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.addressDetail
    ) {
      error("Vui lòng điền đầy đủ thông tin bắt buộc", "Lỗi");
      return false;
    }
    if (!isEmailVerified) {
      error("Vui lòng xác minh địa chỉ email", "Lỗi");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.taxCode || !formData.identityNumber) {
      error("Vui lòng nhập Mã số thuế và Số giấy tờ tùy thân", "Lỗi");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    // Step 2 (Shipping) has no required validation for now
    onNext();
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setLoading(true);
    try {
      await shopService.register(formData);
      success("Đăng ký Shop thành công!", "Chúc mừng");
      onNext(); // Move to Step 4 (Complete)
    } catch (err: any) {
      console.error(err);
      let message = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.";
      if (err.response && err.response.data) {
        if (typeof err.response.data === "string") {
          message = err.response.data;
          // Sometimes Spring Boot returns the message directly or HTML, verify length
          if (message.length > 200) message = "Lỗi máy chủ nội bộ.";
        } else if (err.response.data.message) {
          message = err.response.data.message;
        } else if (err.response.data.error) {
          message = err.response.data.error;
        }
      }
      error(message, "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === 4) {
    return (
      <div>
        <CompleteStep />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans">
      {currentStep === 1 && (
        <ShopInfoStep
          formData={formData}
          onChange={handleChange}
          isEmailVerified={isEmailVerified}
          setIsEmailVerified={setIsEmailVerified}
        />
      )}

      {currentStep === 2 && <ShippingStep />}

      {currentStep === 3 && (
        <TaxIdentityStep formData={formData} onChange={handleChange} />
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-2">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            disabled={loading}
            className="w-full sm:w-auto px-6 h-12 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            Quay lại
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary hover:bg-[#b00e0e] text-white font-bold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Tiếp theo</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary hover:bg-[#b00e0e] text-white font-bold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <span>Hoàn tất đăng ký</span>
                <span className="material-symbols-outlined text-lg">check</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
