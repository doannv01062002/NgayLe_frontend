export function ChatContext() {
  return (
    <aside className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2632] hidden lg:flex flex-col shrink-0 overflow-y-auto custom-scrollbar h-full">
      {/* Shop Brief */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 text-center">
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-20 mx-auto mb-3 shadow-md border-2 border-white dark:border-gray-800"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCECFNV4OmIcwqkP--gig2qrYhFrIcsA2oKshssGSTUaiUC22zjYaFsYIWo2x-DBUakn_T8lxtB2tQSiIZnu_0rtGOSks4wdsgFkAK23kL4IuH7T9Cs6S7GaTmwFgivZ-kEbwhhyFWGhGvNa3Tpeck6F7BKIflWYw7Rs1_2EXKMyV0r0UwRpnGjmYbeTS1tkAP33S5zKtQKhbnsQXIj__AOsguAX7IMd2esc1EO_BSkJJT0ujO_mCfQwbHixrRf26sw8OPqu06Gtjw')",
          }}
        ></div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Shop Hoa Tươi Sài Gòn
        </h2>
        <div className="flex justify-center gap-4 mt-3">
          <div className="text-center">
            <p className="text-xs text-gray-500">Đánh giá</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-center gap-0.5">
              4.9
              <span className="material-symbols-outlined text-yellow-400 text-[14px]">
                star
              </span>
            </p>
          </div>
          <div className="w-[1px] bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Phản hồi</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              98%
            </p>
          </div>
          <div className="w-[1px] bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Người theo dõi</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              12k
            </p>
          </div>
        </div>
      </div>

      {/* Current Context (Order) */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Đơn hàng hiện tại
          </h4>
          <span className="text-xs font-medium text-primary cursor-pointer hover:underline">
            Xem tất cả
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-3 mb-3">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-md size-16 shrink-0 border border-gray-200 dark:border-gray-600"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApRT2Al8PqbwANKYMhzEbFf4cWRbPRF5kMFo80K4s4cClwo5_AWxxQZ_ul4VgkwGifnSd5rzalDab14aEWBYRnbIrv6Xn9i3ODrGRmdZx23vFMs7AsCrqy3yhY2KmuW3BMp_E3r5WbWJGeev2ZuiTc-XgVN8-NrkpZWEzLmnpPGjj3DNcsnsbTk0BP0pezxoH0kmJezcDg7iloB8txnhXCDFXVm3060hyGLZJ_UR7ws6f8OQVei_3rt9a766TqYGIS7zuyP3gxNgQ')",
              }}
            ></div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                Mã: #DH92831
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                Bó Hoa Hồng Sáp Thơm 99 Bông Cao Cấp
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500">Thành tiền:</span>
            <span className="text-sm font-bold text-primary">550.000đ</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500">Trạng thái:</span>
            <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
              Đang vận chuyển
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white text-xs font-medium py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Đánh giá
            </button>
            <button className="flex-1 bg-primary text-white text-xs font-medium py-2 rounded hover:bg-blue-600 transition-colors">
              Mua lại
            </button>
          </div>
        </div>
      </div>

      {/* FAQs / Shortcuts */}
      <div className="p-4 pt-0">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
          Thao tác nhanh
        </h4>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  report
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Tố cáo Shop
              </span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[16px] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  inventory_2
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Yêu cầu Trả hàng
              </span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[16px] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Footer Promo */}
      <div className="mt-auto p-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-medium opacity-90">Sự kiện Sắp tới</p>
            <p className="font-bold text-sm mt-1">Siêu Sale 8/3</p>
            <p className="text-xs mt-2 opacity-90">
              Săn deal quà tặng cho phái đẹp!
            </p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-[64px] opacity-20 rotate-12">
            redeem
          </span>
        </div>
      </div>
    </aside>
  );
}
