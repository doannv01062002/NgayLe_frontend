export function AffiliateFAQ() {
  const faqs = [
    {
      question: "Tôi cần điều kiện gì để tham gia?",
      answer:
        "Bất kỳ ai cũng có thể tham gia! Dù bạn là KOC, chủ website, admin fanpage hay chỉ là cá nhân muốn kiếm thêm thu nhập. Chúng tôi không yêu cầu lượng follower tối thiểu, tuy nhiên việc có sẵn traffic là một lợi thế lớn.",
    },
    {
      question: "Phương thức thanh toán như thế nào?",
      answer:
        "NgayLe.com thanh toán chuyển khoản ngân hàng trực tiếp tại Việt Nam. Thu nhập sẽ được tổng kết vào cuối tháng và thanh toán vào ngày 15 của tháng kế tiếp nếu số dư đạt mức tối thiểu 200,000đ.",
    },
    {
      question: "Tôi có được hỗ trợ banner quảng cáo không?",
      answer:
        "Có. Sau khi đăng ký thành công, bạn sẽ được truy cập vào kho tài nguyên Marketing bao gồm Banner, Video, Content mẫu cho từng chiến dịch Lễ Tết cụ thể.",
    },
  ];

  return (
    <div className="w-full py-16 bg-white dark:bg-background-dark">
      <div className="flex justify-center">
        <div className="flex flex-col max-w-[800px] w-full px-4 lg:px-10">
          <h2 className="text-gray-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-8 text-center">
            Câu hỏi thường gặp
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#15202b] open:bg-white dark:open:bg-background-dark p-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 dark:text-white font-bold list-none">
                  <h3 className="text-base">{faq.question}</h3>
                  <span className="material-symbols-outlined transition group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300 text-sm">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
