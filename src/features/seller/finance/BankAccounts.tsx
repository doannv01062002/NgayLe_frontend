export function BankAccounts() {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Tài khoản ngân hàng
        </h3>
        <button className="text-xs font-bold text-primary hover:text-blue-700 bg-primary/10 px-2 py-1 rounded">
          Thêm mới
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {/* Account 1 */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-all bg-gray-50 dark:bg-gray-800/50">
          <div className="size-10 rounded-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center p-2">
            <div className="w-full h-full bg-green-600 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
              VCB
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Vietcombank
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              **** 8821 - NGUYEN VAN AN
            </p>
          </div>
          <span className="material-symbols-outlined text-green-500 text-[20px]">
            check_circle
          </span>
        </div>
        {/* Account 2 */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-all">
          <div className="size-10 rounded-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center p-2">
            <div className="w-full h-full bg-red-600 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
              TCB
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Techcombank
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              **** 9901 - NGUYEN VAN AN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
