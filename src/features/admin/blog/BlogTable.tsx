export function BlogTable() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Quà tặng Valentine 2024",
      category: "Dịp Lễ Tình Nhân",
      author: "Minh Anh",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJsscx0zalJ0caEV_urCmSq13xmk-OKGHm2X48yCepO1oLzeiunOz4TIXF4F5iEqUoOrGRqGTSdSGWXhlexaRd-TVVfegF4bcYw2SixhCdQgVqCPW03wveLXbs9Yc9C2wuxjLmRYsiPuV4CJn_1on2S-UZi_rTPt3d7YA5iB7-QaEqCJblURoWvBgF0k654r_hhAbe2aJYCCtF_DuIKCeyRj_fQTQrr8a442CAKkSujuejRW5JnUlW_Z-801VyJDup_S00LH6s7XA",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMv7JTOReWE4gqDXgeLOel1JtjET7VIPQ9O-iUUu5A-54FKELM8CH1Rs029u6gd_AWTBbZwMiq3KG0ZxPOc2bpVQmO3ZlydCBoDWssV32eu8srI_jWdae2epKCarBXk4sLZNrQg6ZDRZmbk0uSREQIX5D1wAlRxw7eVaM7o9F0sdB1a0bJIauce8blYOdtp_RzUmqLAZEadkwzL2W77dFj7eR2sT621OhGDw9CFmPQSvm4PEYFoWrtQmq4ZCMH2le935MD8O4dJqM",
      views: "12.5K",
      viewGrowth: "+12% tuần này",
      seoScore: 92,
      status: "published",
    },
    {
      id: 2,
      title: "Gợi ý mâm ngũ quả ngày Tết",
      category: "Tết Nguyên Đán",
      author: "Hoàng Nam",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_jVIfuk1uPY1q76c0XhBOIOHZtW0HCc3vIF_OVfELBs4B9_EylKhjRlh2MD1HT4Ne5e9WBKDT_tkz4JTnNIK0F9t05Ew0yw-sv1h8Al29ctC2zujDp97m7k3J_xoFXKoeu7t4zXNuJRm4j4zO4RW_TAnnOEdQ0c7zbL45z6YHzFBuSB9HPbDCBmd8yH9xLqwSBq58Ja_uIr6QZYj0jIy5cIPx-7ITCLM9EzD16dV3x5lOvjpxZAUlotABgwxlK28r0n_IgRzbag8",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDPPfrLtcC1JFSD6elGON-Mv6QMQV_hUvidN9basnInbUjdj2FZf_RMr8ymAkPkw-yViEAsiV6wCvPcaKhm7X8xt7hf60bYha6Jz9j3CWfuFiI8nzUpEk9ZnEs9iNDiuZZk65Dd3QbCxfcaWfXQMX7SNKgT-8CwBW03eZUuSV0XMa2P2mQhHm4wA5vTAB5eI3UXugcpOBuU1urQNgPE2AwZIrcYztJDjo2mFvx4wUw-DM7ekT_qTe_7nBV-06h9mt271SImYsej8rQ",
      views: "8.4K",
      viewGrowth: "--",
      seoScore: 75,
      status: "pending",
    },
    {
      id: 3,
      title: "Cách gói quà sinh nhật đẹp",
      category: "Sinh nhật",
      author: "Linh Đan",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCECe7hrhV_-IZ-Y4dHFJjgooaIrYVnz-2antdyKued7AjI2eewGmXYarCc2sMs7fONhTbSlk9tctunY3AI0C-ls8hOhnjswMMTm1fd4iB3JstuOrxNc9aSYGhG72r2TO8ozG_5aGX11pIyRYrfQ1RkGxFlADAFvmOI87H-YnfdnUv_c-Hq2yOAK4bMEfJUH3s4D5pD6Mu3JAEPRMA46Z8uuZQA-FtFjWuN681KZkeXitqYKBL6veiPbs11d8RDnYePLz1jYftcyA4",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_d6LEHEBq8elLeaO7-gzy_qzKF4ni3npew4i-QMoA9z6Lzj5KBAkxL1aqFnbYO2d-plJYbLmGuk0-tvpeAuxDmmJepjr64MhK9uLQEV898bSNaNACMzOxVaY6F4NHlDKeMsSR0C6AGQOy-A-Pef9NulDVaSOQH0et3fozLHRCBk7ye0NFRNHE-aG-ZPh0lreU6yZTjAaH6hFK2wu_f9qTqmryViX4vVajndRraHCezFGffrmj1btci0hHI_P9kflJWktIwTCQIqk",
      views: "0",
      viewGrowth: "Chưa công khai",
      seoScore: 45,
      status: "draft",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2634] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left w-12" scope="col">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 dark:bg-gray-700 dark:border-gray-600"
                  type="checkbox"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                scope="col"
              >
                Bài viết
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                scope="col"
              >
                Tác giả
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                scope="col"
              >
                Lượt xem
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                scope="col"
              >
                Điểm SEO
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                scope="col"
              >
                Trạng thái
              </th>
              <th className="relative px-6 py-3" scope="col">
                <span className="sr-only">Hành động</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1a2634] divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 bg-cover bg-center"
                      style={{ backgroundImage: `url('${post.thumbnail}')` }}
                    ></div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {post.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-2 bg-cover bg-center"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    ></div>
                    <div className="text-sm text-gray-900 dark:text-gray-200">
                      {post.author}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200 font-medium">
                    {post.views}
                  </div>
                  <div className="text-xs text-emerald-600">
                    {post.viewGrowth}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          post.seoScore >= 80
                            ? "bg-emerald-500"
                            : post.seoScore >= 50
                            ? "bg-orange-400"
                            : "bg-gray-400"
                        }`}
                        style={{ width: `${post.seoScore}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        post.seoScore >= 80
                          ? "text-emerald-600"
                          : post.seoScore >= 50
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    >
                      {post.seoScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.status === "published" && (
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900">
                      Đã xuất bản
                    </span>
                  )}
                  {post.status === "pending" && (
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900">
                      Chờ duyệt
                    </span>
                  )}
                  {post.status === "draft" && (
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                      Bản nháp
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="text-gray-400 hover:text-primary transition-colors"
                      title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="text-gray-400 hover:text-primary transition-colors"
                      title="Xem trước"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        visibility
                      </span>
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[20px]">
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
