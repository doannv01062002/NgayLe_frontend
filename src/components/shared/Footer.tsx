"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#990c0c] text-white pt-12 pb-6 border-t-[4px] border-yellow-500">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-yellow-300">
                celebration
              </span>
              <span className="text-xl font-bold">ngayle.com</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Sứ mệnh của chúng tôi là mang đến niềm vui trọn vẹn trong mỗi dịp
              lễ tết truyền thống của người Việt thông qua những món quà ý nghĩa
              nhất.
            </p>
            <ul className="space-y-2 mt-2">
              <li>
                <Link
                  className="text-sm hover:text-yellow-300 hover:underline transition-all"
                  href="/about"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm hover:text-yellow-300 hover:underline transition-all"
                  href="/careers"
                >
                  Tuyển dụng nhân tài
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm hover:text-yellow-300 hover:underline transition-all"
                  href="/news"
                >
                  Tin tức ngayle.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white flex items-center gap-2"
                  href="/support"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    help
                  </span>
                  Trung tâm trợ giúp (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/privacy-policy"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/terms"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/regulations"
                >
                  Quy chế hoạt động
                </Link>
              </li>
            </ul>
            <div className="mt-2 pt-4 border-t border-white/10">
              <p className="text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-300">
                  call
                </span>
                Hotline: 1900 1234
              </p>
              <p className="text-sm text-white/80 mt-1 pl-6">
                Email: hotro@ngayle.com
              </p>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Dịch vụ &amp; Cộng đồng
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/gift-finder"
                >
                  Gợi ý quà tặng
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/blog"
                >
                  Blog / Cẩm nang lễ hội
                </Link>
              </li>
              {/* <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/affiliate"
                >
                  Tiếp thị liên kết (Affiliate)
                </Link>
              </li> */}
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/vouchers"
                >
                  Voucher Hub
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-white/80 hover:text-white"
                  href="/seller/register"
                >
                  Bán hàng cùng ngayle.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Kết nối với chúng tôi
            </h3>
            {/* Social Icons */}
            <div className="flex gap-3">
              <Link
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                href="#"
              >
                <span className="font-bold text-lg group-hover:text-blue-400">
                  f
                </span>
              </Link>
              <Link
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                href="#"
              >
                <span className="font-bold text-lg group-hover:text-pink-400">
                  In
                </span>
              </Link>
              <Link
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                href="#"
              >
                <span className="font-bold text-lg group-hover:text-red-500">
                  Y
                </span>
              </Link>
              <Link
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                href="#"
              >
                <span className="font-bold text-lg group-hover:text-black">
                  Tk
                </span>
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">
                Đăng ký nhận bản tin ưu đãi:
              </p>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="w-full h-10 px-3 rounded bg-white text-slate-800 border-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="Nhập email của bạn"
                  type="email"
                />
                <button className="h-10 w-full bg-black/30 hover:bg-black/50 text-white font-bold rounded uppercase text-xs tracking-wider transition-colors border border-white/10 cursor-pointer">
                  Nhận ưu đãi
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-white/60 text-center md:text-left">
            <p className="font-bold text-white mb-1">
              © 2024 Ngayle.com. Tất cả quyền được bảo lưu.
            </p>
            <p>Địa chỉ: Tòa nhà Bitexco, Số 2 Hải Triều, Q.1, TP.HCM</p>
            <p>Giấy phép kinh doanh số: 0101234567 do Sở KHĐT TP.HCM cấp.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              {/* Mock Payment Icons */}
              <div
                className="h-6 w-10 bg-white rounded flex items-center justify-center px-1"
                title="Visa"
              >
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqTKBgPry3tRM47XmWTn-USXz2FZF4KlXM7_W0PztVhnr5lB8991IBd_NCXTyyQ74hko9NwSo9evDntPb0IBohNlt-Ew2XAeoicJWw6B_LrkM48FtBa3mvuHFogEGERmSbTTHJSEs27112jzSCp0MjwvcFHBcFzqSEXMlQViWwzeQfwd-xWmYH53t7O7DWmsyuxxh0btoxZSMKV1ur_25Cj0Mj_WtGoay0sD7AWKqmFUGiACU7qEVEXD3FVRqIynV2k4nAuGVI-d8')",
                  }}
                ></div>
              </div>
              <div
                className="h-6 w-10 bg-white rounded flex items-center justify-center px-1"
                title="Mastercard"
              >
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAC-okFU1W7_O0kyxp2WU5VzQM5eBnmDYuXA0Mki_G8RUoOmHbPA1l-wk-RIzMSkGMXlvsE2nT1u1Ct9jLi6cvbhYGqEvqWuX_V9hsYVKaFcIEe1yE4HPceCHLVSWLBM3kuUVAEYG5LEn8xQkq72RjFOefteWH8jNAUf-x_C1cLIvSSNbfZMIUbW5F6S3tBuG2JtgZS4T2N_cKliYk7mw5cV9FdtK23wrSZgzZsJfalxlQTzvkX8YD1aNVO-iAqdjbwac1WjVa86gU')",
                  }}
                ></div>
              </div>
              <div
                className="h-6 w-10 bg-[#a50064] rounded flex items-center justify-center p-0.5"
                title="Momo"
              >
                <span className="text-[8px] font-bold text-white">MoMo</span>
              </div>
              <div
                className="h-6 w-10 bg-white rounded flex items-center justify-center px-1"
                title="COD"
              >
                <span className="text-[8px] font-bold text-slate-800">COD</span>
              </div>
            </div>
            {/* Mock Gov Logo */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Đã thông báo Bộ Công Thương"
                  className="w-full h-auto opacity-90 hover:opacity-100 cursor-pointer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-zRULvJW0nHvsAa3ebLDX0o9ZMrvAvjT212ll-macae4hIO5EQ-b2ZZhYA_htwtQLy04sg4yA51yXsgeIiyNrK1NvtIyHZPLbQJwaj3er6iRY0xqNnnuxTeXrzWLHapk8Vrw1fXZwmQ2pRo952OAt8sDku6ueopcJ_s8_bvMvf82albo98soeSeC5aPCbcrEoSFpXI7UAoYiWrA6CCICAsO2i7UtsMsnhQEgUlU8P8LAygEN3oOsOyGU8R7ah5P7IGWCbN6Qjfs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
