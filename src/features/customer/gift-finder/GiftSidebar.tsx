export function GiftSidebar() {
  return (
    <aside className="hidden w-64 flex-col gap-6 lg:flex">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#1e1425]">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-700">
          <span className="material-symbols-outlined text-primary">tune</span>
          <h3 className="font-bold text-slate-900 dark:text-white">Bộ lọc</h3>
        </div>
        {/* Filter Group: Categories */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Danh mục
          </h4>
          {["Thời trang", "Công nghệ", "Mỹ phẩm", "Sách & VPP"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              <input
                className="rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-800"
                type="checkbox"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Filter Group: Ratings */}
        <div className="flex flex-col gap-2 pt-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Đánh giá
          </h4>
          <div className="flex flex-col gap-1">
            <label className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-slate-50 dark:hover:bg-slate-800">
              <input
                className="text-primary focus:ring-primary"
                name="rating"
                type="radio"
              />
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[18px] fill-current"
                  >
                    star
                  </span>
                ))}
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-slate-50 dark:hover:bg-slate-800">
              <input
                className="text-primary focus:ring-primary"
                name="rating"
                type="radio"
              />
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[18px] fill-current"
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-[18px] text-slate-300 dark:text-slate-600">
                  star
                </span>
              </div>
              <span className="text-xs text-slate-500">Trở lên</span>
            </label>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-5 text-white shadow-lg">
        <h3 className="mb-2 text-lg font-bold">Siêu Sale 20/11</h3>
        <p className="mb-4 text-sm opacity-90">
          Giảm đến 50% cho các set quà tặng thầy cô.
        </p>
        <button className="w-full rounded-lg bg-white py-2 text-sm font-bold text-red-600 shadow-sm hover:bg-slate-50">
          Xem ngay
        </button>
      </div>
    </aside>
  );
}
