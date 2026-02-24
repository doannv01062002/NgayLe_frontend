import { useState } from "react";
import { ShopRegisterRequest } from "@/services/shopService";
import { authService } from "@/services/authService";
import { useToast } from "@/context/ToastContext";

interface Props {
  formData: ShopRegisterRequest;
  onChange: (field: string, value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (verified: boolean) => void;
}

export function ShopInfoStep({
  formData,
  onChange,
  isEmailVerified,
  setIsEmailVerified,
}: Props) {
  const { success, error } = useToast();
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!formData.email) {
      error("Vui lòng nhập email trước", "Lỗi");
      return;
    }
    setLoadingOtp(true);
    try {
      await authService.sendOtp(formData.email);
      success("Mã OTP đã được gửi đến email của bạn", "Thành công");
      setShowOtpInput(true);
    } catch (err) {
      console.error(err);
      error("Gửi OTP thất bại", "Lỗi");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      error("Vui lòng nhập mã OTP", "Lỗi");
      return;
    }
    setLoadingOtp(true);
    try {
      const res = await authService.verifyOtp(formData.email, otp);
      if (res.verified) {
        success("Xác thực email thành công", "Thành công");
        setIsEmailVerified(true);
        setShowOtpInput(false);
      } else {
        error("Mã OTP không đúng hoặc đã hết hạn", "Lỗi");
      }
    } catch (err) {
      console.error(err);
      error("Xác thực thất bại", "Lỗi");
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Section 1: Basic Info */}
      <div className="bg-white dark:bg-[#2a1414] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span>
            Thông tin cơ bản
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Shop Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Tên Shop <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-12 pl-4 pr-10 transition-shadow outline-none border"
                placeholder="Nhập tên hiển thị của shop (6-30 ký tự)"
                type="text"
                value={formData.shopName}
                onChange={(e) => onChange("shopName", e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <span className="text-xs">{formData.shopName.length}/30</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tên shop không được chứa các từ khóa bị cấm hoặc vi phạm thương
              hiệu.
            </p>
          </div>
          {/* Pickup Address */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Địa chỉ lấy hàng <span className="text-primary">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 text-sm border outline-none px-3"
                value={formData.city}
                onChange={(e) => onChange("city", e.target.value)}
              >
                <option value="" disabled>
                  Tỉnh/Thành phố
                </option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
              <input
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 text-sm border outline-none px-3"
                placeholder="Quận/Huyện"
                value={formData.district}
                onChange={(e) => onChange("district", e.target.value)}
              />
              <input
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 text-sm border outline-none px-3"
                placeholder="Phường/Xã"
                value={formData.ward}
                onChange={(e) => onChange("ward", e.target.value)}
              />
            </div>
            <textarea
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary min-h-[80px] text-sm p-3 border outline-none"
              placeholder="Số nhà, tên đường, tòa nhà..."
              value={formData.addressDetail}
              onChange={(e) => onChange("addressDetail", e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      {/* Section 2: Contact Info */}
      <div className="bg-white dark:bg-[#2a1414] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              contact_mail
            </span>
            Thông tin liên hệ
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
              Email <span className="text-primary">*</span>
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  mail
                </span>
                <input
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 pl-10 border outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-500"
                  placeholder="vidu@email.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  disabled={isEmailVerified || showOtpInput}
                />
              </div>

              {!isEmailVerified && !showOtpInput && (
                <button
                  onClick={handleSendOtp}
                  disabled={loadingOtp}
                  className="h-11 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {loadingOtp ? "Đang gửi..." : "Gửi mã xác nhận"}
                </button>
              )}

              {isEmailVerified && (
                <button
                  className="h-11 px-4 rounded-lg bg-green-100 text-green-700 font-semibold text-sm cursor-default whitespace-nowrap flex items-center gap-1"
                  disabled
                >
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Đã xác minh
                </button>
              )}
            </div>

            {showOtpInput && !isEmailVerified && (
              <div className="mt-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Nhập mã OTP gồm 6 số đã được gửi đến email của bạn:
                </p>
                <div className="flex gap-3">
                  <input
                    className="w-full max-w-[200px] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 border outline-none tracking-widest font-mono text-center"
                    placeholder="000000"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loadingOtp}
                    className="h-11 px-6 rounded-lg bg-primary hover:bg-[#b00e0e] text-white font-bold shadow-lg shadow-primary/30 transition-all disabled:opacity-70"
                  >
                    {loadingOtp ? "Đang xử lý..." : "Xác nhận"}
                  </button>
                  <button
                    onClick={() => setShowOtpInput(false)}
                    className="h-11 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-600 font-semibold text-sm transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Số điện thoại <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  phone_iphone
                </span>
                <input
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary h-11 pl-10 border outline-none"
                  placeholder="0912 345 678"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => onChange("phoneNumber", e.target.value)}
                />
              </div>
            </div>
            <button
              className="h-11 px-6 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 font-semibold text-sm cursor-not-allowed whitespace-nowrap"
              disabled={true}
            >
              Đã xác minh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
