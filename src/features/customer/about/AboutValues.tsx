export function AboutValues() {
  const values = [
    {
      icon: "volunteer_activism",
      title: "Tận Tâm",
      desc: "Chúng tôi đặt trái tim vào từng gói quà, từng tin nhắn tư vấn để khách hàng cảm nhận được sự ấm áp.",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: "verified_user",
      title: "Uy Tín",
      desc: "Cam kết 100% hàng chính hãng. Chính sách đổi trả minh bạch và bảo vệ quyền lợi người mua tuyệt đối.",
      iconColor: "text-red-600",
      bgColor: "bg-red-600/10",
    },
    {
      icon: "rocket_launch",
      title: "Tốc Độ",
      desc: "Giao hàng nhanh chóng 2h tại các thành phố lớn, đảm bảo quà tặng đến đúng thời khắc quan trọng.",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <section className="py-16 bg-[#f8f9fc] dark:bg-[#111621]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Giá trị cốt lõi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Những nguyên tắc định hình phong cách phục vụ của chúng tôi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white dark:bg-[#1f2937] p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1"
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full ${val.bgColor} ${val.iconColor} mb-6`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {val.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {val.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
