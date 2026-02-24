export function CheckoutPayment() {
  return (
    <section className="bg-white dark:bg-[#1a0a0a] rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500">
            payments
          </span>
          <h3 className="text-lg font-bold">Phương thức thanh toán</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
          <span className="material-symbols-outlined text-sm">lock</span>
          Được bảo mật an toàn
        </div>
      </div>
      <div className="space-y-2">
        {/* COD */}
        <label className="flex items-center gap-4 p-4 border border-primary bg-red-50/10 rounded-lg cursor-pointer transition-all shadow-sm ring-1 ring-primary">
          <input
            checked
            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            name="payment"
            type="radio"
            readOnly
          />
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded border border-gray-200">
            <span className="material-symbols-outlined text-gray-600">
              attach_money
            </span>
          </div>
          <div className="flex-1">
            <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
            <p className="text-xs text-gray-500">
              Thanh toán bằng tiền mặt khi nhận hàng
            </p>
          </div>
          <span className="material-symbols-outlined text-primary">
            check_circle
          </span>
        </label>
        {/* E-Wallet */}
        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
          <input
            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            name="payment"
            type="radio"
          />
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded border border-gray-200 p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="MoMo"
              className="object-contain w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTvZI0Aj7-Y3g20niR-zLWkfpTPT3fakV08jtjDSDAbo3ZyXJw2WjeQGdR6kPqjW28yGwcqlRHaxt8-YmDtY9OGJWo3HKOJmOiQUXGMRa7YfsYJuugRvcWeqlScQJxiw8BUZ6wCOpuX8DOmfd4kjtdJX1p3uz_fWc1dXxCIV8GACTTti_k7vTI00nFF_IyVQ-xo43jw6JWSppT2MiULQ4ZA2Xf6aW5OZogE31J6FH1jrrFIJUgjjcdJeDFu0JCzf3b3GqQGIDo_w4"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">Ví MoMo</p>
            <p className="text-xs text-gray-500">
              Giảm thêm 10k khi thanh toán qua MoMo
            </p>
          </div>
        </label>
        {/* Credit Card */}
        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
          <input
            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            name="payment"
            type="radio"
          />
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded border border-gray-200">
            <span className="material-symbols-outlined text-gray-600">
              credit_card
            </span>
          </div>
          <div className="flex-1">
            <p className="font-medium">Thẻ Tín dụng/Ghi nợ</p>
            <div className="flex gap-2 mt-1">
              <div className="h-4 w-6 bg-gray-200 rounded"></div>
              <div className="h-4 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </label>
      </div>
    </section>
  );
}
