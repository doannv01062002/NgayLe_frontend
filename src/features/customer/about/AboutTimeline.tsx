export function AboutTimeline() {
  return (
    <section className="py-16 bg-white dark:bg-[#1a202c]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hành trình phát triển
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Từ một cửa hàng nhỏ đến sàn quà tặng hàng đầu.
          </p>
        </div>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 dark:bg-gray-700"></div>

          {/* Timeline Item 1 (Left) */}
          <div className="relative flex items-center justify-between mb-8 w-full">
            <div className="w-5/12 pr-8 text-right order-1">
              <h3 className="text-lg font-bold text-primary">2018</h3>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                Khởi Nguồn
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Thành lập tại một căn phòng nhỏ ở TP.HCM với niềm đam mê quà
                tặng thủ công.
              </p>
            </div>
            <div className="z-20 flex items-center justify-center order-1 bg-white dark:bg-[#1a202c] border-4 border-primary rounded-full w-8 h-8 shadow"></div>
            <div className="w-5/12 pl-8 order-1"></div>
          </div>

          {/* Timeline Item 2 (Right) */}
          <div className="relative flex items-center justify-between mb-8 w-full">
            <div className="w-5/12 pr-8 text-right order-1"></div>
            <div className="z-20 flex items-center justify-center order-1 bg-white dark:bg-[#1a202c] border-4 border-red-600 rounded-full w-8 h-8 shadow"></div>
            <div className="w-5/12 pl-8 order-1">
              <h3 className="text-lg font-bold text-red-600">2019</h3>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                Mở Rộng
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Mở rộng kho hàng ra Hà Nội và Đà Nẵng, phục vụ khách hàng toàn
                quốc.
              </p>
            </div>
          </div>

          {/* Timeline Item 3 (Left) */}
          <div className="relative flex items-center justify-between mb-8 w-full">
            <div className="w-5/12 pr-8 text-right order-1">
              <h3 className="text-lg font-bold text-primary">2021</h3>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                Chuyển Mình Số
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Ra mắt website thương mại điện tử và ứng dụng di động
                ngayle.com.
              </p>
            </div>
            <div className="z-20 flex items-center justify-center order-1 bg-white dark:bg-[#1a202c] border-4 border-primary rounded-full w-8 h-8 shadow"></div>
            <div className="w-5/12 pl-8 order-1"></div>
          </div>

          {/* Timeline Item 4 (Right) */}
          <div className="relative flex items-center justify-between mb-8 w-full">
            <div className="w-5/12 pr-8 text-right order-1"></div>
            <div className="z-20 flex items-center justify-center order-1 bg-white dark:bg-[#1a202c] border-4 border-red-600 rounded-full w-8 h-8 shadow"></div>
            <div className="w-5/12 pl-8 order-1">
              <h3 className="text-lg font-bold text-red-600">2023 - Nay</h3>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                Dẫn Đầu
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Trở thành sàn TMĐT chuyên biệt về quà tặng số 1 Việt Nam với hơn
                1 triệu đơn hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
