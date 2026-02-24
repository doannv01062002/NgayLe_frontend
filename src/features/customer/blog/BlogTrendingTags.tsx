import Link from "next/link";

export function BlogTrendingTags() {
  const tags = [
    { title: "Tết Nguyên Đán", isPrimary: false },
    { title: "Quà tặng 8/3", isPrimary: true },
    { title: "Lễ Tình Nhân", isPrimary: false },
    { title: "Mẹo vặt gia đình", isPrimary: false },
    { title: "Trang trí nhà cửa", isPrimary: false },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      {tags.map((tag, index) => (
        <a
          key={index}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap shadow-sm ${
            tag.isPrimary
              ? "bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary"
              : "bg-white dark:bg-[#2a1d1b] border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
          }`}
          href="#"
        >
          <span className="text-primary font-bold">#</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {tag.title}
          </span>
        </a>
      ))}
    </div>
  );
}
