import { FinanceStats } from "@/features/seller/finance/FinanceStats";
import { FinanceChart } from "@/features/seller/finance/FinanceChart";
import { TransactionTable } from "@/features/seller/finance/TransactionTable";
import { BankAccounts } from "@/features/seller/finance/BankAccounts";
import { WithdrawLimit } from "@/features/seller/finance/WithdrawLimit";

export default function SellerFinancePage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Page Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Tổng quan Tài chính
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Quản lý dòng tiền, số dư và lịch sử giao dịch của shop.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center h-10 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2632] hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold transition-all">
              <span className="material-symbols-outlined mr-2 text-[20px]">
                history
              </span>
              Lịch sử rút tiền
            </button>
            <button className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 text-sm font-bold transition-all">
              <span className="material-symbols-outlined mr-2 text-[20px]">
                account_balance_wallet
              </span>
              Rút tiền về tài khoản
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <FinanceStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart & Transactions (Left 2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FinanceChart />
            <TransactionTable />
          </div>
          {/* Right Column: Bank Accounts & Tools (1/3) */}
          <div className="flex flex-col gap-6">
            <BankAccounts />
            <WithdrawLimit />
          </div>
        </div>
      </div>
    </>
  );
}
