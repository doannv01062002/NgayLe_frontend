import Link from "next/link";

interface SupportCategoriesProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function SupportCategories({
  activeCategory,
  onSelectCategory,
}: SupportCategoriesProps) {
  const categories = [
    { icon: "grid_view", label: "Tài khoản & Bảo mật", value: "Tài khoản" },
    {
      icon: "shopping_cart",
      label: "Đơn hàng & Thanh toán",
      value: "Đơn hàng",
    },
    {
      icon: "local_shipping",
      label: "Vận chuyển & Giao nhận",
      value: "Vận chuyển",
    },
    { icon: "keyboard_return", label: "Đổi trả & Hoàn tiền", value: "Đổi trả" },
    {
      icon: "confirmation_number",
      label: "Khuyến mãi & Voucher",
      value: "Voucher",
    },
    { icon: "verified", label: "Chính sách bảo hành", value: "Chính sách" },
    { icon: "storefront", label: "Bán hàng cùng Ngayle", value: "Bán hàng" },
    { icon: "contact_support", label: "Liên hệ hỗ trợ", value: "Liên hệ" },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 py-10">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          grid_view
        </span>
        Danh mục hỗ trợ
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() =>
              onSelectCategory(cat.value === activeCategory ? "" : cat.value)
            }
            className={`group flex flex-col items-center gap-4 p-6 rounded-xl border transition-all duration-300 ${
              activeCategory === cat.value
                ? "bg-blue-50 border-primary shadow-lg dark:bg-blue-900/30"
                : "bg-white dark:bg-[#1e2936] border-gray-100 dark:border-gray-700 hover:border-primary hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            <div
              className={`size-14 rounded-full flex items-center justify-center transition-colors ${
                activeCategory === cat.value
                  ? "bg-primary text-white"
                  : "bg-blue-50 dark:bg-blue-900/30 text-primary group-hover:bg-primary group-hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[32px]">
                {cat.icon}
              </span>
            </div>
            <span className="text-base font-bold text-center text-gray-900 dark:text-white">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
