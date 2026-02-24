import Link from "next/link";
import { useEffect, useState } from "react";
import { SupportArticleDTO } from "@/services/adminSupportService";
import { supportService } from "@/services/supportService";

interface SupportFAQProps {
  articles: SupportArticleDTO[];
  loading: boolean;
}

export function SupportFAQ({ articles, loading }: SupportFAQProps) {
  const [topArticles, setTopArticles] = useState<SupportArticleDTO[]>([]);

  useEffect(() => {
    supportService
      .getArticles({ page: 0, size: 5, sort: "viewCount" })
      .then((res) => setTopArticles(res.content))
      .catch((err) => console.error("Failed to fetch top articles", err));
  }, []);

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat-support"));
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 pb-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Popular Articles */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500">
              local_fire_department
            </span>
            Bài viết hỗ trợ
          </h3>
          <div className="bg-white dark:bg-[#1e2936] rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Đang tải...</div>
            ) : articles.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Không tìm thấy bài viết nào.
              </div>
            ) : (
              articles.map((article, idx) => (
                <details
                  key={article.id || idx}
                  className="group border-b border-gray-100 dark:border-gray-700 last:border-none"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors list-none">
                    <span className="font-medium text-gray-900 dark:text-white group-open:text-primary">
                      {article.title}
                    </span>
                    <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div
                    className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-h-[300px] overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: article.content || "",
                    }}
                  ></div>
                </details>
              ))
            )}
            <div className="p-3 text-center border-t border-gray-100 dark:border-gray-700">
              <Link
                className="text-primary text-sm font-bold hover:underline inline-flex items-center gap-1"
                href="#"
              >
                Xem tất cả câu hỏi
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Right Column: Sidebar / Contact */}
        <div className="w-full md:w-80 flex flex-col gap-6">
          {/* Quick Links Box */}
          <div className="bg-white dark:bg-[#1e2936] rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              Chủ đề nổi bật
            </h4>
            <ul className="space-y-3">
              {topArticles.length > 0 ? (
                topArticles.map((article) => (
                  <li key={article.id}>
                    <Link
                      className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        article
                      </span>
                      <span className="line-clamp-1">{article.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">Đang tải...</li>
              )}
            </ul>
          </div>
          {/* Contact Support Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary text-white rounded-full p-2">
                <span className="material-symbols-outlined text-[20px]">
                  headset_mic
                </span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Cần hỗ trợ thêm?
              </h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-blue-300 mb-4">
              Đội ngũ chăm sóc khách hàng của Ngayle luôn sẵn sàng hỗ trợ bạn
              24/7.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleOpenChat}
                className="w-full py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
                Chat ngay
              </button>
              <button
                onClick={() =>
                  (window.location.href = "mailto:support@ngayle.com")
                }
                className="w-full py-2 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                Gửi yêu cầu
              </button>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-500">Hotline: </span>
                <a
                  className="text-xs font-bold text-red-600 hover:underline"
                  href="tel:19001234"
                >
                  1900 1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
