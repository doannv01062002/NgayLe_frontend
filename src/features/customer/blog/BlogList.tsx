import Link from "next/link";

interface BlogPostProps {
  image: string;
  category: string;
  date: string;
  title: string;
  snippet: string;
  products?: {
    name: string;
    image: string;
    price: string;
  }[];
}

function BlogPost({
  image,
  category,
  date,
  title,
  snippet,
  products,
}: BlogPostProps) {
  return (
    <div className="bg-white dark:bg-[#1b0f0d] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <article className="flex flex-col sm:flex-row gap-4 mb-4 group">
        <div className="w-full sm:w-64 h-40 shrink-0 overflow-hidden rounded-md">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-primary text-[10px] uppercase font-bold rounded">
                {category}
              </span>
              <span className="text-gray-400 text-xs">• {date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {snippet}
            </p>
          </div>
          <div className="mt-3">
            <a
              className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-primary flex items-center gap-1"
              href="#"
            >
              Đọc tiếp
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </article>

      {/* Embedded Product Widget */}
      {products && products.length > 0 && (
        <div className="bg-gray-50 dark:bg-[#251a18] rounded-lg p-4">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">
              shopping_bag
            </span>
            Sản phẩm được nhắc đến
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((product, idx) => (
              <a
                key={idx}
                className="bg-white dark:bg-[#1b0f0d] p-2 rounded border border-gray-100 dark:border-gray-700 hover:border-primary transition-colors group"
                href="#"
              >
                <div
                  className="aspect-square bg-gray-100 rounded mb-2 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                ></div>
                <div className="text-xs font-medium text-gray-900 dark:text-gray-200 line-clamp-2 group-hover:text-primary mb-1">
                  {product.name}
                </div>
                <div className="text-primary font-bold text-sm">
                  {product.price}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BlogList() {
  const posts = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCr-9bu2TAsoRqMwCRz_SudlSsHDUZwBCkjoZ1ERYFrFIjGfdleshah2n8kj6ZVLU7JZPglDh4m9vHxli0ZB7SFIxFfVQirn7QOWO9I-penllcXvAMxTZ_eywrW_vsUqAsu0A3xB0flJqWJMrTeRwYHGP-_aGWFos_tz76df8bCDhaL4TG6tIyfw2A25Z6PVPWCAWPU4od53KwLfQCTXt8Snt6FFSLlJJj8lh2fWt7jjeqfH-VArQPp1j_DPzRYQmEgdM1Em0FXwZo",
      category: "Quà tặng",
      date: "15/02/2024",
      title: 'Gợi ý 10 món quà Chocolate "đốn tim" nàng dịp Valentine Trắng',
      snippet:
        "Valentine Trắng (14/3) là dịp để các chàng trai đáp lễ. Đừng bỏ lỡ những hộp chocolate thủ công tinh tế đang làm mưa làm gió trên thị trường...",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8kUFAusftT9Tl-ERZmue6XzffDrVvHDvo7cj3di2q4ZW_n4V0XpzQhvMXB23G-dm0Kzdl5Ydsf7yKnYczHTpa_W5Mbht55ltjHCT0k05Uj0W0nLCz_O3QI7ZYs_D297JO7h1bCv2dyjtViqP2h360upGJNKw9xJxs0yOrkfofHzQDWS0Qe4PK9mtezpNkdQM26gpQ2Tg8M1TlcKaMrf04ELwXkt8JQ-7iX5SSH2zP5hVb9jy479qptsmAvWwxu-TcTvYxM8m3ocY",
      category: "Thời trang",
      date: "10/02/2024",
      title: "Xu hướng Áo Dài cách tân 2024: Vừa truyền thống vừa hiện đại",
      snippet:
        "Năm nay, các mẫu áo dài với chất liệu lụa tơ tằm và họa tiết gốm sứ đang được chị em săn đón nhiệt tình để diện Tết và chụp ảnh...",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBBEiWAXs9U8yEXXy010y14VqYOVTD7CFYPP5FeIeY3GRyl_a0yoRhdBvfnvHAGSOZZmYawdO2_u4As9ceYEaUoJS-yM_9l8HhJWO3887AvwFnVmhhLlrSxGPL01WtqYJ2uDmV63XqsC0QVHnR9OvPVDvK34k3Wnjyf0lvPDBWdkk1gk2dajFhHfNcMQK5N3GI-8OeDI2uPDaazyd-QD43lYkRpxqa2gjRNDhBmxxjKr9WD6ImSSbP4RF-WBnNoThWL067NElnymZk",
      category: "Mẹo vặt",
      date: "05/02/2024",
      title: "Lịch nghỉ lễ 30/4 - 1/5 và kế hoạch dọn nhà thần tốc",
      snippet:
        "Bạn đang lo lắng về việc dọn dẹp nhà cửa trước kỳ nghỉ lễ dài ngày? Hãy tham khảo ngay lịch trình dọn dẹp khoa học và các dụng cụ hỗ trợ đắc lực này.",
      products: [
        {
          name: "Robot Hút Bụi Xiaomi Vacuum E10",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAAmSTvmiciTr6UYv2aakv0bqfZi1tL66UL-QbSnAgBHaUzClfM_TIaje4pnM5WDCEke1S-1ccBw8gtuWT0c8azFcXQwEuSlSQJU-4ZyI4tYFan5YksOSurOeIYzbY1po95kvmIphIXeoRovd61x_6Klnlxo6PUdImWr9KWJwE5_9WXzti5RAoe3zVGaSsp4aKaRNydYkVlnWdtydtk7dP3nifVEXF7qOWCbBMafhOMB8cJ5Zgi-Unud3UHnsrgSgr2zQEmBByivgs",
          price: "3.490.000đ",
        },
        {
          name: "Bộ Lau Nhà 360 Độ LocknLock",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCv99B4HXm70mxlRyQZPq7Sp2a9ZQPdrWUNfmxaALVuuni8UzLju22ubt2ajN3wC90No5jx7RcWUIHfwkYsId6pCunyIeC1WnxnpD7gRV2GqdETrMMQX_lVlZRCtuXyexkSrXVmqOOi5H1bqYxXKOBeMI1qTjH7olxtEbmztIdwvZICeMLmzIrbBrhbTiSbyKVLyiq-0LjJu_NKQ0xnegDcRAMZFlhzwiZWDqealB9Jk4SnvMEKbXaCBrIisP1Mx-qV9EzfWZoaN6M",
          price: "450.000đ",
        },
        {
          name: "Hộp Vải Đựng Đồ Đa Năng",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Zgzp9FCuMKYVCDHwy6O26rRD_BjtxSdHqrTCYKYgT35KcwHapgeziKSVdB_lrHB_UZrNS2lLBumJuVQr6Ip0PhbXcY-HRSK0xgzQsTFbMelRNlAIS4ITgMgAkcrASyS-3bDJAtuCmct1qQdrgyddcWSPmqJYkFUTdnOYeLl_U08_grtqW0Up-q2hCHqT73WPpRpLqPZ2Fj4NpeUovJ1MjMFtOzbtIwiaBbEHtfsY019x6jygoOluy10Lu7dcrAGVAHsPhSLdv_0",
          price: "89.000đ",
        },
        {
          name: "Máy Lọc Không Khí Sharp",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD0k0YtU9mJ7bW780gr5HID3s9o_TDHYtcS-UQmP0HOKhhywjUdzwlrCLr_-M9d8s1BnME_Ave8G1r3nA3oeIsryqeQKA_cSd4CZ-w6sxVi3SyEFPvvEaSiT9uBGl_oQvkPkvJRdTuGBrZ14Y0Q9-A9dDOFm2FPC8vowwnk4G1ncd89XkyxQ8zr269sytsCr-BIUQfiuXTbcku8uxL9HSR85wsAoBw9hRqTzR0B5G8jC1SZ-Qoj7zxrLlaR0PhO6W9Tgzp0cv-yv2c",
          price: "2.190.000đ",
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-sm"></span>
          Mới nhất
        </h2>
        <a
          className="text-sm text-primary font-medium hover:underline flex items-center"
          href="#"
        >
          Xem tất cả
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </a>
      </div>
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 bg-white dark:bg-[#1b0f0d] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Xem thêm bài viết cũ hơn
        </button>
      </div>
    </section>
  );
}
