import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              Điều khoản sử dụng
            </h1>

            <div className="prose prose-red max-w-none dark:prose-invert">
              <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-6">
                Chào mừng bạn đến với Ngayle.com. Bằng việc truy cập và sử dụng
                trang web của chúng tôi, bạn đồng ý tuân thủ các điều khoản và
                điều kiện dưới đây.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                1. Giới thiệu
              </h3>
              <p>
                Ngayle.com là nền tảng thương mại điện tử chuyên cung cấp các
                sản phẩm quà tặng, voucher và dịch vụ cho các ngày lễ tết. Chúng
                tôi cam kết mang đến trải nghiệm mua sắm an toàn và tin cậy.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                2. Tài khoản người dùng
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Bạn cần đăng ký tài khoản để sử dụng một số tính năng của
                  Ngayle.com.
                </li>
                <li>
                  Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của
                  mình.
                </li>
                <li>
                  Bạn chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản
                  của bạn.
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                3. Quyền lợi và nghĩa vụ của người bán
              </h3>
              <p>
                Người bán trên Ngayle.com cam kết cung cấp thông tin sản phẩm
                chính xác, trung thực và đảm bảo chất lượng hàng hóa/dịch vụ như
                đã mô tả.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                4. Chính sách thanh toán và hoàn tiền
              </h3>
              <p>
                Chúng tôi cung cấp nhiều phương thức thanh toán an toàn. Chính
                sách hoàn tiền sẽ được áp dụng trong các trường hợp sản phẩm lỗi
                hoặc không đúng mô tả theo quy định bảo vệ người tiêu dùng.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                5. Giải quyết tranh chấp
              </h3>
              <p>
                Mọi tranh chấp phát sinh sẽ được giải quyết trên tinh thần
                thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được
                đưa ra cơ quan có thẩm quyền theo pháp luật Việt Nam.
              </p>

              <div className="mt-12 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lần cập nhật cuối: 02/01/2026. Chúng tôi có quyền thay đổi các
                  điều khoản này bất cứ lúc nào và sẽ thông báo trên website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
