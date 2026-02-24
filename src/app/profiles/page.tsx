"use client";
import { useEffect, useState, useRef } from "react";
import { UserProfile, profileService } from "@/services/profileService";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

// --- Components ---

// Elevated Toast Notification Component with progress bar
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 2; // Roughly 3 seconds for 50 ticks * 60ms? No, 100/2 = 50 steps.
      });
    }, 60);

    const closeTimer = setTimeout(onClose, 3000);
    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-24 right-4 z-50 flex flex-col w-80 bg-white rounded-lg shadow-2xl overflow-hidden border-l-4 animate-fade-in-right ${
        type === "success" ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex items-center p-4 gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            type === "success"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {type === "success" ? "check" : "priority_high"}
          </span>
        </div>
        <div className="flex-1">
          <h4
            className={`font-bold text-sm ${
              type === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {type === "success" ? "Thành công" : "Lỗi"}
          </h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      <div className="h-1 bg-gray-100 w-full mt-auto">
        <div
          className={`h-full transition-all duration-75 ease-linear ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Generic Modal Component
const Modal = ({
  isOpen,
  title,
  onClose,
  children,
}: {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in border border-gray-100">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition bg-gray-50 hover:bg-gray-100 p-1 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI States
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [activeModal, setActiveModal] = useState<
    "phone" | "email" | "password" | "delete" | null
  >(null);

  // Modal Input States
  const [tempPhone, setTempPhone] = useState("");
  // const [tempEmail, setTempEmail] = useState(""); // Email update removed
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
  };

  const loadProfile = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(userStr);
      const data = await profileService.getProfile(user.userId);
      setProfile(data);
      setFormData(data);

      // Init temp values
      setTempPhone(data.phoneNumber || "");
      // setTempEmail(data.email || "");
    } catch (err: any) {
      console.error("Failed to load profile", err);
      const status = err.response?.status;
      if (status === 404) {
        setError(
          "Không tìm thấy dữ liệu. Có thể Backend chưa có API này. Vui lòng Restart Backend."
        );
      } else if (status === 401 || status === 403) {
        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      } else {
        setError("Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !profile) return;
    const file = e.target.files[0];

    try {
      const url = await profileService.uploadAvatar(profile.userId, file);
      setFormData({ ...formData, avatarUrl: url });
      setProfile({ ...profile, avatarUrl: url });
      showToast("Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      console.error("Failed to upload avatar", err);
      showToast("Tải lên ảnh thất bại.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const updated = await profileService.updateProfile(
        profile.userId,
        formData
      );
      setProfile(updated);
      showToast("Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error("Failed to update profile", err);
      showToast("Cập nhật thất bại.", "error");
    }
  };

  const handleUpdatePhone = async () => {
    if (!profile) return;
    try {
      const updated = await profileService.updateProfile(profile.userId, {
        phoneNumber: tempPhone,
      });
      setProfile(updated);
      setFormData((prev) => ({ ...prev, phoneNumber: tempPhone })); // Sync form data
      showToast("Cập nhật số điện thoại thành công!");
      setActiveModal(null);
    } catch (e) {
      showToast("Cập nhật thất bại.", "error");
    }
  };

  /* Email update removed as requested
  const handleUpdateEmail = async () => { ... }
  */

  const handleChangePassword = async () => {
    // Mock password change - Backend API needed for real implementation
    if (passwordForm.new !== passwordForm.confirm) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }
    if (passwordForm.new.length < 6) {
      showToast("Mật khẩu phải ít nhất 6 ký tự", "error");
      return;
    }
    // Assuming success for demo since authService might not have changePassword yet
    showToast("Đổi mật khẩu thành công!");
    setActiveModal(null);
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    // Mock delete request
    showToast("Yêu cầu đã được gửi đến Admin. Vui lòng chờ duyệt.");
    setActiveModal(null);
  };

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  if (loading) return <div className="p-8 text-center pt-32">Đang tải...</div>;

  if (error)
    return (
      <div className="py-8 text-center">
        <div className="text-red-500">{error}</div>
      </div>
    );

  if (!profile)
    return (
      <div className="py-8 text-center">
        <p className="mb-4">Vui lòng đăng nhập để xem hồ sơ</p>
        <Link
          href="/register_login.html?mode=login"
          className="text-primary font-bold hover:underline"
        >
          Đăng nhập
        </Link>
      </div>
    );

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Content Content - No Container as Layout handles it */}
      <div>
        <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Hồ Sơ Của Tôi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-primary mb-6 border-b pb-2">
              Thông tin cá nhân
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-100 group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.avatarUrl ? (
                      <img
                        src={formData.avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-4xl text-gray-400 font-bold">
                        {profile.fullName?.charAt(0)}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center rounded-full transition-all">
                      <span className="material-symbols-outlined text-white">
                        camera_alt
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Ảnh đại diện</div>
                  <div className="text-xs text-gray-400">
                    Dung lượng file tối đa 1 MB. Định dạng: .JPEG, .PNG
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-gray-600 font-medium">Họ & Tên</label>
                <input
                  type="text"
                  value={formData.fullName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary bg-gray-50 transition-colors hover:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-gray-600 font-medium">Nickname</label>
                <input
                  type="text"
                  value={formData.nickname || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nickname: e.target.value })
                  }
                  placeholder="Thêm nickname"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary transition-shadow focus:shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-gray-600 font-medium">Ngày sinh</label>
                <div className="flex gap-2">
                  <select
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-primary bg-white"
                    onChange={(e) => {
                      const day = e.target.value.padStart(2, "0");
                      const current = formData.dateOfBirth
                        ?.toString()
                        .split("-") || [new Date().getFullYear(), "01", "01"];
                      setFormData({
                        ...formData,
                        dateOfBirth: `${current[0]}-${current[1]}-${day}`,
                      });
                    }}
                    value={formData.dateOfBirth?.toString().split("-")[2] || ""}
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-primary bg-white"
                    onChange={(e) => {
                      const month = e.target.value.padStart(2, "0");
                      const current = formData.dateOfBirth
                        ?.toString()
                        .split("-") || [new Date().getFullYear(), "01", "01"];
                      setFormData({
                        ...formData,
                        dateOfBirth: `${current[0]}-${month}-${current[2]}`,
                      });
                    }}
                    value={formData.dateOfBirth?.toString().split("-")[1] || ""}
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        Tháng {m}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-primary bg-white"
                    onChange={(e) => {
                      const year = e.target.value;
                      const current = formData.dateOfBirth
                        ?.toString()
                        .split("-") || [new Date().getFullYear(), "01", "01"];
                      setFormData({
                        ...formData,
                        dateOfBirth: `${year}-${current[1]}-${current[2]}`,
                      });
                    }}
                    value={formData.dateOfBirth?.toString().split("-")[0] || ""}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-gray-600 font-medium">Giới tính</label>
                <div className="flex gap-6">
                  {["Nam", "Nữ", "Khác"].map((g) => (
                    <label
                      key={g}
                      className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded border transition-all ${
                        formData.gender === g
                          ? "border-primary bg-red-50 text-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={() => setFormData({ ...formData, gender: g })}
                        className="hidden" // Custom radio style
                      />
                      <span className="material-symbols-outlined text-[20px]">
                        {formData.gender === g
                          ? "radio_button_checked"
                          : "radio_button_unchecked"}
                      </span>
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-4">
                <label className="text-gray-600 font-medium">Quốc tịch</label>
                <select
                  value={formData.nationality || "Việt Nam"}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary bg-white"
                >
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="pt-4 md:pl-[136px]">
                <button
                  type="submit"
                  className="bg-[#D93F3C] text-white px-8 py-2.5 rounded hover:bg-[#b52d2a] transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2 transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">
                    save
                  </span>
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Contact & Security */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Số điện thoại và Email
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined">
                        smartphone
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">
                        Số điện thoại
                      </p>
                      <p className="text-sm text-gray-500">
                        {profile.phoneNumber || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveModal("phone")}
                    className="text-[#D93F3C] border border-[#D93F3C] px-3 py-1.5 rounded hover:bg-red-50 text-sm font-medium transition"
                  >
                    Cập nhật
                  </button>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-100 transition-colors">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">
                        Địa chỉ email
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {profile.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Dùng để đăng nhập
                      </p>
                    </div>
                  </div>
                  {/* Email update button removed */}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Bảo mật</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <p className="font-semibold text-gray-700">Đổi mật khẩu</p>
                  </div>
                  <button
                    onClick={() => setActiveModal("password")}
                    className="text-[#D93F3C] border border-[#D93F3C] px-3 py-1.5 rounded hover:bg-red-50 text-sm font-medium transition"
                  >
                    Cập nhật
                  </button>
                </div>

                <div className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </div>
                    <p className="font-semibold text-gray-700">
                      Yêu cầu xóa tài khoản
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveModal("delete")}
                    className="text-[#D93F3C] border border-[#D93F3C] px-3 py-1.5 rounded hover:bg-red-50 text-sm font-medium transition"
                  >
                    Yêu cầu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Phone Modal */}
      <Modal
        isOpen={activeModal === "phone"}
        title="Cập nhật Số điện thoại"
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Số điện thoại mới
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-xl">
                phone_iphone
              </span>
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100 transition-all"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleUpdatePhone}
              className="px-4 py-2 bg-[#D93F3C] text-white rounded hover:bg-[#b52d2a] shadow-md hover:shadow-lg font-medium transition-all"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>

      {/* Password Modal */}
      <Modal
        isOpen={activeModal === "password"}
        title="Đổi Mật Khẩu"
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, current: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={passwordForm.new}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, new: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirm: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-[#D93F3C] text-white rounded hover:bg-[#b52d2a] shadow-md hover:shadow-lg font-medium transition-all"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={activeModal === "delete"}
        title="Yêu cầu xóa tài khoản?"
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-red-50 p-4 rounded text-red-800 border border-red-100">
            <span className="material-symbols-outlined text-3xl">warning</span>
            <p className="text-sm font-medium">
              Hành động này không thể hoàn tác và cần sự phê duyệt của Admin.
            </p>
          </div>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn gửi yêu cầu xóa tài khoản này không?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-md hover:shadow-lg font-medium transition-all"
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
