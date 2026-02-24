"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";

export default function ShopSettingsPage() {
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"basic" | "shipping" | "policy">(
    "basic"
  );

  const [formData, setFormData] = useState({
    shopName: "",
    logoUrl: "",
    bannerUrl: "",
    pickupAddress: "",
    shippingPolicy: "",
    returnPolicy: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Previews separate from formData to manage local vs remote URLs cleanly if needed,
  // but updating formData directly with object URLs is also fine for previewing.
  // We'll update formData directly for simplicity in rendering.

  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const { data } = await api.get("/v1/shops/me");
      setShop(data);
      setFormData({
        shopName: data.shopName || "",
        logoUrl: data.logoUrl || "",
        bannerUrl: data.bannerUrl || "",
        pickupAddress: data.pickupAddress || "",
        shippingPolicy: data.shippingPolicy || "",
        returnPolicy: data.returnPolicy || "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompleteness = () => {
    let score = 0;
    if (formData.shopName) score += 10;
    if (formData.logoUrl) score += 20;
    if (formData.bannerUrl) score += 20;
    if (formData.pickupAddress) score += 20; // Assuming address is set via external means as implemented in backend
    if (formData.shippingPolicy) score += 15;
    if (formData.returnPolicy) score += 15;
    return Math.min(score, 100);
  };

  const uploadImage = async (file: File, type: "logo" | "banner") => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("type", type);

    const { data } = await api.post("/v1/shops/me/image", formDataUpload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // Returns URL string
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let newLogoUrl = formData.logoUrl;
      let newBannerUrl = formData.bannerUrl;

      // Upload images if new files exist
      if (logoFile) {
        newLogoUrl = await uploadImage(logoFile, "logo");
      }
      if (bannerFile) {
        newBannerUrl = await uploadImage(bannerFile, "banner");
      }

      await api.put("/v1/shops/me", {
        shopName: formData.shopName,
        logoUrl: newLogoUrl,
        bannerUrl: newBannerUrl,
        shippingPolicy: formData.shippingPolicy,
        returnPolicy: formData.returnPolicy,
      });

      // Clear local files after successful save
      setLogoFile(null);
      setBannerFile(null);

      alert("Lưu thay đổi thành công!");
      fetchShop();
    } catch (e) {
      alert("Lỗi khi lưu thay đổi");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);

      if (type === "logo") {
        setLogoFile(file);
        setFormData((prev) => ({ ...prev, logoUrl: objectUrl }));
      } else {
        setBannerFile(file);
        setFormData((prev) => ({ ...prev, bannerUrl: objectUrl }));
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Đang tải thông tin...</div>
    );
  }

  const completeness = calculateCompleteness();

  return (
    <>
      <div className="px-8 pt-6 pb-2">
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            className="text-gray-500 hover:text-primary transition-colors"
            href="/seller"
          >
            Kênh Người Bán
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            Thiết lập Shop
          </span>
        </div>
      </div>

      <div className="px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight mb-1">
              Hồ sơ Shop
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Quản lý thông tin hiển thị và vận hành của gian hàng trên
              Ngayle.com
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/shops/${shop?.shopId}`} target="_blank">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-lg text-sm font-bold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50">
                Xem Shop của tôi
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 mb-6">
        <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[24px]">
              verified
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                Độ hoàn thiện hồ sơ shop
              </span>
              <span className="text-sm font-bold text-primary">
                {completeness}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completeness === 100
                ? "Tuyệt vời! Hồ sơ của bạn đã hoàn thiện."
                : "Hãy bổ sung đầy đủ thông tin để tăng độ tin cậy."}
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-6 py-3 border-b-2 font-bold text-sm transition-colors ${
                activeTab === "basic"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Thông tin cơ bản
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`px-6 py-3 border-b-2 font-bold text-sm transition-colors ${
                activeTab === "shipping"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Vận chuyển
            </button>
            <button
              onClick={() => setActiveTab("policy")}
              className={`px-6 py-3 border-b-2 font-bold text-sm transition-colors ${
                activeTab === "policy"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Chính sách
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-6 shadow-sm">
            {activeTab === "basic" && (
              <>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Thông tin định danh
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  Tên shop và hình ảnh đại diện thương hiệu của bạn.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tên Shop <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.shopName}
                      onChange={(e) =>
                        setFormData({ ...formData, shopName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Tên shop không được chứa từ ngữ vi phạm chính sách.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Địa chỉ lấy hàng
                    </label>
                    <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                      <span className="material-symbols-outlined text-gray-400 mr-2 text-[18px]">
                        location_on
                      </span>
                      <span className="text-sm text-gray-700 truncate">
                        {formData.pickupAddress ||
                          "Chưa cập nhật địa chỉ lấy hàng"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Logo Shop
                    </label>
                    <div
                      onClick={() => logoRef.current?.click()}
                      className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all group relative overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage: formData.logoUrl
                          ? `url("${formData.logoUrl}")`
                          : undefined,
                      }}
                    >
                      {!formData.logoUrl && (
                        <>
                          <span className="material-symbols-outlined text-gray-400 group-hover:text-primary mb-1">
                            cloud_upload
                          </span>
                          <span className="text-xs text-gray-500 group-hover:text-primary">
                            Tải ảnh
                          </span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={logoRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logo")}
                    />
                    <p className="text-[10px] text-gray-400 mt-2 max-w-[150px]">
                      Kích thước chuẩn: 500x500px. Dung lượng tối đa 2MB.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Ảnh bìa Shop
                    </label>
                    <div
                      onClick={() => bannerRef.current?.click()}
                      className="w-full h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all group relative overflow-hidden bg-red-50 bg-cover bg-center"
                      style={{
                        backgroundImage: formData.bannerUrl
                          ? `url("${formData.bannerUrl}")`
                          : undefined,
                      }}
                    >
                      {!formData.bannerUrl && (
                        <>
                          <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                          <span className="material-symbols-outlined text-gray-400 group-hover:text-primary mb-1 z-10">
                            image
                          </span>
                          <span className="text-xs text-gray-500 group-hover:text-primary z-10">
                            Tải ảnh bìa
                          </span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={bannerRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "banner")}
                    />
                    <p className="text-[10px] text-gray-400 mt-2">
                      Kích thước chuẩn: 1200x600px. Hiển thị tốt nhất trên
                      mobile.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "shipping" && (
              <>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Cài đặt vận chuyển
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  Thông tin về phương thức vận chuyển và đóng gói.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Chính sách vận chuyển
                    </label>
                    <textarea
                      value={formData.shippingPolicy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingPolicy: e.target.value,
                        })
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
                      placeholder="Nhập thông tin về thời gian giao hàng, đơn vị vận chuyển..."
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            {activeTab === "policy" && (
              <>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Chính sách Shop
                </h3>
                <p className="text-gray-500 text-xs mb-6">
                  Thông tin về đổi trả, bảo hành và khiếu nại.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Chính sách đổi trả & Bảo hành
                    </label>
                    <textarea
                      value={formData.returnPolicy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          returnPolicy: e.target.value,
                        })
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
                      placeholder="Quy định về đổi trả hàng, thời gian bảo hành, điều kiện..."
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={fetchShop}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>

        {/* Right Column: Mobile Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                smartphone
              </span>
              Xem trước hiển thị
            </h3>
            <div className="bg-gray-900 rounded-[35px] p-3 shadow-2xl max-w-[320px] mx-auto border-4 border-gray-800">
              <div className="bg-white rounded-[24px] overflow-hidden h-[600px] relative">
                {/* Status Bar */}
                <div className="h-6 bg-gray-100 flex justify-between px-4 items-center text-[10px] font-bold text-gray-500">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      wifi
                    </span>
                    <span className="material-symbols-outlined text-[10px]">
                      battery_full
                    </span>
                  </div>
                </div>

                {/* Shop Header Preview */}
                <div
                  className="relative h-32 bg-gray-200 bg-cover bg-center"
                  style={{
                    backgroundImage: formData.bannerUrl
                      ? `url("${formData.bannerUrl}")`
                      : undefined,
                  }}
                >
                  {/* Cover Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Search Bar */}
                  <div className="absolute top-2 left-2 right-2 flex gap-2">
                    <span className="material-symbols-outlined text-white">
                      arrow_back
                    </span>
                    <div className="flex-1 bg-white/20 rounded-full h-6"></div>
                    <span className="material-symbols-outlined text-white">
                      more_vert
                    </span>
                  </div>

                  <div className="absolute -bottom-8 left-4 flex items-end gap-2">
                    <div
                      className="w-16 h-16 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center overflow-hidden bg-cover bg-center"
                      style={{
                        backgroundImage: formData.logoUrl
                          ? `url("${formData.logoUrl}")`
                          : undefined,
                      }}
                    >
                      {!formData.logoUrl && (
                        <span className="material-symbols-outlined text-gray-300 text-[30px]">
                          account_circle
                        </span>
                      )}
                    </div>
                    <div className="pb-9">
                      <h4 className="text-white font-bold text-sm shadow-black drop-shadow-md">
                        {formData.shopName || "Tên Shop"}
                      </h4>
                      <div className="flex gap-1 items-center">
                        <span className="bg-red-600 text-white text-[8px] px-1 rounded">
                          Mall
                        </span>
                        <span className="text-white/90 text-[10px]">
                          Online 5 phút trước
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shop Stats */}
                <div className="mt-10 px-4 flex justify-between text-center pb-4 border-b border-gray-100">
                  <div>
                    <div className="font-bold text-sm">120</div>
                    <div className="text-[10px] text-gray-500">Sản phẩm</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">4.9</div>
                    <div className="text-[10px] text-gray-500">Đánh giá</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">98%</div>
                    <div className="text-[10px] text-gray-500">Phản hồi</div>
                  </div>
                </div>

                {/* Product Grid Mockup */}
                <div className="p-3 grid grid-cols-2 gap-2 bg-gray-50 h-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-2 h-40">
                      <div className="w-full h-24 bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-red-50 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">
              Giao diện hiển thị thực tế trên ứng dụng
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
