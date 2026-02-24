export function AboutStats() {
  const stats = [
    { value: "1M+", label: "Quà tặng đã trao" },
    { value: "500K+", label: "Khách hàng hài lòng" },
    { value: "63", label: "Tỉnh thành phủ sóng" },
    { value: "30+", label: "Dịp lễ lớn nhỏ" },
  ];

  return (
    <section className="py-16 bg-primary dark:bg-blue-900">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-4">
              <p className="text-4xl font-black text-white">{stat.value}</p>
              <p className="text-blue-100 font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
