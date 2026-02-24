export function TransactionTable() {
  const transactions = [
    {
      id: "#TRX-8829",
      type: "Thanh toán đơn hàng",
      status: "Thành công",
      statusColor: "green",
      amount: "+ 550.000 ₫",
      amountColor: "green",
      time: "10:30 14/05",
    },
    {
      id: "#TRX-8828",
      type: "Thanh toán đơn hàng",
      status: "Thành công",
      statusColor: "green",
      amount: "+ 1.200.000 ₫",
      amountColor: "green",
      time: "09:15 14/05",
    },
    {
      id: "#WD-9921",
      type: "Rút tiền về NH",
      status: "Đang xử lý",
      statusColor: "orange",
      amount: "- 5.000.000 ₫",
      amountColor: "default",
      time: "18:00 13/05",
    },
    {
      id: "#TRX-8820",
      type: "Hoàn tiền đơn hàng",
      status: "Đã hoàn tất",
      statusColor: "gray",
      amount: "- 250.000 ₫",
      amountColor: "gray",
      time: "14:20 12/05",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Giao dịch gần đây
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-gray-400 text-[20px]">
              search
            </span>
            <input
              className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 w-48"
              placeholder="Tìm mã đơn hàng..."
              type="text"
            />
          </div>
          <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4">Mã GD</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Số tiền</th>
              <th className="px-6 py-4 text-right">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {transactions.map((trx, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {trx.id}
                </td>
                <td className="px-6 py-4">{trx.type}</td>
                <td className="px-6 py-4">
                  {trx.statusColor === "green" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      {trx.status}
                    </span>
                  )}
                  {trx.statusColor === "orange" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                      <span className="size-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                      {trx.status}
                    </span>
                  )}
                  {trx.statusColor === "gray" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      <span className="size-1.5 rounded-full bg-gray-500"></span>
                      {trx.status}
                    </span>
                  )}
                </td>
                <td
                  className={`px-6 py-4 text-right font-medium ${
                    trx.amountColor === "green"
                      ? "text-green-600 dark:text-green-400"
                      : trx.amountColor === "gray"
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {trx.amount}
                </td>
                <td className="px-6 py-4 text-right text-gray-400">
                  {trx.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
        <button className="text-sm font-medium text-primary hover:text-blue-700 transition-colors">
          Xem tất cả giao dịch
        </button>
      </div>
    </div>
  );
}
