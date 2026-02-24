export function CampaignTable() {
  const campaigns = [
    {
      name: "Lì Xì Tết Giáp Thìn",
      status: "running",
      date: "15/01 - 10/02",
      revenue: "850.000.000đ",
    },
    {
      name: "Săn Sale 8/3",
      status: "upcoming",
      date: "01/03 - 09/03",
      revenue: "--",
    },
    {
      name: "Flash Sale Valentine",
      status: "draft",
      date: "10/02 - 14/02",
      revenue: "--",
    },
    {
      name: "Giáng Sinh An Lành",
      status: "ended",
      date: "20/12 - 26/12",
      revenue: "1.450.000.000đ",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1a2634] flex-1">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Chiến dịch gần đây
        </h3>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3 font-semibold">Tên chiến dịch</th>
              <th className="px-6 py-3 font-semibold">Trạng thái</th>
              <th className="px-6 py-3 font-semibold">Thời gian</th>
              <th className="px-6 py-3 font-semibold text-right">Doanh thu</th>
              <th className="px-6 py-3 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {campaigns.map((camp, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {camp.name}
                </td>
                <td className="px-6 py-4">
                  {camp.status === "running" && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Đang chạy
                    </span>
                  )}
                  {camp.status === "upcoming" && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Sắp diễn ra
                    </span>
                  )}
                  {camp.status === "draft" && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      Nháp
                    </span>
                  )}
                  {camp.status === "ended" && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                      Đã kết thúc
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{camp.date}</td>
                <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                  {camp.revenue}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      {camp.status === "ended" ? "visibility" : "edit"}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <button className="text-sm text-primary font-medium hover:underline">
          Xem tất cả 24 chiến dịch
        </button>
      </div>
    </div>
  );
}
