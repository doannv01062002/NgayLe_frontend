export function WithdrawLimit() {
  return (
    <div className="bg-gradient-to-br from-[#137fec] to-[#0b4d91] p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
      {/* Abstract decoration */}
      <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -left-4 -bottom-4 size-20 bg-white/10 rounded-full blur-xl"></div>

      <h3 className="text-base font-bold mb-4 relative z-10">
        Hạn mức rút tiền
      </h3>
      <div className="space-y-4 relative z-10">
        <div>
          <div className="flex justify-between text-xs mb-1 opacity-80">
            <span>Ngày hôm nay</span>
            <span>5.0M / 500M</span>
          </div>
          <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-white h-full rounded-full"
              style={{ width: "5%" }}
            ></div>
          </div>
        </div>
        <div className="p-3 bg-white/10 rounded-lg text-xs leading-relaxed border border-white/10">
          <span className="material-symbols-outlined text-[14px] align-middle mr-1">
            info
          </span>
          Phí rút tiền: 11.000₫/lần. Miễn phí rút tiền định kỳ vào thứ 3 hàng
          tuần.
        </div>
        <button className="w-full py-2 bg-white text-primary font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors">
          Nâng hạn mức
        </button>
      </div>
    </div>
  );
}
