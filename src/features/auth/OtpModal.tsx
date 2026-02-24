"use client";
import React, { useState, useEffect } from "react";

interface OtpModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export function OtpModal({
  email,
  isOpen,
  onClose,
  onVerified,
}: OtpModalProps) {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otpCode.length !== 6) {
      setError("Vui lòng nhập đủ 6 số");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { authService } = await import("@/services/authService");
      const result = await authService.verifyOtp(email, otpCode);

      if (result.verified) {
        setSuccess(true);
        setTimeout(() => {
          onVerified();
          onClose();
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Xác thực thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);

    try {
      const { authService } = await import("@/services/authService");
      await authService.sendOtp(email);
      setCountdown(60);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gửi lại mã thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Xác thực Email</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-600 text-4xl">
                check_circle
              </span>
            </div>
            <p className="text-green-600 font-semibold">Xác thực thành công!</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Mã OTP đã được gửi đến email: <strong>{email}</strong>
            </p>

            {error && (
              <div className="p-3 bg-red-100 text-red-600 rounded text-sm font-semibold mb-4">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập mã OTP (6 số)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtpCode(value);
                }}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="000000"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otpCode.length !== 6}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {loading ? "Đang xác thực..." : "Xác thực"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Không nhận được mã?{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">Gửi lại sau {countdown}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-primary font-semibold hover:underline disabled:opacity-50"
                >
                  Gửi lại
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
