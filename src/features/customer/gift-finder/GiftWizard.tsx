"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function GiftWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipient, setRecipient] = useState("Người yêu");
  const [occasion, setOccasion] = useState("");
  const [minPrice, setMinPrice] = useState(200000);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const MIN_limit = 0;
  const MAX_limit = 10000000;

  useEffect(() => {
    if (searchParams.get("recipient"))
      setRecipient(searchParams.get("recipient") || "Người yêu");
    if (searchParams.get("occasion"))
      setOccasion(searchParams.get("occasion") || "");
    if (searchParams.get("minPrice"))
      setMinPrice(Number(searchParams.get("minPrice")));
    if (searchParams.get("maxPrice"))
      setMaxPrice(Number(searchParams.get("maxPrice")));
  }, [searchParams]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100000);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 100000);
    setMaxPrice(value);
  };

  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - MIN_limit) / (MAX_limit - MIN_limit)) * 100),
    [MIN_limit, MAX_limit]
  );

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (recipient) params.set("recipient", recipient);
    if (occasion) params.set("occasion", occasion);
    params.set("minPrice", minPrice.toString());
    params.set("maxPrice", maxPrice.toString());
    router.push(`/gift-finder?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-[#231530] dark:ring-white/5 lg:p-10 mb-10 overflow-hidden relative group">
      {/* Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20"></div>
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl transition-all duration-700 group-hover:bg-red-500/20"></div>

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Text Intro */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-800/50">
            <span className="material-symbols-outlined text-[16px]">
              volunteer_activism
            </span>
            Quà tặng ý nghĩa
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Trao gửi yêu thương, trọn vẹn ý nghĩa
          </h1>
          <p className="text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            Công cụ gợi ý quà tặng thông minh giúp bạn tìm món quà hoàn hảo cho
            người thân yêu chỉ trong 3 bước đơn giản.
          </p>
        </div>

        {/* The Wizard Tool */}
        <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-slate-50 p-6 dark:bg-white/5 border border-slate-100 dark:border-white/10">
          {/* Step 1: Recipient */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Bạn muốn tặng cho ai?
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Người yêu",
                "Bố mẹ",
                "Sếp / Đồng nghiệp",
                "Bạn thân",
                "Trẻ em",
              ].map((item) => (
                <label key={item} className="cursor-pointer">
                  <input
                    checked={recipient === item}
                    onChange={() => setRecipient(item)}
                    className="peer sr-only"
                    name="recipient"
                    type="radio"
                  />
                  <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:peer-checked:bg-primary dark:peer-checked:text-white">
                    {item}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Occasion */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Nhân dịp gì?
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Lễ & Tết",
                  items: [
                    { icon: "celebration", label: "Tết Nguyên Đán" },
                    { icon: "forest", label: "Lễ Giáng sinh" },
                    { icon: "bedtime", label: "Tết Trung Thu" },
                    { icon: "spa", label: "Lễ Vu Lan" },
                  ],
                },
                {
                  title: "Ngày kỷ niệm",
                  items: [
                    { icon: "favorite", label: "Ngày Valentine" },
                    { icon: "female", label: "Quốc tế Phụ nữ" },
                    { icon: "child_care", label: "Quốc tế Thiếu nhi" },
                    { icon: "face_3", label: "Phụ nữ Việt Nam" },
                    { icon: "school", label: "Ngày Nhà giáo VN" },
                  ],
                },
                {
                  title: "Dịp cá nhân",
                  items: [
                    { icon: "cake", label: "Sinh nhật" },
                    { icon: "volunteer_activism", label: "Kỷ niệm" },
                    { icon: "school", label: "Lễ tốt nghiệp" },
                    { icon: "celebration", label: "Tân gia / Khai trương" },
                  ],
                },
              ].map((group) => (
                <div key={group.title} className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => setOccasion(item.label)}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all ${
                          occasion === item.label
                            ? "border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/20"
                            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            occasion === item.label
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Budget */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  3
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Ngân sách dự kiến
                </h3>
              </div>
              <span className="text-sm font-bold text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(minPrice)}{" "}
                -{" "}
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(maxPrice)}
              </span>
            </div>

            {/* Slider Logic */}
            <div className="relative h-10 w-full flex items-center">
              <input
                type="range"
                min={MIN_limit}
                max={MAX_limit}
                step={100000}
                value={minPrice}
                onChange={handleMinChange}
                className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none bg-transparent opacity-0 hover:opacity-100 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <input
                type="range"
                min={MIN_limit}
                max={MAX_limit}
                step={100000}
                value={maxPrice}
                onChange={handleMaxChange}
                className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none bg-transparent opacity-0 hover:opacity-100 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />

              <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="absolute h-full rounded-full bg-primary"
                  style={{
                    left: `${getPercent(minPrice)}%`,
                    width: `${getPercent(maxPrice) - getPercent(minPrice)}%`,
                  }}
                ></div>
                {/* Thumb Visuals */}
                <div
                  className="absolute top-1/2 -ml-2.5 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-md"
                  style={{ left: `${getPercent(minPrice)}%` }}
                ></div>
                <div
                  className="absolute top-1/2 -ml-2.5 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-md"
                  style={{ left: `${getPercent(maxPrice)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>{new Intl.NumberFormat("vi-VN").format(MIN_limit)}đ</span>
              <span>{new Intl.NumberFormat("vi-VN").format(MAX_limit)}đ+</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            Tìm quà tặng ngay
          </button>
        </div>
      </div>
    </div>
  );
}
