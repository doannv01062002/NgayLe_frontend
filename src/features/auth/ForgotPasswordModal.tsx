"use client";
import React, { useState, useEffect } from "react";
import { authService } from "@/services/authService";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Input Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // States for visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!email) {
      setError("Vui lòng nhập Email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await authService.forgotPasswordSendOtp(email);
      setStep(2);
      setCountdown(60);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Không thể gửi OTP. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    if (!otpCode || otpCode.length !== 6) {
      setError("OTP phải có 6 chữ số");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email, otpCode, newPassword);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset state for next time
        setStep(1);
        setEmail("");
        setOtpCode("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {success ? "Thành công!" : "Quên mật khẩu?"}
          </h2>
          {!success && (
            <p className="text-sm text-gray-500">
              {step === 1
                ? "Nhập email để nhận mã OTP đặt lại mật khẩu."
                : `Mã OTP đã được gửi tới ${email}`}
            </p>
          )}
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-600 text-4xl">
                check_circle
              </span>
            </div>
            <p className="text-green-600 font-semibold">
              Đổi mật khẩu thành công!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-600 rounded text-sm font-semibold animate-pulse">
                {error}
              </div>
            )}

            {step === 1 ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email của bạn
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="name@example.com"
                />
              </div>
            ) : (
              // Step 2
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Mã OTP (6 số)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full px-4 py-3 text-center text-xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none pr-12"
                      placeholder="Ít nhất 6 ký tự"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none pr-12"
                      placeholder="Xác nhận mật khẩu"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm">
                  {countdown > 0 ? (
                    <span className="text-gray-400">
                      Gửi lại mã sau {countdown}s
                    </span>
                  ) : (
                    <button
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-primary font-semibold hover:underline"
                    >
                      Gửi lại mã OTP
                    </button>
                  )}
                </div>
              </>
            )}

            <button
              onClick={step === 1 ? handleSendOtp : handleResetPassword}
              disabled={loading}
              className="mt-2 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              {loading
                ? "Đang xử lý..."
                : step === 1
                ? "Gửi mã xác thực"
                : "Đặt lại mật khẩu"}
            </button>

            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:text-gray-800 underline"
              >
                Quay lại nhập Email
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
