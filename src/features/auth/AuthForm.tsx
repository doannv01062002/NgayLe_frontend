"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { OtpModal } from "./OtpModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  // New states for UI control
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (successMsg) setSuccessMsg(null);
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  // Google Login với Firebase
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      // Clear any existing tokens to avoid conflicts
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Lấy token từ Firebase
      const idToken = await user.getIdToken();

      // Gửi đến backend để tạo/login user
      const data = await authService.socialLogin(
        "google",
        idToken,
        user.email || "",
        user.displayName || "",
        user.uid
      );

      authService.setSession(data);
      if (data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || err.message || "Đăng nhập Google thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  // Facebook Login với Firebase
  const handleFacebookLogin = async () => {
    // Disabled feature
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isLogin) {
        const data = await authService.login(
          formData.emailOrPhone,
          formData.password
        );
        authService.setSession(data);
        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        const errors: Record<string, string> = {};

        // Validation: Terms Agreement
        if (!agreedToTerms) {
          errors.terms = "Bạn cần đồng ý cam kết với các điều khoản";
        }

        // Validation: Full Name
        if (!formData.fullName.trim()) {
          errors.fullName = "Vui lòng nhập họ và tên";
        } else if (formData.fullName.trim().length < 2) {
          errors.fullName = "Họ và tên quá ngắn";
        }

        // Validate password length
        if (formData.password.length < 6) {
          errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = "Mật khẩu không khớp";
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailOrPhone)) {
          errors.emailOrPhone = "Vui lòng nhập Email hợp lệ";
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setLoading(false);
          return;
        }

        // Send OTP first
        await authService.sendOtp(formData.emailOrPhone);
        setPendingEmail(formData.emailOrPhone);
        setShowOtpModal(true);
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message || err.message || "Đã có lỗi xảy ra";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerified = async () => {
    // After OTP is verified, complete registration
    try {
      setLoading(true);
      // Backend call to create user (now checks verification status)
      await authService.register(
        formData.fullName,
        formData.emailOrPhone,
        formData.password
      );

      // UX: Switch to Login tab, clear passwords, show success message
      setIsLogin(true);
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setSuccessMsg("Đăng ký thành công! Vui lòng đăng nhập.");
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

      <OtpModal
        email={pendingEmail}
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerified={handleOtpVerified}
      />

      <div className="w-full max-w-[480px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#f3e7e7]">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setSuccessMsg(null);
              setFieldErrors({});
            }}
            className={`flex-1 py-4 text-center border-b-[3px] font-bold text-base transition-colors ${
              isLogin
                ? "border-primary text-primary hover:bg-gray-50"
                : "border-transparent text-[#9a4c4c] hover:text-primary"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setSuccessMsg(null);
              setFieldErrors({});
            }}
            className={`flex-1 py-4 text-center border-b-[3px] font-bold text-base transition-colors ${
              !isLogin
                ? "border-primary text-primary hover:bg-gray-50"
                : "border-transparent text-[#9a4c4c] hover:text-primary"
            }`}
          >
            Đăng ký
          </button>
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-5">
          <div className="text-xl font-bold text-[#1b0d0d] mb-1">
            {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-600 rounded text-sm font-semibold">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-green-100 text-green-600 rounded text-sm font-semibold">
              {successMsg}
            </div>
          )}

          {/* Inputs */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#1b0d0d]">
                  Họ và tên
                </span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-[#fcf8f8] px-4 py-3 text-base text-[#1b0d0d] placeholder:text-[#9a4c4c]/70 focus:outline-none transition-all ${
                    fieldErrors.fullName
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-[#e7cfcf] focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                  placeholder="Nhập họ và tên"
                  type="text"
                />
                {fieldErrors.fullName && (
                  <span className="text-xs text-red-500 font-medium animate-pulse mt-1">
                    {fieldErrors.fullName}
                  </span>
                )}
              </label>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#1b0d0d]">
                Email
              </span>
              <input
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-[#fcf8f8] px-4 py-3 text-base text-[#1b0d0d] placeholder:text-[#9a4c4c]/70 focus:outline-none transition-all ${
                  fieldErrors.emailOrPhone
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#e7cfcf] focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
                placeholder="Nhập email"
                type="text"
                required
              />
              {fieldErrors.emailOrPhone && (
                <span className="text-xs text-red-500 font-medium animate-pulse mt-1">
                  {fieldErrors.emailOrPhone}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-[#1b0d0d]">
                Mật khẩu
              </span>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-[#fcf8f8] px-4 py-3 text-base text-[#1b0d0d] placeholder:text-[#9a4c4c]/70 focus:outline-none transition-all pr-12 ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-[#e7cfcf] focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a4c4c] hover:text-primary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {fieldErrors.password && (
                <span className="text-xs text-red-500 font-medium animate-pulse mt-1">
                  {fieldErrors.password}
                </span>
              )}
            </label>
            {!isLogin && (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#1b0d0d]">
                  Nhập lại mật khẩu
                </span>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full rounded-lg border bg-[#fcf8f8] px-4 py-3 text-base text-[#1b0d0d] placeholder:text-[#9a4c4c]/70 focus:outline-none transition-all pr-12 ${
                      fieldErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-[#e7cfcf] focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Nhập lại mật khẩu"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a4c4c] hover:text-primary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <span className="text-xs text-red-500 font-medium animate-pulse mt-1">
                    {fieldErrors.confirmPassword}
                  </span>
                )}
              </label>
            )}

            <div className="flex items-center justify-between text-xs md:text-sm">
              {isLogin ? (
                <>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="rounded border-[#e7cfcf] text-primary focus:ring-primary"
                      type="checkbox"
                    />
                    <span className="text-[#5c3838]">Ghi nhớ đăng nhập</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    className="rounded border-[#e7cfcf] text-primary focus:ring-primary"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (e.target.checked) {
                        setFieldErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.terms;
                          return copy;
                        });
                      }
                    }}
                  />
                  <span className="text-[#5c3838]">
                    Tôi đồng ý với điều khoản
                  </span>
                </label>
              )}
            </div>
            {!isLogin && fieldErrors.terms && (
              <span className="text-xs text-red-500 font-medium animate-pulse mt-1 ml-6">
                {fieldErrors.terms}
              </span>
            )}
            <button
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-primary py-3 px-4 text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
              type="submit"
            >
              {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký"}
            </button>
          </form>
          {/* Social Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#f3e7e7]"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-[#9a4c4c] uppercase">
              Hoặc {isLogin ? "đăng nhập" : "đăng ký"} bằng
            </span>
            <div className="flex-grow border-t border-[#f3e7e7]"></div>
          </div>
          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#e7cfcf] bg-white py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {/* Google Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                  fill="#34A853"
                />
                <path
                  d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61049L5.50264 9.70143C6.45064 6.86183 9.10947 4.74966 12.2401 4.74966Z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-[#1b0d0d]">Google</span>
            </button>
            <button
              disabled={true}
              title="Tính năng đang phát triển"
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#e7cfcf] bg-gray-100 py-2.5 cursor-not-allowed opacity-60"
            >
              {/* Facebook Icon */}
              <svg
                className="w-5 h-5 text-[#1877F2]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-[#1b0d0d]">
                Facebook
              </span>
            </button>
          </div>
          <div className="mt-2 text-center text-xs text-[#9a4c4c]">
            Bằng việc đăng kí, bạn đồng ý với Ngayle.com về <br />
            <Link
              className="text-[#1b0d0d] font-bold hover:underline"
              href="/terms"
            >
              Điều khoản dịch vụ
            </Link>
            &amp;
            <Link
              className="text-[#1b0d0d] font-bold hover:underline"
              href="/privacy-policy"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
