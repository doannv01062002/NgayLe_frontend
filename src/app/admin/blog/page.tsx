import { BlogStats } from "@/features/admin/blog/BlogStats";
import { BlogTable } from "@/features/admin/blog/BlogTable";

export default function AdminBlogPage() {
  return (
    <>
      <nav className="flex text-sm text-gray-500 mb-6 dark:text-gray-400">
        <a
          className="hover:text-primary transition-colors dark:hover:text-primary"
          href="#"
        >
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <a
          className="hover:text-primary transition-colors dark:hover:text-primary"
          href="#"
        >
          Marketing
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium dark:text-white">
          Quản lý Blog
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight dark:text-white">
            Quản lý Blog &amp; Cẩm nang
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Soạn thảo, chỉnh sửa và tối ưu hóa nội dung quà tặng dịp lễ.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="font-medium">Viết bài mới</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <BlogStats />

        {/* Filters & Search Area */}
        <div className="bg-white dark:bg-[#1a2634] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">
                search
              </span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Tìm kiếm bài viết theo tiêu đề, từ khóa..."
              type="text"
            />
          </div>
          {/* Filters Group */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select className="form-select block w-full sm:w-auto pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>Tất cả danh mục</option>
              <option>Quà tặng Valentine</option>
              <option>Quà Tết Nguyên Đán</option>
              <option>Sinh nhật</option>
              <option>Mẹo vặt &amp; Hướng dẫn</option>
            </select>
            <select className="form-select block w-full sm:w-auto pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>Tất cả trạng thái</option>
              <option>Đã xuất bản</option>
              <option>Bản nháp</option>
              <option>Chờ duyệt</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto">
              <span className="material-symbols-outlined text-[20px]">
                filter_list
              </span>
              <span className="text-sm font-medium">Lọc nâng cao</span>
            </button>
          </div>
        </div>

        <BlogTable />
      </div>
    </>
  );
}
