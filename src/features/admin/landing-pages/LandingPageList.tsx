export function LandingPageList() {
  const pages = [
    {
      id: 1,
      title: "Săn Sale Tết 2024",
      url: "ngayle.com/tet-2024",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtCz31xYjMtWOndJNvYrXhFkbv_ssL5D3HZkNtXX9tWdFNxbPkRTM4Ewocs91_ZrCEUBtpzE-bbTfnrVyUXbJwVU01pVWuOuYNW4Zg-Z26z8o9gfW9SEWalpPvbteQpgIr3tD3cm5XuvBAGDGdJ9SHL13_S9gVoiQiywGuOZu0XWN-avObO_Up4Ohj27BuLljIAVlk4GAvWMMxpLnVfZLV9qBb7IVz6mgf7Kj789Y0q-MPwjFLnQA2mLBPlkqSBZwKdQMVHnF1fOM",
      status: "active",
      views: "450K",
      conversion: "4.2%",
      lastUpdated: "2 phút trước",
    },
    {
      id: 2,
      title: "Valentine Ngọt Ngào",
      url: "ngayle.com/valentine",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMv7JTOReWE4gqDXgeLOel1JtjET7VIPQ9O-iUUu5A-54FKELM8CH1Rs029u6gd_AWTBbZwMiq3KG0ZxPOc2bpVQmO3ZlydCBoDWssV32eu8srI_jWdae2epKCarBXk4sLZNrQg6ZDRZmbk0uSREQIX5D1wAlRxw7eVaM7o9F0sdB1a0bJIauce8blYOdtp_RzUmqLAZEadkwzL2W77dFj7eR2sT621OhGDw9CFmPQSvm4PEYFoWrtQmq4ZCMH2le935MD8O4dJqM",
      status: "scheduled",
      views: "0",
      conversion: "0%",
      lastUpdated: "1 ngày trước",
    },
    {
      id: 3,
      title: "Quà 8/3 Ý Nghĩa - Draft",
      url: "ngayle.com/quoc-te-phu-nu",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_jVIfuk1uPY1q76c0XhBOIOHZtW0HCc3vIF_OVfELBs4B9_EylKhjRlh2MD1HT4Ne5e9WBKDT_tkz4JTnNIK0F9t05Ew0yw-sv1h8Al29ctC2zujDp97m7k3J_xoFXKoeu7t4zXNuJRm4j4zO4RW_TAnnOEdQ0c7zbL45z6YHzFBuSB9HPbDCBmd8yH9xLqwSBq58Ja_uIr6QZYj0jIy5cIPx-7ITCLM9EzD16dV3x5lOvjpxZAUlotABgwxlK28r0n_IgRzbag8",
      status: "draft",
      views: "0",
      conversion: "0%",
      lastUpdated: "3 giờ trước",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2634] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-bold text-gray-900 dark:text-white">
          Danh sách Landing Page
        </h3>
        <button className="text-primary hover:underline text-sm font-medium">
          Xem tất cả
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-semibold">
            <tr>
              <th className="px-6 py-4">Tên Landing Page</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Lượt xem</th>
              <th className="px-6 py-4 text-center">Chuyển đổi</th>
              <th className="px-6 py-4 text-right">Cập nhật cuối</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {pages.map((page) => (
              <tr
                key={page.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-10 rounded overflow-hidden bg-cover bg-center border border-gray-200 dark:border-gray-600"
                      style={{ backgroundImage: `url('${page.thumbnail}')` }}
                    ></div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {page.title}
                      </p>
                      <a
                        href="#"
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary"
                      >
                        {page.url}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {page.status === "active" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Đang chạy
                    </span>
                  )}
                  {page.status === "scheduled" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      Đã lên lịch
                    </span>
                  )}
                  {page.status === "draft" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      Bản nháp
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                  {page.views}
                </td>
                <td className="px-6 py-4 text-center font-medium text-emerald-600">
                  {page.conversion}
                </td>
                <td className="px-6 py-4 text-right text-gray-500 dark:text-gray-400 text-xs">
                  {page.lastUpdated}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded text-gray-500 hover:text-primary transition-colors shadow-sm"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded text-gray-500 hover:text-primary transition-colors shadow-sm"
                      title="Preview"
                    >
                      <span className="material-symbols-outlined text-lg">
                        visibility
                      </span>
                    </button>
                    <button
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded text-gray-500 hover:text-red-500 transition-colors shadow-sm"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
