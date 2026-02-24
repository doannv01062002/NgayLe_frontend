"use client";

import Link from "next/link";

export function AboutHero() {
  const scrollToStory = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const element = document.getElementById("our-story-section");
    if (!element) return;

    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      window.innerHeight / 2 +
      element.clientHeight / 2;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds for a slower scroll
    let start: number | null = null;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  return (
    <>
      <section className="relative bg-white dark:bg-[#1a202c]">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUAWijq9wXx9nZwkeKYypmVKTvuBZCL0BX-zOI0AP20rHWsW4bswRZPzgTC5qioao6VtMIPcQKv2PijC8j_ujB6nNDUZswmPacVaA0nxbRiMGalOChE2jABnk7jrIje_2u_I1HK14UvEXuuUSCXoF5rT3XhrFaQOxfaUn3iSTa4vOrWCM09T52XWWS-M33HhJ6mCb1C03R83ezliG-YWNeIsXkrUeO8mePYHTH53DrlgmKT1xcDuDde8sBwLRDdHTP_fSwCsYSFQ0')",
            }}
          ></div>
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Kết nối cảm xúc qua từng món quà
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-100 mb-10 font-medium">
            ngayle.com không chỉ là nơi mua sắm, mà là cầu nối yêu thương giúp
            bạn gửi gắm tấm lòng đến người thân yêu trong mọi dịp lễ hội Việt
            Nam.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#our-story-section"
              onClick={scrollToStory}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity"
            >
              Câu chuyện của chúng tôi
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-bold text-primary shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors"
            >
              Khám phá quà tặng
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        id="our-story-section"
        className="py-16 bg-white dark:bg-[#1a202c]"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCP7XTy-TwDFGtYClHfHF1umbi8JdTTQOtpMVg-47aITcUEp20BuwCJHj-2x6nx_Bl3YghIxjH4YHDjzKiCmD6a5lw-q1m-veABs1jQhke27HC20vr_XZZ_XwG2PXDWn3Byqj-SgyHNiCg3uzyp67MXzt49baf8iQJ-kDr3DR_nKPbA-SFb0klbJrAXRxbtxsRn-p88QkPZH4sOD9KgXSnsHFvrs9vdLBJ5HK8LX9yyUc6nvW9Do_L8B9wSgNqF64l630Y03V47mI')",
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Hơn cả một món quà, đó là sự quan tâm
              </h2>
              <div className="h-1 w-20 bg-red-600 rounded-full"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Tại <span className="font-bold text-primary">ngayle.com</span>,
                chúng tôi tin rằng mỗi món quà đều mang trong mình một câu
                chuyện và thông điệp riêng. Dù là Tết Nguyên Đán rộn ràng, Giáng
                Sinh ấm áp hay ngày Phụ nữ Việt Nam đầy ý nghĩa, chúng tôi luôn
                nỗ lực mang đến những lựa chọn tinh tế nhất.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Được thành lập với sứ mệnh "Trao quà - Nhận nụ cười", ngayle.com
                cam kết chất lượng sản phẩm chính hãng, dịch vụ gói quà nghệ
                thuật và tốc độ giao hàng thần tốc để khoảnh khắc trao tặng luôn
                trọn vẹn.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
