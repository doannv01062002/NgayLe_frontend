export function OrderList() {
  return (
    <div className="flex flex-col gap-4">
      {/* Order Item 1: Completed */}
      <div className="bg-white dark:bg-[#2d1b1b] rounded-lg shadow-sm p-4 lg:p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Shop Quà Tết Hà Nội
            </span>
            <button className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-2">
              Yêu thích
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded ml-1">
              <span className="material-symbols-outlined text-[16px] block">
                chat
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 flex items-center gap-1 text-sm uppercase font-medium">
              <span className="material-symbols-outlined text-[18px]">
                local_shipping
              </span>
              Giao hàng thành công
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-primary font-medium uppercase text-sm">
              Hoàn thành
            </span>
          </div>
        </div>
        {/* Product 1 */}
        <div className="flex gap-4 pb-4 border-b border-gray-50 dark:border-gray-800">
          <div className="size-20 shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Hộp quà Tết sum vầy"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGi4OOmkDdmo4GQZmNe9me77FPwjENj_k5y0NRSYBgHuorZ-nAM6H5e97iknK78-S4i_toGLqYeypuCEcSt7m0caPpPC3f9L04kTpEsOmrwImofaDR3K-LdYgWD7Ar8j5KPyzWDWk0aQmfvqwpuQp5CMFRmUyE-u97jBK-8DxAZXsD3LjwGTX_y0l2skyaz8MPezc9jB_go1KxyaIAC1xLO6XZbcbcPHhrmp9HRBYAlWvv_2_kys8-RV2kgPIJDXlWevZih2p7sa0"
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white line-clamp-2">
                Hộp quà Tết Sum Vầy 2024 - Rượu vang &amp; Bánh kẹo cao cấp
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Phân loại: Hộp Đỏ - Size L
              </p>
              <p className="text-sm text-gray-500">x1</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 line-through">850.000₫</p>
              <p className="text-base font-bold text-primary">650.000₫</p>
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="py-4 flex justify-end items-center gap-2 border-b border-gray-50 dark:border-gray-800 bg-[#fffcfc] dark:bg-[#331f1f] -mx-4 lg:-mx-6 px-4 lg:px-6">
          <span className="material-symbols-outlined text-primary text-[20px]">
            verified_user
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thành tiền:
          </p>
          <p className="text-xl font-bold text-primary">650.000₫</p>
        </div>
        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap justify-end gap-3">
          <button className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
            Liên hệ Người bán
          </button>
          <button className="px-6 py-2 rounded bg-primary text-white hover:bg-[#b00e0e] text-sm font-bold shadow-sm transition-colors">
            Mua lại
          </button>
        </div>
      </div>

      {/* Order Item 2: Delivering */}
      <div className="bg-white dark:bg-[#2d1b1b] rounded-lg shadow-sm p-4 lg:p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Shop Đồ Trang Trí Noel
            </span>
            <button className="p-1 text-gray-400 hover:text-gray-600 border border-gray-200 rounded ml-1">
              <span className="material-symbols-outlined text-[16px] block">
                storefront
              </span>
            </button>
          </div>
          <span className="text-orange-500 font-medium uppercase text-sm">
            Đang vận chuyển
          </span>
        </div>
        {/* Product 2 */}
        <div className="flex gap-4 pb-4 border-b border-gray-50 dark:border-gray-800">
          <div className="size-20 shrink-0 bg-gray-100 rounded overflow-hidden border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Cây thông Noel mini"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6ajs5QT_HCFiM4aaOfqukBLaYvt99vsJi7fmgX3BKOH3N7ENFwe2T1uLW6MGfWsSrhSXvfT99NUegL7EK8B-crCpW5tFKQBnU5E_Up9CoYVU451mzolyvQY_fl1JYI7aCN65cxhAw7U1aIQBFaclhbXsFjH1pDG5_1gjU3l--E6rLPaRlov0ri6oQqvZDRLgjgWQT4ue7_B0oyakWunVuw9SzYVP0qpeot0lWIxa7fYljXuVNxcT1DNVLiZNoLKnv1p0PYTcSx4"
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white line-clamp-2">
                Cây thông Noel mini để bàn có đèn LED, trang trí văn phòng
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Phân loại: Cây 60cm + Full phụ kiện
              </p>
              <p className="text-sm text-gray-500">x2</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-primary">250.000₫</p>
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="py-4 flex justify-end items-center gap-2 border-b border-gray-50 dark:border-gray-800 bg-[#fffcfc] dark:bg-[#331f1f] -mx-4 lg:-mx-6 px-4 lg:px-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thành tiền:
          </p>
          <p className="text-xl font-bold text-primary">500.000₫</p>
        </div>
        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap justify-end gap-3">
          <button className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
            Xem chi tiết đơn hàng
          </button>
          <button
            className="px-6 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed text-sm font-bold"
            disabled
          >
            Đã nhận được hàng
          </button>
        </div>
      </div>
    </div>
  );
}
