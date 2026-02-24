export function CheckoutProducts() {
  return (
    <section className="bg-white dark:bg-[#1a0a0a] rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 pb-0 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4">Sản phẩm</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-100 dark:border-gray-800">
              <th className="px-6 py-4 font-normal w-[50%]">Sản phẩm</th>
              <th className="px-6 py-4 font-normal text-center">Đơn giá</th>
              <th className="px-6 py-4 font-normal text-center">Số lượng</th>
              <th className="px-6 py-4 font-normal text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Item 1 */}
            <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded border border-gray-200 bg-gray-50 shrink-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwkVPPjHb3BrHfoQdnAMSiPTHkjwzJTJmnfCFI3XU2PKjRXmHRDLOA1P42ejoZLWIYnRYqB0V5Z_PtpibcyeFsmaBISZqwWXMBu50Z7ZZWDi3n9c8ANGg0cHgNIwHLLWwISuKgDYbAf-mbklG6Skvhe3l_izG9Jblo-Uit_rLhN-hnczUwGVGsi0WWAkdFgQiGOXoHpkJ0_d-C3bKMzzo-nrk7LlG-Nh0qESZ0FUsFb8iqqHfVUmov9nymzXs4sPQVisobwyRjQy8')",
                    }}
                  ></div>
                  <div>
                    <p className="font-medium line-clamp-2">
                      Hộp Quà Tết Như Ý 2024 - Phiên Bản Đặc Biệt Giới Hạn
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Phân loại: Cao cấp
                    </p>
                    <p className="text-primary text-xs border border-primary/30 bg-primary/5 w-fit px-1 mt-1 rounded">
                      Đổi trả miễn phí 15 ngày
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">500.000đ</td>
              <td className="px-6 py-4 text-center">1</td>
              <td className="px-6 py-4 text-right font-medium">500.000đ</td>
            </tr>
            {/* Item 2 */}
            <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border-t border-gray-100 dark:border-gray-800">
              <td className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded border border-gray-200 bg-gray-50 shrink-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjWrcJTOaXDcJhDNOujzAcGsOhYtGkR2MJVI9xoQwXtFaNd9ZYeD8wsFaIC2FIS0RdOZ4HhuUCaRrJg8y6wIER8DlJN6hC7gUssSz55zMEntXPvH7BIThRNonQaeuMYW7-Zk5XbRdt8yhJdVyt_TuvdVOWXGS_0O1uKQpqn73IDDvmGnnhpyAMw08Zc8r3ptN7QQwrb9iCzL5AKkbTJCMViUjw5g5QnjK1x4SI-pHZEeEubYzjb4NYZeP4boYG28H0-AAQjMGTRZg')",
                    }}
                  ></div>
                  <div>
                    <p className="font-medium line-clamp-2">
                      Set 10 Bao Lì Xì Rồng Vàng May Mắn 2024
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Phân loại: Combo 10 cái
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">20.000đ</td>
              <td className="px-6 py-4 text-center">5</td>
              <td className="px-6 py-4 text-right font-medium">100.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Shop Voucher Input */}
      <div className="px-6 py-4 border-t border-dashed border-gray-200 dark:border-gray-700 bg-[#fcfbfb] dark:bg-[#1f1515] flex items-center justify-end gap-4">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-xl">
            confirmation_number
          </span>
          <span className="text-sm font-medium">ngayle Voucher</span>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Chọn hoặc nhập mã
        </button>
      </div>
    </section>
  );
}
