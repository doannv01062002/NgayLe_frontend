import Link from "next/link";

export function AuthHeader({ title = "Đăng nhập" }: { title?: string }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e7] px-4 py-4 md:px-10 lg:px-40 bg-white">
      <div className="flex items-center gap-4 text-primary">
        <Link href="/" className="size-8 text-primary">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
        <Link
          href="/"
          className="text-primary text-2xl font-bold leading-tight tracking-[-0.015em]"
        >
          Ngayle.com
        </Link>
        <div className="hidden md:flex text-xl text-[#1b0d0d] font-medium ml-2 border-l border-gray-300 pl-4 h-6 items-center">
          {title}
        </div>
      </div>
      <Link
        className="text-primary text-sm font-bold leading-normal hover:underline"
        href="/support"
      >
        Cần trợ giúp?
      </Link>
    </header>
  );
}

export function AuthFooter() {
  return (
    <footer className="bg-white border-t border-[#f3e7e7] py-6 px-4">
      <div className="container mx-auto max-w-[960px] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9a4c4c]">
        <p>© 2024 Ngayle.com. Tất cả các quyền được bảo lưu.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              language
            </span>
            <span>Tiếng Việt</span>
          </div>
          <Link
            href="/support"
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              help
            </span>
            <span>Trung tâm trợ giúp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
