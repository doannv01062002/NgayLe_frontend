export function ChatDetails() {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto hidden xl:block dark:bg-[#1a2634] dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-bold text-gray-900 mb-4 dark:text-white">
          Thông tin đơn hàng
        </h3>
        {/* Order Card */}
        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-primary">
              #ORD-992381
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium dark:bg-yellow-900/30 dark:text-yellow-400">
              Đang xử lý
            </span>
          </div>
          <div className="flex gap-3 mb-2">
            <div
              className="size-12 bg-white rounded border border-gray-200 bg-center bg-cover flex-shrink-0 dark:bg-gray-900 dark:border-gray-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCb6lHKHJy-HD6lcJjaMpqy5WYPr9xpZlpl5zSu85MYXnh_BRl7kZj3sZ4GKPHYAhfifbvJ6oGMGUUWsgywsTUt6BhFMxxxIUDSrp54N02zBBi66dQM2_Inl6tzFXbNdWSX00lynj5YDqg6g-7koURYk4KqEbNcRQ9CoDmo0nwbbOo6YgFcd7SHXmQuxLVzn28JP-dbtTMapz87Vasl50mr2z4Y5dhmRBe6mxAE4fg5Q2D7Z3MMM-ia1MJ-CjUjjfTZeIOPUr6w8s')",
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-gray-900 line-clamp-2 dark:text-white">
                Hộp Quà Tết Cao Cấp - Các loại hạt dinh dưỡng
              </p>
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                x1 • 450.000đ
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Tổng cộng:
            </span>
            <span className="text-sm font-bold text-red-600">485.000đ</span>
          </div>
        </div>
        <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
          Xem chi tiết đơn hàng
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 mb-3 dark:text-white">
          Thông tin khách hàng
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-200 dark:border-gray-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgdEncXGtHwQNljt911wKxbjtce9ogpMxyxIMViVjXfYK7meqlAwZ6SMV7mSZ6ZXzhySEjHtoCHPgHw2pkPRTMG2oNeyfdDkK0T8EIY2_VzGo5JDh1R1kOzeV3OpZrv0gPda-xRJBNLkSO_spJUJXyAED5FjUhuWH2K9m0mm6gwwlMxe7tW-NWjkW3UiyYGiFyNYSMrfAsZUSZySNjP5C4p8HmuWvxJvuS9j-HafKaJNZTrPJZmkHToLDnOkiyQQMxd8_u6XJewvo')",
            }}
          ></div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Minh Hiếu
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Thành viên Bạc
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">
              call
            </span>
            <span className="text-gray-900 flex-1 dark:text-white">
              0912 *** 789
              <button className="text-primary text-xs ml-1 hover:underline">
                Hiện
              </button>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">
              location_on
            </span>
            <span className="text-gray-900 flex-1 line-clamp-2 dark:text-white">
              123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
            </span>
          </div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">
              mail
            </span>
            <span className="text-gray-900 flex-1 dark:text-white">
              hieu.nguyen@example.com
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3 dark:text-white">
          Hành động nhanh
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-1 dark:border-gray-700 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
              currency_exchange
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Hoàn tiền
            </span>
          </button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-1 dark:border-gray-700 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
              block
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Chặn Chat
            </span>
          </button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-1 dark:border-gray-700 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
              airplane_ticket
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Tạo Ticket
            </span>
          </button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-1 dark:border-gray-700 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
              history
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Lịch sử
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
