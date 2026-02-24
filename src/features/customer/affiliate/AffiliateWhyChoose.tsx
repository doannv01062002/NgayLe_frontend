export function AffiliateWhyChoose() {
  const features = [
    {
      icon: "timer",
      title: "Cookie 30 ngày",
      desc: "Ghi nhận đơn hàng trong vòng 30 ngày kể từ khi khách hàng click vào link của bạn.",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600",
    },
    {
      icon: "monitoring",
      title: "Tracking Real-time",
      desc: "Hệ thống báo cáo minh bạch, cập nhật trạng thái đơn hàng theo thời gian thực.",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600",
    },
    {
      icon: "savings",
      title: "Thanh toán đúng hạn",
      desc: "Tự động đối soát và thanh toán vào ngày 15 hàng tháng. Minpay chỉ 200,000đ.",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-600",
    },
    {
      icon: "support_agent",
      title: "Hỗ trợ 1-1",
      desc: "Đội ngũ AM (Account Manager) hỗ trợ riêng biệt, cung cấp banner và content mẫu.",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="flex justify-center">
        <div className="flex flex-col max-w-[1280px] w-full px-4 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-gray-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Tại sao chọn Affiliate NgayLe.com?
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Nền tảng tối ưu lợi nhuận cho Publisher với các chính sách minh
              bạch và hỗ trợ tận tình.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-full ${feature.bgColor} flex items-center justify-center ${feature.textColor} mb-4`}
                >
                  <span className="material-symbols-outlined">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
