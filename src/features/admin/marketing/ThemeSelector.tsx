export function ThemeSelector() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1a2634]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Giao diện Website
        </h3>
        <a
          className="text-sm font-medium text-primary hover:text-blue-600"
          href="#"
        >
          Xem tất cả kho
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Theme Card */}
        <div className="group relative rounded-lg border border-primary bg-primary/5 p-3 dark:bg-primary/10">
          <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            Đang áp dụng
          </div>
          <div
            className="aspect-video w-full rounded-md bg-cover bg-center mb-3 overflow-hidden"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPRYvLkatnlU12Xli8-eWAeGjn2rmRdypiaTrSS781qLJQgV6GA0q1Lx1vVH7vYRlztlLL-YSOqYkMtNHr8tyuaqSylQbe2coP772iGxOuJtVCGJarH-DeWudeFe9bmyWADTKKoH3oojCw_7RUn53z36XjUm7lJeSbFpJxlrAsOHMKLuyP2mMdLomEjLRteOyRfi-hpdGD-XUdAa2zEKCeoB1aSXU6adDDGmmEwcVceYQUjdqgJpWrfpxFnBDTqENSA72gx9MZ2Zk')",
            }}
          ></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Lễ Hội Tết 2024
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Theme ID: #TET24_V1
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  defaultChecked
                  className="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hiệu ứng tuyết
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Upcoming Theme Card */}
        <div className="group relative rounded-lg border border-gray-200 bg-white p-3 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
          <div
            className="aspect-video w-full rounded-md bg-cover bg-center mb-3 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3FrZPiCAsOPqcTK5I4K47d97Y2X0wqSJGWDhr7b9QB2pkuB5JbCArkPvOrTLxIt3SFIKVj-F7Li26C5p-x2jBK7UfSmTxC3kVdze4L7g6Ld1K3g0S3DuuJT0NZyxQsYeChc_JyP4SPcDkSV-e8CFUyIVACilykh4yB13r9rb9DMpW-79AC59YlOHTEtJwavkd6SCWFxfoiscQiW_UeE_tITF5yw46_GXm5y8uALUU-3a3fKMrYhciaCw8kc5BV64CDtD6humJS9I')",
            }}
          >
            <div className="flex h-full w-full items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-lg">
                Xem trước
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Valentine Deal
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dự kiến: 10/02/2024
              </p>
            </div>
            <button className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
