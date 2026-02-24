export function ShopChatWidget() {
  return (
    <div className="fixed bottom-0 right-8 z-50 flex flex-col items-end gap-2">
      {/* Chat Window (Expanded State Simulated) */}
      <div className="w-80 bg-white shadow-2xl rounded-t-lg overflow-hidden border border-gray-200 hidden md:flex flex-col h-96">
        {/* Header */}
        <div className="bg-primary px-4 py-2 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">
              Chat - Tiệm Quà Tết...
            </span>
            <div className="size-2 bg-green-400 rounded-full border border-white"></div>
          </div>
          <div className="flex gap-2 text-white/80">
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-white">
              minimize
            </span>
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-white">
              close
            </span>
          </div>
        </div>
        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 p-3 overflow-y-auto flex flex-col gap-3">
          <div className="text-center text-xs text-gray-400 my-1">Hôm nay</div>
          {/* Shop Message */}
          <div className="flex gap-2 items-end">
            <div
              className="size-6 rounded-full bg-cover bg-center shrink-0"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD34-oNxUPB3Zw2IJpHj53JHqaGDKZ2UtoVw49SKGXOHy0ZNwr_1wCm9B_OtpOEVoirCMJNX8U9YnmnOWyWxrEAT7vtkgwEn9FK7q9T_cjAATUMQMvS2q7vf9sjeHuunxC844h7wp4pCt9rXjfubviSdEcIbcWrF73V2GV93l3N9ypXjRYYvAuZ5ik_uTFGLKMNP_m2adR-hQYADyI3vQxYcoxofKy1FlqN4kFzkOGxtz4w6Wb7T8R0HbfWl27WtLLxdUaHd17RAKQ')",
              }}
            ></div>
            <div className="bg-white p-2 rounded-lg rounded-bl-none shadow-sm border border-gray-100 max-w-[80%]">
              <p className="text-xs text-gray-800">
                Chào bạn, Tiệm Quà Tết Sum Vầy có thể giúp gì cho bạn ạ? 🧧
              </p>
            </div>
          </div>
          {/* Automated Offer */}
          <div className="flex gap-2 items-end">
            <div className="size-6 shrink-0"></div> {/* Spacer */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 max-w-[80%] flex flex-col gap-2">
              <p className="text-xs font-bold text-primary">
                Voucher mới cho bạn!
              </p>
              <div className="flex gap-2 border border-primary/20 bg-primary/5 p-1 rounded items-center">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  confirmation_number
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold">Giảm 10k</span>
                  <span className="text-[8px] text-gray-500">Đơn 99k</span>
                </div>
                <button className="bg-primary text-white text-[9px] px-2 py-0.5 rounded ml-auto">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Input Area */}
        <div className="bg-white p-2 border-t border-gray-200 flex gap-2 items-center">
          <span className="material-symbols-outlined text-gray-400 text-[20px] cursor-pointer hover:text-primary">
            add_circle
          </span>
          <span className="material-symbols-outlined text-gray-400 text-[20px] cursor-pointer hover:text-primary">
            image
          </span>
          <input
            className="flex-1 bg-gray-100 border-none rounded-full px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary"
            placeholder="Nhập tin nhắn..."
          />
          <span className="material-symbols-outlined text-primary text-[20px] cursor-pointer">
            send
          </span>
        </div>
      </div>
      {/* Collapsed Chat Button (Visible mostly on Mobile or when minimized, showing both for demo) */}
      <button className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover flex items-center justify-center relative md:hidden">
        <span className="material-symbols-outlined text-2xl">chat</span>
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold size-5 flex items-center justify-center rounded-full border-2 border-white">
          1
        </span>
      </button>
    </div>
  );
}
