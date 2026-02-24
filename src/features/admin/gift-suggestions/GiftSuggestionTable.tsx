export function GiftSuggestionTable() {
  const rules = [
    {
      id: 1,
      name: "Valentine Bạn Gái",
      updatedAt: "2 giờ trước",
      conditions: [
        { type: "target", value: "Bạn gái", color: "pink" },
        { type: "budget", value: "< 500k", color: "blue" },
        { type: "style", value: "Lãng mạn", color: "gray" },
      ],
      outputs: [
        { icon: "category", text: "Gấu bông, Son môi" },
        { description: "Top 20 sản phẩm bán chạy" },
      ],
      priority: "Cao",
      status: "active",
    },
    {
      id: 2,
      name: "Quà tặng Mẹ 8/3",
      updatedAt: "1 ngày trước",
      conditions: [
        { type: "target", value: "Mẹ / Bà", color: "purple" },
        { type: "occasion", value: "Quốc tế Phụ nữ", color: "red" },
      ],
      outputs: [{ icon: "category", text: "Thực phẩm CN, Khăn lụa" }],
      priority: "Trung bình",
      status: "active",
    },
    {
      id: 3,
      name: "Sinh nhật Sếp Nam (DRAFT)",
      updatedAt: "Tạo bởi: Admin User",
      conditions: [
        { type: "target", value: "Sếp / Đồng nghiệp", color: "gray" },
        { type: "gender", value: "Nam", color: "gray" },
      ],
      outputs: [{ icon: "category", text: "Bút ký, Cà vạt" }],
      priority: "Thấp",
      status: "draft",
    },
    {
      id: 4,
      name: "Kỷ niệm Ngày cưới",
      updatedAt: "3 ngày trước",
      conditions: [
        { type: "target", value: "Vợ / Chồng", color: "amber" },
        { type: "budget", value: "> 1 triệu", color: "blue" },
      ],
      outputs: [{ icon: "category", text: "Trang sức, Nước hoa" }],
      priority: "Cao",
      status: "active",
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "pink":
        return "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800";
      case "blue":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      case "red":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "amber":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2634] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col flex-1 min-h-[500px]">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 px-6 pt-4 gap-8">
        <button className="pb-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary text-sm font-bold transition-colors">
          Tiêu chí đầu vào
        </button>
        <button className="pb-3 border-b-2 border-primary text-primary text-sm font-bold transition-colors">
          Bộ quy tắc (Rules Engine)
        </button>
        <button className="pb-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary text-sm font-bold transition-colors">
          Gợi ý mặc định
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 flex-1 max-w-lg relative">
          <span className="material-symbols-outlined absolute left-3 text-gray-400">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Tìm kiếm bộ quy tắc, dịp lễ..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Lọc:
            </label>
            <select className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary">
              <option>Tất cả trạng thái</option>
              <option>Đang chạy (Active)</option>
              <option>Tạm dừng (Inactive)</option>
            </select>
          </div>
          <button
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Settings"
          >
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      {/* Rules Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
              <th className="px-6 py-4 w-12 text-center">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer"
                  type="checkbox"
                />
              </th>
              <th className="px-6 py-4 min-w-[200px]">Tên Quy tắc</th>
              <th className="px-6 py-4 min-w-[300px]">Điều kiện (Logic)</th>
              <th className="px-6 py-4 min-w-[200px]">Hành động (Output)</th>
              <th className="px-6 py-4">Độ ưu tiên</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Tác vụ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {rules.map((rule) => (
              <tr
                key={rule.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                  rule.status === "draft"
                    ? "bg-gray-50/50 dark:bg-gray-800/30"
                    : ""
                }`}
              >
                <td className="px-6 py-4 text-center">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary/20 cursor-pointer"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <p
                    className={`font-bold ${
                      rule.status === "draft"
                        ? "text-gray-600 dark:text-gray-300"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {rule.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {rule.status === "draft"
                      ? rule.updatedAt
                      : `Cập nhật: ${rule.updatedAt}`}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`flex flex-wrap gap-2 items-center ${
                      rule.status === "draft" ? "opacity-60" : ""
                    }`}
                  >
                    {rule.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getColorClass(
                            condition.color
                          )}`}
                        >
                          {condition.value}
                        </span>
                        {index < rule.conditions.length - 1 && (
                          <span className="text-gray-400 text-xs font-bold ml-2">
                            +
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 ${
                    rule.status === "draft" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {rule.outputs.map((output, index) => (
                      <div key={index}>
                        {output.icon ? (
                          <span className="text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-gray-400">
                              {output.icon}
                            </span>
                            {output.text}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                            {output.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 ${
                    rule.status === "draft" ? "opacity-60" : ""
                  }`}
                >
                  <span
                    className={`font-bold ${
                      rule.status === "draft"
                        ? "text-gray-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {rule.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {rule.status === "active" ? (
                      <>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium text-xs bg-emerald-100 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                          Đang chạy
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-400"></span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600">
                          Nháp
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded text-gray-500 hover:text-primary transition-colors shadow-sm"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded text-gray-500 hover:text-red-500 transition-colors shadow-sm"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hiển thị{" "}
          <span className="font-bold text-gray-900 dark:text-white">1-4</span>{" "}
          trong{" "}
          <span className="font-bold text-gray-900 dark:text-white">12</span>{" "}
          kết quả
        </p>
        <div className="flex items-center gap-2">
          <button
            className="h-8 w-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            disabled
          >
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
