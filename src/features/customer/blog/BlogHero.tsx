import Link from "next/link";

export function BlogHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[380px]">
      {/* Main Featured Article */}
      <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm md:col-span-1 h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <div
          className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDD8vx-jgAVTTX-SHFIuheUB76gvgOK-JbuDp-yAsVitfUvwaha0IC9UHvDQztHitle249UC55EgDvZk47VaVSHZjPqlXEQnGo4D-vFMzIFNXufxmj_7WMxzKLcVx-wyzMyRCC0iEMVbQRXBXROTGAHsIjDauYltxcOcb6g-H2gnhzXX_kAH__o5eOTy6-qHfSmZtgYJbCsFEmysz9MmiV9FQPaSC6U3GtjOMTDJ2IWQfEJRNTpy00SOiAveYnkg8mGffuZ_-y8bTg')",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 p-6 z-20 flex flex-col gap-2">
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded w-fit">
            Nổi bật
          </span>
          <h2 className="text-white text-2xl font-bold leading-tight group-hover:text-red-200 transition-colors">
            Tuyệt chiêu chọn quà 8/3 ý nghĩa khiến nàng "xiêu lòng" ngay lập tức
          </h2>
          <div className="flex items-center gap-2 text-gray-300 text-xs mt-1">
            <span>Bởi Admin</span>
            <span>•</span>
            <span>2 giờ trước</span>
          </div>
        </div>
      </div>

      {/* Secondary Featured Articles */}
      <div className="flex flex-col gap-4 h-full">
        <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm flex-1">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6LlmUzoyWBvT84ySIA7-gIv4woEDlNYKHdXt6NVnvcnNPyNxxv5L7ao5_zGmevZtDIgoMF7HWIuiP-GqcoGQMZ5OKLH43B_K6Ft7KkOxIXk9VSfr7t1bGTKB5CnDbqY0GOg1smSkPt9_NhSvh_tQxY5dnBeEa4GJAayrvp4LEjSZgtJWBGrNkgCPVzbQ30lj9rGdXCz7Xwkk8kYi5QPkr36OyWn3nj5OlT4eKUyWemSMfQHEmS9Ay8yQ54nQOAfcGi7rhUtFUuBo')",
            }}
          ></div>
          <div className="absolute bottom-0 left-0 p-4 z-20">
            <h3 className="text-white text-lg font-bold leading-tight group-hover:text-red-200">
              Cách bày mâm ngũ quả chuẩn phong thủy 3 miền Bắc - Trung - Nam
            </h3>
          </div>
        </div>
        <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm flex-1">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgNPmdZh8VWtoej-6FeVxGjPS6a-CXVEFIBRUPVerAGs-4vBw6QoVFc4MsVIYLgfZixxKZb4eYFsqKAkNXZdMX4p6ecqK9Mj8ONpeLyYpubbiQagynLjpBQAk01Lq-mDMkOBZHxO-cqwTIgmTHvGkXVFyrnZsTgxzjfgVicd7GnLmA6THrqoKgilDQDExOr8tX3_nxZi2h9YAgtBEqNMYv30850FIH-pNJmFa6f4P9uRjnRwD2wMJ-wuh9Aevji3eCwl0YhjYESqA')",
            }}
          ></div>
          <div className="absolute bottom-0 left-0 p-4 z-20">
            <h3 className="text-white text-lg font-bold leading-tight group-hover:text-red-200">
              Top 5 địa điểm hẹn hò lãng mạn ngày Valentine tại Sài Gòn
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
