export function ReviewList() {
  const reviews = [
    {
      id: 1,
      productName: "Hộp Quà Tết 2024 - Phiên bản Rồng Vàng",
      productId: "#SP2931",
      productImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAwZbzWSYv-6FFTCEnMjc3qPTSyWFSvlmfFUnTFt2alXuQWAwuP4sFG3Od936h-NB1AMOxpdC-zwhsEFAWq99jbjXkqqGeXlee0TJNU2IeK-yX7wW8iwv3lvi0WPK9_tAmoxuVUzNooR6V5R3f2Wkt33LNxlVta0iiCzzZTyVdwu79NStvqsTqU39eu8rYUCQtS1rp0unY6c-iT8hYNofdpelBMwqsIwCFtrM-c2XBjLIl4UvRyxIUa-3VSyPU2Mhk0MFvxcZVYPVk",
      userName: "Nguyễn Văn An",
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBobTHK5z7FsmsLwbK4x4SYzfCwjRdGMgWMr0bw0MWtyRNS_E2o5FceGKmDH0djBjQ06Amvb_d7MQhQIfxejgiEbj04ZCZxfTMQizGyonccFCXNjD8gnFhGB9x_FfB8hnSHyCm6iT5823ihMOHx7u-i9HnHAx69db1PknwSPDqF0I2YBi4fA-AwiDED2nHTcyQ5qywOlx7MTENINgBI2pWswFuFsncmpddX53_8MZgNssbHma-twdvYGv96ls-ermfF5OZZ2l9ACqw",
      rating: 5,
      time: "2 giờ trước",
      status: "pending",
      content:
        "Sản phẩm đóng gói rất kỹ, giao đúng dịp lễ. Màu đỏ rất đẹp và sang trọng, đúng như hình ảnh quảng cáo. Tuy nhiên ship hơi lâu một chút do lễ đông đơn.",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDC1smV1v0TYGFKFYA-0223hYqTFMZhxpN241X3nTnp1za_DigGkE3baPYv5M1c0ARxyWuPEGTbhbWCKmUoTo0adxHoOXIKW2G7je-MQGdHqh6NlUIhTiHI0MFJu7-vKCvuzNZeIYsODaINuCRJbNjd0sCi0Bz9toyqPWMq1GTbI7mDBqlvcpVOufeJDqFPZXlgsnuLzF3f5isqJhGvmuNxktJ7JQJ9dT6iAI66eXXbRJUtY8X4yGmz61Ye9b4CcVPfIkYpmtRbjEo",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB03pS4Ywd-IKDCg8Syu4iTlk4x7aRgRAcMPkxzAj7rSf3VODdM2LMkIYAqsl5bWJxX9DBCU0jvAzJ-KfOqiftluDyBoA6d60cgZ2-rIfqpV76MwpPEJizPdpedWVt6hQ93wwNd09zo6IAtZ1c0Hd0yRP1qyfPxMtDwfJOhDAc92S0xKBf_ZG0ThOOzyrp9hl82xI5fMrw06tVmniHWxPvlFV7KI2mhM6tq251Sw7vQvH2HUut8IqLGoZRkiTctKO4e53-mhI5JyaM",
      ],
    },
    {
      id: 2,
      productName: "Bộ Bình Gốm Sứ Bát Tràng",
      productId: "#SP9912",
      productImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5QRrq4HnfLKK_xW-Z6cRta46l5Hdt90zyyXJXbtvSm4CDTN3k_n_yOt-JP7_79cWEH0ir4QDjT0vS337CvFT447JKPPbZEmTlAWK1r8JL3aU48XYAuMZSStHJE3sYZQwvpJ2iH_ZgS0NBtGqbNxBSGc_wxj6d_lH9_b-OH17Ar1bNjWbnEkyTrnY2DPCzkd3zbbhJb3DBGF6NXU_hnYLmV1Ui_DtMv5rwHc3WMW9SuuTFrOSidGGN4VQcOnw-F5q14ea0CF12BMc",
      userName: "Trần Thị B",
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFph8s0aqV6TnPrLjhRX8AgR1PmUwmjjXT5wx_j1n2XcGPIGeBKWWkyz2s7eDlccs1lefn4RZttECiXTs8RjXG9hOCkaz7k4MeBKFiaLF1IOlclTn4vvWj8LHSG-Q920H1pZdNI6ZZ0KyF4_Kjn24WBDGD49frwx0o3iTlWEp5lSp6agSOfwT2b0BVMo0GhkvyGl5UXFubLVyryFnRIOZmIbyFfB4hH4RG0ZtRbE8VmiqTv-w9NgH6UwGwEJD8DVn0mBFQyQo1qZc",
      rating: 5,
      time: "1 ngày trước",
      status: "approved",
      content: "Hàng đẹp, shop tư vấn nhiệt tình. Sẽ ủng hộ lần sau.",
    },
    {
      id: 3,
      productName: "Điện thoại Vsmart Joy 4",
      productId: "#SP1122",
      productImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1Puv87lOWUvg11i6AXWvwt_HJlhB44djZ4BJPUHALSzOcAG70SWE36VM_jfifiXg87Glk9q3edGUL16XI6GlBbGUV9KKoCQ-XF6ILOdOGhk9sN6_YKy9womUTN7H0YxAD4Fl62q2mYwCPxleJItGI1V1tjic_ye33m8J7ZkzfKar6umMOl4aOps7s-KUi84WpDStAM3t_yDPvhxIWXEUxUXhBGMWOOjkSKKvkYIJ_fyMWtvum_OzItRdP_LBnoIihnywSx8SSko",
      userName: "User123984",
      userAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCCaZly86X6drcjzFQENZVx8vRRh3mmnvYKy2zFjxokD5COItc2XwCkXgIX3E5RkBSlUHXyglWLaroihkt2Fim1F89xhEe5TPvC3dLLmnfGfKRK0P4EmEmyTIqbFpfUeO4tg9LukAXBX1HfNLNKa4KMBTOQUgo-QMnxcA5seaSpC5egod8GDoVLcXu8DI9qfXIuYRm-vknKSFV05JRNDv2k-uc7LGDcLFXYlDC1fxnXt7C7itna-bUo5PBq73hrY8yzyAydbcYVw",
      rating: 1,
      time: "5 giờ trước",
      status: "spam",
      content:
        "Click vào link này để nhận quà miễn phí ngay: http://spam-link.com...",
      spamReason: "Phát hiện từ khoá cấm",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex-1">
      {/* Header for Bulk Actions */}
      <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50">
        <input
          className="rounded border-gray-300 text-primary focus:ring-primary size-4"
          type="checkbox"
        />
        <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
          Chọn tất cả
        </span>
        <div className="ml-auto flex gap-2">
          <button className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">
            Sắp xếp: Mới nhất
          </button>
        </div>
      </div>

      <div>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="group border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors p-4 sm:p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Checkbox & Product Info */}
            <div className="flex md:flex-col gap-4 md:w-48 shrink-0">
              <div className="flex items-start gap-3">
                <input
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary size-4"
                  type="checkbox"
                />
                <div className="flex flex-col gap-2">
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center border border-gray-200 dark:border-gray-700"
                    style={{ backgroundImage: `url('${review.productImage}')` }}
                  ></div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2">
                      {review.productName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {review.productId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-8 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${review.userAvatar}')` }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {review.userName}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400 text-[14px]">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "material-symbols-outlined text-[16px] fill-1"
                                : "material-symbols-outlined text-[16px] text-gray-300"
                            }
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        • {review.time}
                      </span>
                    </div>
                  </div>
                </div>
                {review.status === "pending" && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                    Chờ duyệt
                  </span>
                )}
                {review.status === "approved" && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Đã duyệt
                  </span>
                )}
                {review.status === "spam" && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                    Spam/Vi phạm
                  </span>
                )}
              </div>

              {review.status === "spam" ? (
                <div className="text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/20">
                  <p className="font-bold text-xs text-red-500 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      warning
                    </span>
                    {review.spamReason}
                  </p>
                  {review.content}
                </div>
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.content}
                </div>
              )}

              {review.images && (
                <div className="flex gap-2 mt-1">
                  {review.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="size-16 rounded-lg bg-cover bg-center cursor-pointer border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-primary transition-all"
                      style={{ backgroundImage: `url('${img}')` }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 md:justify-start justify-end md:w-32 md:border-l md:border-gray-100 md:dark:border-gray-700/50 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700/50">
              {review.status === "pending" && (
                <>
                  <button className="flex-1 md:flex-none h-9 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400 rounded-lg text-sm font-semibold transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                    <span className="md:hidden xl:inline">Duyệt</span>
                  </button>
                  <button className="flex-1 md:flex-none h-9 flex items-center justify-center gap-2 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg text-sm font-semibold transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      close
                    </span>
                    <span className="md:hidden xl:inline">Từ chối</span>
                  </button>
                </>
              )}
              {review.status === "approved" && (
                <button className="flex-1 md:flex-none h-9 flex items-center justify-center gap-2 bg-gray-50 text-gray-400 cursor-not-allowed rounded-lg text-sm font-semibold">
                  <span className="material-symbols-outlined text-[18px]">
                    check
                  </span>
                  <span className="md:hidden xl:inline">Đã duyệt</span>
                </button>
              )}
              <button className="flex-1 md:flex-none h-9 flex items-center justify-center gap-2 bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary/20 dark:hover:text-primary rounded-lg text-sm font-semibold transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
                <span className="md:hidden xl:inline">Trả lời</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
