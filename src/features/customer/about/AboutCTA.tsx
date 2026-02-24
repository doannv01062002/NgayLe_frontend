import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="py-20 bg-white dark:bg-[#1a202c]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-16 shadow-2xl sm:px-16 md:pt-20 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="absolute inset-0 -z-10 bg-gray-900">
            <div
              className="h-full w-full bg-cover bg-center opacity-30"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_vgvxPri7xgFjOpkAS2BI1eLjsOmBhLY57Bf4jtRMmjZQ33lMJJRG95d9Iy3NWGkgb7xNRWu7bDbsiJYoQhR24OjbawDDXqxEhak5Jm6MAGF9AQts3yB9DMnNalqIpaZM8kall7Y0Ht0Qry-3tw25r05Wi1tLEvNJYPi5OGMl25QcIbx2MJs_QkzTmIuu8-P7EbqTPYEozQi2Zfr9uIWjJykL9Gbnj_d9U5uB7mVqET85XsXXSkhEh2qU0E958IsUqQBSqNQ0AWc')",
              }}
            ></div>
          </div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-24 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sắp đến dịp lễ đặc biệt?
              <br />
              <span className="text-red-500">Hãy chuẩn bị ngay hôm nay.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Đừng để những người thân yêu chờ đợi. Khám phá hàng ngàn món quà ý
              nghĩa đang chờ bạn tại ngayle.com.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity"
                href="/"
              >
                Mua sắm ngay
              </Link>
              <a
                className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
                href="#"
              >
                Liên hệ tư vấn <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot showing gift selection"
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              height="1080"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVSBe8qLGtBeS4ffPYva7QIgsbmk6ePRsLL71DdJ9ArdI4vENLjUnAMlCYbhY32pzO3Kr1qXsLNnLrXSauDRYWdRxmoC-AaUZTAlCo1i0TidugDMngXKOswEzofInP5G47CI90MdUQuBFq-igX_S4uBbhp-QOu7p1mB5v_hb7U9bbTmR4V02AaH4YrkTGp5QtD1hzlLdWXZ6FF7BbmRfchM_yiBA8O0e7I_5nyKi-pcNy0bTHtfM-rF0MdSumx9CpzQOEX48CLZXY"
              width="1824"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
