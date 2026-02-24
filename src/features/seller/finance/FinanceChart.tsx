export function FinanceChart() {
  const data = [
    { label: "T2", value: "2.4M", height: "40%" },
    { label: "T3", value: "4.2M", height: "65%" },
    { label: "T4", value: "1.8M", height: "35%" },
    { label: "T5", value: "6.5M", height: "85%" },
    { label: "T6", value: "3.1M", height: "50%" },
    { label: "T7", value: "7.2M", height: "90%", isPrimary: true },
    { label: "CN", value: "5.5M", height: "75%", isDashed: true },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Biểu đồ doanh thu
        </h3>
        <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg py-1 px-3 cursor-pointer outline-none focus:ring-2 focus:ring-primary/50">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>Tháng này</option>
        </select>
      </div>
      {/* Custom CSS Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-64 w-full pt-4 pb-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 flex-1 group"
          >
            <div
              className={`relative w-full bg-primary/10 dark:bg-primary/20 rounded-t-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-all flex items-end justify-center`}
              style={{ height: item.height }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow transition-opacity whitespace-nowrap z-10">
                {item.value}
              </div>
              <div
                className={`w-full mx-1 rounded-t-sm ${
                  item.isDashed
                    ? "bg-primary/50 border-t-2 border-dashed border-primary"
                    : "bg-primary"
                }`}
                style={{ height: "100%" }}
              ></div>
            </div>
            <span
              className={`text-xs ${
                item.isPrimary ? "font-bold text-primary" : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
