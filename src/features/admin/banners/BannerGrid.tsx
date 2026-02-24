export function BannerGrid() {
  const banners = [
    {
      id: 1,
      name: "Sale Lễ 2/9 - Big Sale",
      campaign: "Trang chủ - Slider Chính",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAxuS_zQvcPGmYFIbtfnCEqiLv4xkffxWSWP-EwIBUqJKxLLp8FaTr90_Rq2ITT4dGiji5zUcSLSlLDnyNFkE6AawPo_g-829dUL9pKunYd3_026n814HmTb5lBR2wVfcu8Hut1AcYWnqYA7tflPex4bZWyph6rzrxreKfcP8NJOxfsGqNOiJpgh8ejGF02WlvjIfHxOUHR50KDjZ1-zDhoS6OJINmUDO7fVhkjCykqEnyp5tYk2EJvbXBqRdafMfR_KkES9ZEHbNI",
      startDate: "28/08/2023",
      endDate: "05/09/2023",
      views: "450K Views",
      ctr: "4.2% CTR",
      status: "active",
    },
    {
      id: 2,
      name: "Flash Sale Khung Giờ Vàng",
      campaign: "Trang chủ - Banner Giữa",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_hGJR1kqZyFFBDYz7ajdIJBtMMjZRo5NMkboAPWFsDgrF00K0Wy6DOVXLFGNKAGYZKcJBTiq0oGQ29wrQHEnhHye4dOyTsfEK1VugkeLhgoiM2pCH2QCRr-PqNS0wJV96rpFeXSZAy850MR9UOzFqZPQ8dlqWxrDL7Pq7zCknSeWRQEzUgIQBioiOxZYPcY774NauWjiAFIWzY4HHPXgweharyWgfk2eNaLm8Je5d6ZPazakd1ktfz_SAd9oE0U7FdjIkgkPk8qE",
      startDate: "01/09/2023",
      endDate: "30/09/2023",
      views: "120K Views",
      ctr: "2.1% CTR",
      status: "active",
    },
    {
      id: 3,
      name: "Trung Thu Sum Vầy",
      campaign: "Trang Danh Mục - Quà Tặng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAzf2FIIT8BT2LQRTp4A03zfkibk1IhunoEs2mtkF-gQA4wHoWE1iKx4fR9X0DGOGhrssqE7eZ3p_5WfGCQ1WEEsOxeI3Aw1Li0kFTEM-T-i_-t0V9aHIPAdynrVlfxpEBlZfgN_APjEdyuP0yw0gU_3eI0Z0vCuUN4DwKT54ojVULDoW9eXOr6zjYnHHKzL1m00HmP6sl7XGIAcTGCRazMjwaI03g96c4Qf5dZEmboFr58dkChC70YYZh5yPjVUkuSFW1zHv1m7ro",
      startDate: "15/09/2023",
      endDate: "30/09/2023",
      views: "0",
      ctr: "0",
      status: "scheduled",
    },
    {
      id: 4,
      name: "Chào Hè Rực Rỡ",
      campaign: "Trang chủ - Slider",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBOlAhRDJnidKSvBhnCA7CK2QKEGTBWzgvo6hiOPu5jOBma85_BPzXljXdYkMZ7YVCSEma-hc9bcStc-D4ApeK9BKZVlVMG90QzPQC3JVqK6W16a1hRY2qxiXCHzKSiBeDtqR2cInmMDoFE1bbHdMKwTMeWNgVMsmdzGsjywnqz6gDChJvx3RVTnVnPOrtYIwJqKRnT_0_gPW-WzPFxDdOyG7D7JrSDjf_QdxJy2HqtRXpGqH4DjoaE4EaKHY_wfxkxG--wHgyHEIQ",
      startDate: "01/06/2023",
      endDate: "31/08/2023",
      views: "890K Views",
      ctr: "3.8% CTR",
      status: "ended",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2634] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-900 dark:text-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium w-12 text-center">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary/20 bg-white dark:bg-gray-700 dark:border-gray-600"
                  type="checkbox"
                />
              </th>
              <th className="px-6 py-4 font-medium">Banner</th>
              <th className="px-6 py-4 font-medium">Chiến dịch / Vị trí</th>
              <th className="px-6 py-4 font-medium">Thời gian</th>
              <th className="px-6 py-4 font-medium text-center">Hiệu quả</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {banners.map((banner) => (
              <tr
                key={banner.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group ${
                  banner.status === "ended" ? "opacity-75" : ""
                }`}
              >
                <td className="px-6 py-4 text-center">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary/20 bg-white dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="h-16 w-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 dark:border-gray-600 relative group/img cursor-pointer">
                    <div
                      className={`w-full h-full bg-cover bg-center ${
                        banner.status === "ended" ? "grayscale" : ""
                      }`}
                      style={{ backgroundImage: `url('${banner.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="material-symbols-outlined text-white">
                        zoom_in
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        banner.status === "ended"
                          ? "line-through decoration-gray-400 text-gray-900 dark:text-white"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {banner.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                      {banner.campaign}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        calendar_today
                      </span>
                      {banner.startDate}
                    </span>
                    <span className="flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">
                        event
                      </span>
                      {banner.endDate}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {banner.status !== "scheduled" ? (
                    <div className="inline-flex flex-col items-end">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {banner.views}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        {banner.ctr}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Chưa có dữ liệu
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {banner.status === "active" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Đang chạy
                    </span>
                  )}
                  {banner.status === "scheduled" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                      <span className="size-1.5 rounded-full bg-gray-400"></span>
                      Đã lên lịch
                    </span>
                  )}
                  {banner.status === "ended" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                      <span className="size-1.5 rounded-full bg-red-400"></span>
                      Đã kết thúc
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {banner.status === "active" && (
                      <button
                        className="relative w-9 h-5 rounded-full bg-primary transition-colors focus:outline-none"
                        title="Tắt Banner"
                      >
                        <span className="absolute left-4 top-0.5 w-4 h-4 bg-white rounded-full transition-transform"></span>
                      </button>
                    )}
                    {(banner.status === "scheduled" ||
                      banner.status === "ended") && (
                      <button className="relative w-9 h-5 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none">
                        <span className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform"></span>
                      </button>
                    )}
                    <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                    <button
                      className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors dark:text-gray-400 dark:hover:text-primary dark:hover:bg-primary/20"
                      title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-[18px]">
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
