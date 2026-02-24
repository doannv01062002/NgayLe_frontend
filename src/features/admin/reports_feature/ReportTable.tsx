"use client";

import { useEffect, useState } from "react";
import { adminReportService, ReportDTO } from "@/services/adminReportService";

export function ReportTable() {
  const [reports, setReports] = useState<ReportDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const [detailReport, setDetailReport] = useState<ReportDTO | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await adminReportService.getReports({
        page,
        size: 10,
        status: selectedStatus === "ALL" ? undefined : selectedStatus,
        targetType: selectedType === "ALL" ? undefined : selectedType,
      });
      setReports(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, selectedStatus, selectedType]);

  const handleStatusChange = async (reportId: number, newStatus: string) => {
    if (!confirm("Bạn có chắc chắn muốn thay đổi trạng thái báo cáo này?"))
      return;
    try {
      await adminReportService.updateStatus(reportId, newStatus);
      fetchReports();
      if (detailReport && detailReport.reportId === reportId) {
        setDetailReport({ ...detailReport, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a] overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 dark:border-[#2b3a4a] flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4">
          <select
            className="form-select text-sm border-gray-300 rounded-lg dark:bg-[#2b3a4a] dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="RESOLVED">Đã giải quyết</option>
            <option value="REJECTED">Đã từ chối</option>
          </select>

          <select
            className="form-select text-sm border-gray-300 rounded-lg dark:bg-[#2b3a4a] dark:border-gray-600 dark:text-white focus:ring-primary focus:border-primary"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(0);
            }}
          >
            <option value="ALL">Tất cả loại vi phạm</option>
            <option value="PRODUCT">Sản phẩm</option>
            <option value="SHOP">Cửa hàng</option>
            <option value="USER">Người dùng</option>
            <option value="REVIEW">Đánh giá</option>
          </select>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Tổng số: <span className="font-semibold">{totalElements}</span> báo
          cáo
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#2b3a4a] dark:text-gray-300">
            <tr>
              <th className="px-6 py-4 font-medium">Đối tượng vi phạm</th>
              <th className="px-6 py-4 font-medium">Lý do</th>
              <th className="px-6 py-4 font-medium">Người báo cáo</th>
              <th className="px-6 py-4 font-medium">Ngày tạo</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#2b3a4a]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Không có báo cáo nào.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report.reportId}
                  className="bg-white dark:bg-[#1a2632] hover:bg-gray-50 dark:hover:bg-[#243442] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {/* Just showing ID for now, ideally fetch name or link */}
                        {report.targetType} #{report.targetId}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {report.targetId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="max-w-xs truncate"
                      title={report.description}
                    >
                      <p className="font-medium text-gray-900 dark:text-white">
                        {report.reason}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {report.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {report.reporterName || "Ẩn danh"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {report.reporterEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleString("vi-VN")
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === "RESOLVED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : report.status === "REJECTED"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {report.status === "RESOLVED"
                        ? "Đã xử lý"
                        : report.status === "REJECTED"
                        ? "Đã từ chối"
                        : "Chờ xử lý"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setDetailReport(report)}
                        className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                        title="Xem chi tiết"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </button>
                      {/* Quick Actions (only for PENDING) */}
                      {report.status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(report.reportId, "RESOLVED")
                            }
                            className="text-green-600 hover:text-green-700 dark:text-green-400"
                            title="Chấp nhận / Xử lý"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              check_circle
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(report.reportId, "REJECTED")
                            }
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                            title="Từ chối / Bỏ qua"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              cancel
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#2b3a4a]">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Trang {page + 1} / {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-[#2b3a4a] disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Trước
          </button>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-[#2b3a4a] disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Sau
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {detailReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#2b3a4a] flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Chi tiết Báo cáo #{detailReport.reportId}
              </h3>
              <button
                onClick={() => setDetailReport(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Đối tượng báo cáo
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold dark:bg-gray-700 dark:text-gray-300">
                    {detailReport.targetType}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ID: {detailReport.targetId}
                  </span>
                  {/* Here we could add a link to view the actual item */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Người báo cáo
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {detailReport.reporterName} ({detailReport.reporterEmail})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Lý do
                </label>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {detailReport.reason}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Mô tả chi tiết
                </label>
                <p className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#243442] p-3 rounded-lg text-sm">
                  {detailReport.description || "Không có mô tả chi tiết."}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ngày tạo
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {detailReport.createdAt
                    ? new Date(detailReport.createdAt).toLocaleString("vi-VN")
                    : ""}
                </p>
              </div>
              {detailReport.status === "PENDING" && (
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      handleStatusChange(detailReport.reportId, "RESOLVED");
                      setDetailReport({ ...detailReport, status: "RESOLVED" }); // Optimistic update or close
                      setDetailReport(null);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow-sm"
                  >
                    Xử lý xong
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(detailReport.reportId, "REJECTED");
                      setDetailReport({ ...detailReport, status: "REJECTED" });
                      setDetailReport(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg shadow-sm"
                  >
                    Từ chối
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
