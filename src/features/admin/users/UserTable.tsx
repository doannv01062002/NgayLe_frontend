"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UserTable() {
  const [activeTab, setActiveTab] = useState("sellers");

  const users = [
    {
      id: "SHOP-2023-882",
      name: "Quà Tặng Handmade 8/3",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDie15L1JK9SjUXpScCOwB0SwpAyBkmW-ZbzpPTpReTtOHdsJR82pGLAGlTTuxzvVEtmNNU4l6i2lmCoC0XLKz1qlqzcmg1dxrBSNdD_X1MMVBZxgeyfqawATVTrIfXkcpAgOwqe9PuF0uWFiRbhvCCS8S9m3y3_IAzCSD0joB9hF9yWG1DXM3tWVWwZGjXgcqSJdpHf3XqcebBjSgNsQy2oQsordqV-Bu-mEX_1ZEeIkVqIs6QIY-W1iR4jehlkF1oe8VWjFfkVmE",
      phone: "0908 123 ***",
      email: "contact@handmadestore.vn",
      joinDate: "12/10/2023",
      status: "pending",
      revenue: "-",
      type: "seller",
    },
    {
      id: "SHOP-2023-114",
      name: "Ngayle Flagship Store",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDVIP5YcL_VIVXrkFZ9wlaSRBQ9wQ1YqdJ6mJ3ENxzYoXhZsrOPBQkBdZV2ytwBpquyByfrNX7rJlQje-DA3vHhFoBV4TYG97JwgM2Mbm0KSkTL0XZrBeS4soIKpTgl3F0DXhKC2fCb1uvyd8a3ov8IUT3Bk4D3ArOTkfDtZ8sDdTSR8nANAYjLT4uz7ljJ1coL4WSP7fcxqW01Mm4_xxc3x99dhmn9kxL4aiqpsWmL9kTi9gKPW9P3MAMcEIB5NfdilH2G6gOo0bc",
      role: "Official Mall",
      phone: "0912 999 ***",
      email: "admin@ngayle.com",
      joinDate: "01/01/2023",
      status: "active",
      revenue: "125,000,000 đ",
      type: "seller",
    },
    {
      id: "SHOP-2023-114",
      name: "Hoa Tươi Sài Gòn",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBkaVq5xqhHt46pt_C8EXeb3e7b6qbGfA3AG0QQEl5BZJLfYFaTU5N9n1EDoQZG28YGDtknx_Su92I8IoaHHbytgA7UPk8pIUGwQFcxh1jyfP6VY-rv0P7zg-Ha2MFSVBCtWyGaAdfFJGZVsekQdbhOcl2vNzijAu5bAIVMe40Cw2XTb8ILjSQWanWXhwge9VgcXj-D0ExRGKfyyiilJudiEBMCCPMtWyrtO1-jJR5s1w-Nl8vmbEhaKKsj_i8CXMSQ38sbOyrVQF8",
      phone: "0933 456 ***",
      email: "hoa.saigon@email.com",
      joinDate: "15/05/2023",
      status: "active",
      revenue: "45,200,000 đ",
      type: "seller",
    },
    {
      id: "SHOP-2023-000",
      name: "Shop Lừa Đảo ABC",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3aHX7oFFhZA3AcVLbGisH7HKC-c2Yvb35g4ioP0qa59_LBUbO4Zd3TJELo7S92rZ3-dVtAuFd2ybUBTTI0bK7scHmN8wsZlDmZygAWgplObBqLiJzdLwnoe1ac9WeuSzlSJl4ZTKt6rq127TSAuqWUi42W_93B0jBUJosI0P6v9KUkFJdK3E0egjr_cRYj9zKs7gjo8MPk2O-KlDP3zc27oE5XHoHimLDIbiKkCPj8y8VjJ3MvZhlMB2sshGDKQOebCXRK9EJSrM",
      phone: "0999 000 ***",
      email: "spam@email.com",
      joinDate: "20/09/2023",
      status: "banned",
      revenue: "0 đ",
      type: "seller",
    },
    {
      id: "SHOP-2023-551",
      name: "Chocolate Valentine",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBO8mHNCoaGgfI_O11nu_bZNjentVr_70TrqZdw2zZjKPAloX5NXOMb44NToFC2368Pd2-mVeWMsynoj_4IP_qFRNEmDl0i4k82mstCt_WdNXl3xW_wcS7Nzi7r7j86LGZ5b_mPoLdMfpP24_gahTgxWqR2ztQmeljv-tr344YTZ712xpu7B5IBnVuNS8_timQZMqw4OkfToMhT8cqbW22pxJDLMdPqobZeWfflTGZjyGid74LHU3b25Gw4m3G_H__Ue3pstv2gzwg",
      phone: "0977 888 ***",
      email: "store@choco.vn",
      joinDate: "10/02/2023",
      status: "active",
      revenue: "89,100,000 đ",
      type: "seller",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col dark:bg-[#1a2632] dark:border-[#2b3a4a]">
      {/* Tabs */}
      <div className="border-b border-gray-200 px-6 dark:border-[#2b3a4a]">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("sellers")}
            className={cn(
              "flex flex-col items-center justify-center border-b-2 pb-3 pt-4 px-2 transition-colors",
              activeTab === "sellers"
                ? "border-b-primary text-primary"
                : "border-b-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#2b3a4a]/50"
            )}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Danh sách Người bán (Shop)
            </p>
          </button>
          <button
            onClick={() => setActiveTab("buyers")}
            className={cn(
              "flex flex-col items-center justify-center border-b-2 pb-3 pt-4 px-2 transition-colors",
              activeTab === "buyers"
                ? "border-b-primary text-primary"
                : "border-b-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#2b3a4a]/50"
            )}
          >
            <p className="text-sm font-medium leading-normal tracking-[0.015em]">
              Danh sách Người mua
            </p>
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-5 flex flex-wrap items-center gap-3 bg-gray-50 border-b border-gray-200 dark:bg-[#1a2632] dark:border-[#2b3a4a]">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 text-sm rounded-lg border border-gray-300 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Tìm theo Tên Shop, Email, SĐT..."
            type="text"
          />
        </div>
        <div className="w-48">
          <select className="w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="pending">Chờ duyệt</option>
            <option value="banned">Đã khóa</option>
          </select>
        </div>
        <div className="w-48">
          <select className="w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <option value="">Thời gian tham gia</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
        <button className="h-10 px-4 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
          Tìm kiếm
        </button>
        <button className="h-10 px-4 bg-white border border-gray-300 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Đặt lại
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:bg-[#2b3a4a]/50 dark:text-gray-400 dark:border-[#2b3a4a]">
              <th className="p-4 w-12 text-center">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                  type="checkbox"
                />
              </th>
              <th className="p-4">Thông tin Shop</th>
              <th className="p-4">Liên hệ</th>
              <th className="p-4">Ngày đăng ký</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Doanh thu (Tháng)</th>
              <th className="p-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#2b3a4a]">
            {users.map((user) => (
              <tr
                key={user.id}
                className={cn(
                  "hover:bg-gray-50 transition-colors group dark:hover:bg-[#2b3a4a]/50",
                  user.status === "banned" &&
                    "bg-red-50/30 hover:bg-red-50/50 dark:bg-red-900/10 dark:hover:bg-red-900/20"
                )}
              >
                <td className="p-4 text-center">
                  <input
                    className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                    type="checkbox"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "size-10 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-600",
                        user.status === "banned" && "grayscale"
                      )}
                      style={{ backgroundImage: `url('${user.avatar}')` }}
                    ></div>
                    <div className="flex flex-col">
                      <p
                        className={cn(
                          "text-sm font-bold text-gray-900 dark:text-white",
                          user.status === "banned" &&
                            "line-through decoration-red-500"
                        )}
                      >
                        {user.name}
                      </p>
                      {user.role && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-primary">
                            verified
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.role}
                          </p>
                        </div>
                      )}
                      {!user.role && (
                        <p
                          className={cn(
                            "text-xs text-gray-500 dark:text-gray-400",
                            user.status === "banned" && "text-red-500"
                          )}
                        >
                          ID: {user.id}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <p
                      className={cn(
                        "text-sm text-gray-900 dark:text-white",
                        user.status === "banned" && "opacity-50"
                      )}
                    >
                      {user.phone}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900 dark:text-white">
                  {user.joinDate}
                </td>
                <td className="p-4">
                  {user.status === "pending" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      Chờ duyệt
                    </span>
                  )}
                  {user.status === "active" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Đang hoạt động
                    </span>
                  )}
                  {user.status === "banned" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      Đã khóa (Vi phạm)
                    </span>
                  )}
                </td>
                <td
                  className={cn(
                    "p-4 text-sm text-gray-900 font-medium dark:text-white",
                    user.status === "banned" && "opacity-50"
                  )}
                >
                  {user.revenue}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    {user.status === "pending" && (
                      <>
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg dark:hover:bg-green-900/30"
                          title="Duyệt"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            check_circle
                          </span>
                        </button>
                        <button
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/30"
                          title="Từ chối"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            cancel
                          </span>
                        </button>
                      </>
                    )}
                    {user.status === "active" && (
                      <button
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                    )}

                    <button
                      className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                      title="Xem chi tiết"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        visibility
                      </span>
                    </button>

                    {user.status === "active" && (
                      <button
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-red-900/30"
                        title="Khóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          lock
                        </span>
                      </button>
                    )}
                    {user.status === "banned" && (
                      <button
                        className="p-1.5 text-primary hover:bg-blue-50 rounded-lg dark:hover:bg-blue-900/30"
                        title="Mở khóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          lock_open
                        </span>
                      </button>
                    )}
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
