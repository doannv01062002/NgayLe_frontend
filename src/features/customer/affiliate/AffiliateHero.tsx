export function AffiliateHero() {
  return (
    <div className="relative flex flex-col w-full py-5 bg-white dark:bg-[#1a202c]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-10">
        <div className="flex flex-col gap-6 py-10 lg:flex-row items-center">
          <div
            className="w-full lg:w-1/2 aspect-video bg-cover bg-center rounded-xl overflow-hidden shadow-lg relative group"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdn8YVeGot9V3Gaqqx8QTgvK9CDUYKMseR84wsyFAgizBqc7dsDHHKDE0BenfbB1FQ5K2rlpmxTDYorrY3eMQ8BEpiYvOB3wGHf3LchXv5NrwKtYMYNLTWiaknh5XKobVbR6gM6IOCqZ_YsGrZyOhyqE07F7NXa1GK4Aocw3PAczSOmyVIf7GqGlRCrqqxQrvK2pBQBMzLRq92SYiDY9eYdTxaB75kjcioUkg215IVN8qwnBVDuevMSecsckElGEx2eILhlOae-sM')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-1/2 lg:pl-10">
            <div className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-primary">
                <span className="material-symbols-outlined text-[16px]">
                  trending_up
                </span>
                <span>Chương trình Đối tác 2024</span>
              </div>
              <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                Hợp tác cùng NgayLe.com: Biến traffic thành thu nhập
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Tham gia mạng lưới tiếp thị liên kết hàng đầu Việt Nam chuyên về
                quà tặng lễ hội (Tết, Valentine, Trung Thu). Nhận hoa hồng lên
                đến
                <span className="text-primary font-bold mx-1">20%</span> cho mỗi
                đơn hàng thành công.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-md shadow-blue-500/20 transition-all">
                Tham gia ngay
              </button>
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-base font-bold transition-all">
                Tìm hiểu thêm
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-2">
              <div className="flex -space-x-2">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQUrg2n9dKu4pHsHjzM_0Ud1_SP5dX-llaZVPt7At4Cia0UEGUjmlC4krRQou8aH-fwAqAvka1GJe4wTST_vvzURthQ3q8I3N-uL0LA74S4_mQ6ng_AwQNcYLBulRpmBYZm_t3yfFuo4obyfpF3TPnOeCNxY2DvLQ_PrKlkbQFYh1j3Fjy6YoFumvTQuE4zXCvEnCY3mSasD-a8AuOPEaaK93OVX1o4wnZ14V6JAwYojfUH97-Eg3Fbe5-a32rTzleFC2H3z6sYX8",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Kh9vb1pIb6XfSZ8i4a5OH2IzJEVAc4wcF2vK3nrIsfdwaBYCUIoHpx9o2rLa3BYBQ4cKMX3eDE8wtc51xL0orGCIdxv1X5OT6SwGz4u8-b2s94E7EhaKWoYkuqKfqFoDvHn2XP8unKLhyff8jKH5f0uJzXAKmMsgeyPgBdgSM0wnFZikhItSZfG0RkmXmti2yEVaQ15cCkgxOZEtpeaOCn_s5La8kefExVC0ERxysQkGen3La3PZCfTz9WJQiUAYrj75K1UKWdY",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAc6MT-9S1UItsWoAviv20XeZU8I1Wgxxki0I82M5UvvCGWA1yDi3o1mr5u5zHToey_BoAGap8ltmTkDQ8pXneJla7PYzzAATeysRUJExBThNbwhuo_m4Nq7TfIXOpns0SQBdFgf1xzY0OGDUb-7mpUWsQn29h5R48JepUBmjyhPvJCXOqta8X4NDAnKvAqGTimePm7W558QghV6oV12vLuakQK_ELv_YiVLOQnA5Pc2Ji5OIDCaSJTL-dWxw124sJ3XKco112EKx0",
                ].map((src, i) => (
                  <img
                    key={i}
                    alt="Partner Avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover"
                    src={src}
                  />
                ))}
              </div>
              <span>Hơn 10,000+ đối tác đã tham gia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
