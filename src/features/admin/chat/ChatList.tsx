"use client";

export function ChatList() {
  const chats = [
    {
      id: 1,
      userName: "Minh Hiếu",
      shopName: "Shop Quà Tết Việt",
      lastMessage: "Đơn hàng của mình vẫn chưa thấy giao?",
      time: "10:42 AM",
      isOnline: true,
      isActive: true,
      hasAlert: false,
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAA4IDMiq1Kqpk-_mhKpSXJo0nAo5a-eAQTyCRGMen0hDHeOgvRHE3OhKtZWSLNY_AqKYsjF8nGmdaO6enSVzKdxH2gBzpAye9g2232CJ37LrNIEnOWSmsr6mPEFyKA7csRX_gGo1Vj9UDYQ4G1XPbmGPC9j8np6vdMZc9BH1atisqpMTb1nGEOtIl34r1rK_YzGWWmzGLZgDYO14sOuahDd-b-yWjfHl2sAUrSVQ3H3d2aY7gVnmSXUTzKGu8R69wEeEC_Tq3Farw",
    },
    {
      id: 2,
      userName: "Lan Anh",
      shopName: "Ngayle Official Store",
      lastMessage: "Cảm ơn shop đã hỗ trợ nhé.",
      time: "09:15 AM",
      isOnline: false,
      isActive: false,
      hasAlert: false,
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBKUTNxnUEYab3OSOAavHiXupfGnA-ZxrdtRv-a1kN22Jz5tXYYau0aFMqt4qrhxOQ6eBl3a9g2oyBj2Gt3--2rkYUpMdWvZA_BQ-RST5Og41tlddlhpC-RmhO7X6utO-5FdbcgFVdV1qVxUbnvL-RWavsjWIAV2ny9KPFQ61ydaPJqw1XcG2bHIJf81trdqAQB0wNO0rksy8aDa8Wa4SnfmW-LHxax1AIl7_-QyQL4W35wywntJ2gCZ1qY7xX_tKTDiLPtq-YocC4",
    },
    {
      id: 3,
      userName: "Tuấn Tú",
      shopName: "Điện Máy Xanh",
      lastMessage: "Sản phẩm bị vỡ khi nhận hàng...",
      time: "Hôm qua",
      isOnline: false,
      isActive: false,
      hasAlert: true,
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAcvNIzHtCbKXBDdzm1H-2KJoepjThDgPOen4RX5MPWw1tPyi_sgamYqA3ilO16t5jVuglqFaR3wqPpriZPegPZyjSobJLlwBpYudpi6_ffsrlKwK-SRS-dcuEacRnC0Zi86juIGRndSXdgQIV1bMLhn6HUGqkPvT-zoraNVnU4mUq7CZFdoZI8DVcNs8cqNCaF4YUwfPnh3rxfdh9B_LhjCiQWfg57toltUVdB83vu2vAx5umoDUPH6Z-ff7Wq-TDMZVzDZS3MnXI",
    },
  ];

  return (
    <div className="w-80 flex flex-col border-r border-gray-200 bg-gray-50 h-full dark:border-gray-700 dark:bg-gray-800">
      {/* Search */}
      <div className="p-3 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1a2634]">
        <label className="flex w-full items-center rounded-lg bg-gray-100 px-3 h-10 dark:bg-gray-800">
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
            search
          </span>
          <input
            className="w-full bg-transparent border-none text-sm text-gray-900 focus:ring-0 placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
            placeholder="Tìm User ID, Shop, Đơn hàng..."
          />
        </label>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1a2634]">
        <button className="flex-1 py-3 text-center border-b-2 border-primary text-primary text-sm font-bold">
          Tất cả
        </button>
        <button className="flex-1 py-3 text-center border-b-2 border-transparent text-gray-500 hover:text-gray-900 text-sm font-medium relative dark:text-gray-400 dark:hover:text-white">
          Hỗ trợ
          <span className="absolute top-2 right-4 size-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>
        <button className="flex-1 py-3 text-center border-b-2 border-transparent text-gray-500 hover:text-gray-900 text-sm font-medium dark:text-gray-400 dark:hover:text-white">
          Báo cáo
        </button>
      </div>
      {/* List Items */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 dark:hover:bg-gray-700 dark:border-gray-700 ${
              chat.isActive
                ? "bg-white border-l-[3px] border-primary dark:bg-gray-800"
                : ""
            }`}
          >
            <div className="relative">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-200 dark:border-gray-600"
                style={{ backgroundImage: `url('${chat.userAvatar}')` }}
              ></div>
              {chat.isOnline && (
                <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full size-3 border-2 border-white dark:border-gray-800"></span>
              )}
              {chat.hasAlert && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full border border-white dark:border-gray-800">
                  !
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-sm truncate ${
                    chat.isActive
                      ? "font-bold text-gray-900 dark:text-white"
                      : "font-semibold text-gray-900 dark:text-white"
                  }`}
                >
                  {chat.userName}
                </h3>
                <span className="text-[10px] text-gray-500 whitespace-nowrap dark:text-gray-400">
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-red-600 text-[14px]">
                  storefront
                </span>
                <span className="text-xs text-gray-500 truncate dark:text-gray-400">
                  {chat.shopName}
                </span>
              </div>
              <p
                className={`text-xs truncate mt-1 ${
                  chat.isActive
                    ? "font-medium text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
