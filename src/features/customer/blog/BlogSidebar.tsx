import Link from "next/link";

export function BlogSidebar() {
  const hotProducts = [
    {
      name: "Son Kem Lì Black Rouge Air Fit Velvet Tint",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBgkykDyxthqGEY5NPpmrkrhfpFuYg-uudlljqVAmD7epG9iY6TTB8qFa5q1gXuePe-fl8TofS5FUh4hQSGbNNCl_8POu4jQ3-o6VayFBTrkO-K_BtJN0HxID-4pggWur32HE4TbNh1uKRyaIOk7VudwxHbExKS91GWpldysWbGmvUYO98cAalnws0FyaBb_P5tBAlhrUjohxkxavRerQYmx6HRh_09QhBBu7WZRdbQpSftvcfV3pcJZ8ueWz8SLn2XoraxUgsNMaA",
      price: "159.000đ",
    },
    {
      name: "Đồng Hồ Nữ Casio Sheen Dây Da",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAutZLbGUDOlX59OMZZP81lRO6Lh5QOmBe30i7lyEE-nAMTCQ9Bbf1_uuhUgAiXtLFKDu1TGT0IDyo4jCv-QBvp2cgHwPR9zV87jDr1Xnm9FvA9vsLDsGxgtDLzJwnINtDTeZa6iJiOfRDFYJljfr-cFMtWFKF8RmP4OhZPD6CoatRrUP1fhw887heBPPnobpFxHLNLivnHC5gxkupbOwYevEYLMwc65wxce828oAwHJxLobDbj3SXPDZG-AyG_Iw4hDfCynjEUP-w",
      price: "3.250.000đ",
    },
    {
      name: "Set Trà Hoa Cúc Mật Ong Quà Tặng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYQ4OCFsp6PEDgoP-JA5F7-CwS9WKkC3K9htOc_1pzbP56ph02GUJxih5Xv1QRlsUgWJ4Q9HrOj7uu8xSzgrBzA63peYpPx8AQiyDDTEfIDO0JEaByKA0DdTfLHJKrGtrRMS3YhXQUbsOf2dmR2H07-miCXyVrqm7OkjVk0LNBklPNM21E_m0tFQwtOkLdW8WwTgVNbMhkxbjF7Hx-9NvPJq3opyoE-1k7hIPFJER83VJkpurRjWJDxiRuJqwtyVjdtGpIyaTq0dg",
      price: "299.000đ",
    },
    {
      name: "Gấu Bông Teddy Khổng Lồ 1m6",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWKNNHJdKBkSgJSzcekCs2_Q363EBgB913SPEER1tnzSTXz99UTetdHJ7fbE8GCPes6he5kDYQyiGIluvwrZTVH6nE8VnBx7laa_2xR4vhLug8VceQAn8RSvPwTEOHlKmZd8lUEq4c5K-cBpR-s1LEK3cWkP01yllFJ53BLiR2xzLwE2FZuolwEQ_pZSSrh1EB6DE7IGNhzux4AoAddDbZFYfICLbRvCXdcG4VJH2BzBdeE_nteDScukTu0PxvPGeB7GqZXPFE0qo",
      price: "550.000đ",
    },
  ];

  return (
    <aside className="lg:col-span-3 flex flex-col gap-6">
      {/* Trending Products Widget */}
      <div className="bg-white dark:bg-[#1b0f0d] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="bg-red-50 dark:bg-red-900/20 px-4 py-3 border-b border-red-100 dark:border-red-900/30">
          <h3 className="text-primary font-bold text-sm uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              local_fire_department
            </span>
            Sản phẩm Hot
          </h3>
        </div>
        <div className="p-2 flex flex-col gap-2">
          {hotProducts.map((product, index) => (
            <a
              key={index}
              className="flex gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded group transition-colors"
              href="#"
            >
              <div
                className="w-16 h-16 shrink-0 bg-gray-100 rounded bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              ></div>
              <div className="flex flex-col justify-center">
                <h4 className="text-xs font-medium text-gray-900 dark:text-gray-200 line-clamp-2 group-hover:text-primary mb-1">
                  {product.name}
                </h4>
                <div className="text-primary font-bold text-sm">
                  {product.price}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 text-center">
          <a
            className="text-xs font-bold text-primary hover:underline"
            href="#"
          >
            Xem thêm sản phẩm hot
          </a>
        </div>
      </div>

      {/* Interactive Poll Widget */}
      <div className="bg-white dark:bg-[#1b0f0d] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
          Thăm dò ý kiến
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tết năm nay bạn thích nhận quà gì nhất?
        </p>
        <div className="space-y-3">
          {["Tiền lì xì", "Quà công nghệ", "Mỹ phẩm / Quần áo"].map(
            (option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <input
                  className="text-primary focus:ring-primary h-4 w-4"
                  name="poll"
                  type="radio"
                />
                <span className="text-sm dark:text-gray-300">{option}</span>
              </label>
            )
          )}
          <button className="w-full bg-primary text-white py-2 rounded font-medium text-sm hover:bg-red-700 transition-colors mt-2">
            Bình chọn
          </button>
        </div>
      </div>

      {/* Banner Ad */}
      <div className="rounded-lg overflow-hidden shadow-sm group cursor-pointer block">
        <div
          className="w-full aspect-[3/4] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2Ym9qrTIbOGzeT4-cc_1QCOG6uG6UULcBmMhW-K9nb9aK-JUsJZyL_7u33JDQuw8Ss2Z6CcR7SH7Dn_V6G51_Q3DkLLX77q1y1S20moaYjt1mz69esYBXVY7gHYF4sJaAUa4wABx1KlNeyZzVcHCUM6QX9ZdfoMd0yAlt94oiU6Me_DDOk71j_PBgenn4QMaP92CQgkBB2shirRh0hVd-87arhgSK6Sf-HGCDRUpLhYVpFpb6yskgMOPU7951Iutz4r-dJDukVW0')",
          }}
        >
          {/* Added overlay for better text readability if needed */}
        </div>
      </div>
    </aside>
  );
}
