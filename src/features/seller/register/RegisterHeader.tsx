export function RegisterHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-[#3a1c1c] bg-white dark:bg-[#2a1414] shadow-sm">
      <div className="px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-2xl">
              storefront
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
              Ngayle.com
            </h1>
            <p className="text-xs font-medium text-primary mt-0.5">
              Kênh Người Bán
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Trung tâm hỗ trợ</span>
          </button>
          <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold hidden sm:block text-gray-900 dark:text-white">
              Shop Mới
            </span>
            <div
              className="size-9 rounded-full bg-gray-200 bg-center bg-cover border-2 border-white dark:border-gray-700 shadow-sm"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgxkTjJKNjYx_aTY_A8Q8Xun-ze5sgu-iUjs5MF7X6NDzPB67j7A1BgYQkYN9SbyU-ce2cEZOojHTah9eNYAaJHH7h19FAqS5VrW-5kk9o2M_IrEcdYPGfChAaCkAMQJk0VU-nWRUqdwEBAtPhF7et-_7IfBW1tgY6ihCnkDEBRgV8Ctc5EbBHsvvSyvwoOwRZaHyrgn6FaLSul2_jxC9P_ORTkLOSTiwr1AM6wf1u55d_L6fDiBcqP9737gJlu8dQF2BDPDqCAng')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
