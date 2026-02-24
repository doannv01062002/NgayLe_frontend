export function AccountHeaderSimple() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#d41111] to-[#f01d1d] shadow-md dark:from-[#8a0b0b] dark:to-[#5e0808]">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex items-center justify-between py-3 gap-6">
          {/* Logo */}
          <a className="flex items-center gap-2 text-white shrink-0" href="/">
            <div className="size-8 bg-white rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined filled">
                shopping_bag
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Ngayle.com
            </h1>
          </a>
          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-4 hidden md:block">
            <div className="relative flex w-full bg-white rounded-lg shadow-sm overflow-hidden group focus-within:ring-2 ring-white/30">
              <input
                className="w-full h-10 px-4 text-sm text-gray-800 placeholder-gray-400 border-none outline-none focus:ring-0"
                placeholder="Tìm kiếm sản phẩm dịp lễ, Tết, quà tặng..."
                type="text"
              />
              <button className="bg-black/10 hover:bg-black/20 text-[#b00e0e] px-5 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-gray-600">
                  search
                </span>
              </button>
            </div>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-6 text-white shrink-0">
            {/* Notifications */}
            <a
              className="flex flex-col items-center gap-0.5 group opacity-90 hover:opacity-100"
              href="#"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[26px]">
                  notifications
                </span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-red-700">
                  3
                </span>
              </div>
              <span className="text-xs font-medium">Thông báo</span>
            </a>
            {/* Help */}
            <a
              className="flex flex-col items-center gap-0.5 group opacity-90 hover:opacity-100 hidden sm:flex"
              href="#"
            >
              <span className="material-symbols-outlined text-[26px]">
                help
              </span>
              <span className="text-xs font-medium">Hỗ trợ</span>
            </a>
            {/* User Dropdown (Simplified) */}
            <a className="flex items-center gap-2 pl-2" href="#">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div
                className="size-9 rounded-full bg-white/20 border-2 border-white/30 bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNc9smH6uEgQmRzNc_3t7H2n3-zAq-C3slENTUCyh4RpbmoIHrR97QQb5cTjhO1pgbv_2uAavK9ZyJ-bYaRxF6dT_AeclaaadMshUqBkFrRhWxpZE6H0W7USK3MS7I-Q58eKOmzirhB7YbFdnVtzofPUgSOwzO-7Tzl3AkWRZCss2Jy2ksYx4IXHolbtJmr_ceHeBUC_aP0i1Q0CJBTfLPygnGHD_a0JX-7zG1ZhIPl2_48b7g-FcbEv6OfKoXsLGPb1o00AAmJNk')",
                }}
              ></div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-bold leading-none">Minh Anh</span>
                <span className="text-[11px] opacity-80">Thành viên Vàng</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
