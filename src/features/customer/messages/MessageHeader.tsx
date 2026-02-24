import Link from "next/link";

export function MessageHeader() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2632] px-6 py-3 shrink-0 z-20 h-16">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-4 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
        >
          <div className="size-8 flex items-center justify-center bg-red-600 rounded-lg text-white">
            <span className="material-symbols-outlined">shopping_bag</span>
          </div>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            ngayle.com | Trung tâm tin nhắn
          </h2>
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <div className="hidden md:flex items-center gap-6">
          <Link
            className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal"
            href="/"
          >
            Trang chủ
          </Link>
          <a
            className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal flex items-center gap-1"
            href="#"
          >
            Thông báo
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              3
            </span>
          </a>
          <a
            className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal"
            href="#"
          >
            Hỗ trợ
          </a>
        </div>
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-lg size-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              settings
            </span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-gray-200"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHl7VlVcNVSJA8jxBDBaBiSqSxoTUI_iP-GRCmBqUAm4irVvKlAec-rOr350Zc9UC8mkz97rTZIGQiRRfXhrBh1UB0qzI4ruPmOsm0-IBMtELDtro3Genlqp45-_oZ5hHVShmULy6C5j_jTOfsOXFBsB6jzG3sejsh2rIYMNbLn1bjCJq25MaXid6DPSZkUn2AiYzME3w4VL28IhJ0FxyAF8GvHXn3Bw2iSuZUo85PCu_0JEvdB9IsGxIB9c53aki_l7POGsd5YyE')",
              }}
            ></div>
            <span className="text-sm font-medium hidden lg:block text-gray-900 dark:text-white">
              Nguyễn Văn A
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
