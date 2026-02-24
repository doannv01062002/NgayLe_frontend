export function AffiliateCommissionTable() {
  const categories = [
    {
      icon: "card_giftcard",
      name: "Quà tặng Tết & Lễ hội",
      rate: "12% - 20%",
      cookie: 30,
      note: "Áp dụng cho các set quà gói sẵn",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: "favorite",
      name: "Quà Valentine / 8-3",
      rate: "15%",
      cookie: 30,
      note: "Bao gồm hoa và chocolate",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: "celebration",
      name: "Đồ trang trí (Noel, Tết)",
      rate: "8%",
      cookie: 30,
      note: "Cây thông, dây đèn, đồ treo",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: "local_drink",
      name: "Thực phẩm & Đồ uống",
      rate: "5%",
      cookie: 15,
      note: "Rượu, bánh kẹo bán lẻ",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="w-full py-16">
      <div className="flex justify-center">
        <div className="flex flex-col max-w-[1280px] w-full px-4 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-gray-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">
                Bảng tỷ lệ hoa hồng hấp dẫn
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Mức hoa hồng cạnh tranh nhất thị trường quà tặng dịp lễ
              </p>
            </div>
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              Xem chi tiết chính sách
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-bold" scope="col">
                      Danh mục ngành hàng
                    </th>
                    <th className="px-6 py-4 font-bold text-center" scope="col">
                      Tỷ lệ hoa hồng
                    </th>
                    <th className="px-6 py-4 font-bold text-center" scope="col">
                      Cookie (Ngày)
                    </th>
                    <th className="px-6 py-4 font-bold" scope="col">
                      Ghi chú
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-background-dark">
                  {categories.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded ${item.bgColor} flex items-center justify-center ${item.textColor}`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {item.icon}
                          </span>
                        </div>
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-primary text-base">
                        {item.rate}
                      </td>
                      <td className="px-6 py-4 text-center">{item.cookie}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
