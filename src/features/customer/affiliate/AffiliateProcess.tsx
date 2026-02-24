export function AffiliateProcess() {
  const steps = [
    {
      icon: "person_add",
      title: "1. Đăng ký tài khoản",
      desc: "Điền thông tin vào mẫu đăng ký trực tuyến. Hệ thống sẽ xét duyệt tự động và phản hồi trong vòng 24h làm việc.",
    },
    {
      icon: "share",
      title: "2. Chia sẻ liên kết",
      desc: "Tạo link tiếp thị (deep link) cho các sản phẩm Lễ Tết, Valentine, Trung Thu... và chia sẻ lên mạng xã hội, website của bạn.",
    },
    {
      icon: "payments",
      title: "3. Nhận hoa hồng",
      desc: "Hoa hồng được ghi nhận ngay khi đơn hàng thành công. Thanh toán tự động vào ngày 15 hàng tháng qua tài khoản ngân hàng.",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#15202b] border-y border-gray-100 dark:border-gray-800">
      <div className="flex justify-center py-10">
        <div className="flex flex-col max-w-[1280px] w-full px-4 lg:px-10">
          <div className="mb-8">
            <h2 className="text-gray-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">
              Quy trình tham gia đơn giản
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Chỉ mất 3 bước để bắt đầu kiếm tiền cùng chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark p-6 transition-transform hover:-translate-y-1"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary">
                  <span className="material-symbols-outlined text-[28px]">
                    {step.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-900 dark:text-white text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
