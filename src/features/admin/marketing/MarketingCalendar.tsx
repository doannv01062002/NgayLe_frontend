export function MarketingCalendar() {
  const events = [
    {
      month: "T02",
      day: "10",
      title: "Mở bán Valentine",
      desc: "Toàn bộ danh mục Quà tặng",
      priority: true,
    },
    {
      month: "T02",
      day: "14",
      title: "Flash Sale Valentine",
      desc: "Khung giờ vàng 12h-14h",
      priority: true,
    },
    {
      month: "T03",
      day: "01",
      title: "Chiến dịch 8/3",
      desc: "Bắt đầu chạy quảng cáo",
      priority: false,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634] flex-1">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Lịch Marketing
      </h3>
      <div className="flex flex-col gap-3">
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
          >
            <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg w-12 h-12 shrink-0">
              <span className="text-xs font-medium text-gray-500 uppercase">
                {evt.month}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {evt.day}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {evt.title}
              </p>
              <p className="text-xs text-gray-500">{evt.desc}</p>
              {evt.priority && (
                <div className="flex gap-1 mt-1">
                  <span className="size-2 rounded-full bg-red-500"></span>
                  <span className="text-[10px] text-gray-400">
                    High Priority
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
        Xem lịch đầy đủ
      </button>
    </div>
  );
}
