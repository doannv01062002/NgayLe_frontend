import React from "react";
import { Banner } from "@/types/banner";

interface Props {
  banners: Banner[];
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export default function BannerTable({
  banners,
  onEdit,
  onDelete,
  onToggleStatus,
}: Props) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
              <th className="px-6 py-4 w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-4">Banner</th>
              <th className="px-6 py-4">Chiến dịch / Vị trí</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4">Hiệu quả</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map((banner) => (
              <tr
                key={banner.bannerId}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="w-32 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">
                      {banner.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {banner.position}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">
                        calendar_today
                      </span>
                      <span>{formatDate(banner.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">
                        event
                      </span>
                      <span>{formatDate(banner.endTime)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {banner.views?.toLocaleString() || 0} Views
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      {banner.ctr?.toFixed(1) || 0}% CTR
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      banner.isActive
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <div
                      className={`size-1.5 rounded-full ${
                        banner.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    {banner.isActive ? "Đang chạy" : "Tạm dừng"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onToggleStatus(banner.bannerId)}
                      className={`p-1.5 rounded-md border ${
                        banner.isActive
                          ? "text-green-600 border-green-200 hover:bg-green-50"
                          : "text-gray-400 border-gray-200 hover:bg-gray-50"
                      }`}
                      title={banner.isActive ? "Tắt" : "Bật"}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {banner.isActive ? "toggle_on" : "toggle_off"}
                      </span>
                    </button>
                    <button
                      onClick={() => onEdit(banner)}
                      className="p-1.5 rounded-md text-blue-600 border border-blue-200 hover:bg-blue-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(banner.bannerId)}
                      className="p-1.5 rounded-md text-red-600 border border-red-200 hover:bg-red-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  Chưa có banner nào. Hãy tạo mới ngay!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
