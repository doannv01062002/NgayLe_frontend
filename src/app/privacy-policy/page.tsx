import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              Chính sách bảo mật
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert">
              <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-6">
                Tại Ngayle.com, chúng tôi coi trọng sự riêng tư của bạn. Chính
                sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và
                bảo vệ thông tin cá nhân của bạn.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                1. Thông tin chúng tôi thu thập
              </h3>
              <p>
                Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng
                tôi khi đăng ký tài khoản, mua hàng, tham gia khảo sát hoặc liên
                hệ hỗ trợ. Thông tin này có thể bao gồm tên, email, số điện
                thoại, địa chỉ và thông tin thanh toán.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                2. Cách chúng tôi sử dụng thông tin
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Xử lý đơn hàng và cung cấp dịch vụ.</li>
                <li>Cải thiện trải nghiệm người dùng trên website.</li>
                <li>
                  Gửi thông báo về các chương trình khuyến mãi (nếu bạn đăng
                  ký).
                </li>
                <li>Phát hiện và ngăn chặn gian lận.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                3. Chia sẻ thông tin
              </h3>
              <p>
                Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba.
                Chúng tôi chỉ chia sẻ thông tin với các đối tác cung cấp dịch vụ
                (như đơn vị vận chuyển, cổng thanh toán) để thực hiện đơn hàng
                của bạn.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                4. Bảo mật dữ liệu
              </h3>
              <p>
                Chúng tôi áp dụng các biện pháp kỹ thuật và an ninh để bảo vệ dữ
                liệu cá nhân của bạn khỏi truy cập trái phép, mất mát hoặc tiết
                lộ không mong muốn.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                5. Quyền của bạn
              </h3>
              <p>
                Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá
                nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi
                hoặc thông qua cài đặt tài khoản.
              </p>

              <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:{" "}
                  <a
                    href="mailto:privacy@ngayle.com"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    privacy@ngayle.com
                  </a>
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
