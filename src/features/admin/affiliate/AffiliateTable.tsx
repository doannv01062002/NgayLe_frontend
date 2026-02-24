"use client";

import { useEffect, useState } from "react";
import {
  adminAffiliateService,
  AffiliatePartnerDTO,
  CommissionHistoryDTO,
} from "@/services/adminAffiliateService";
import { useToast } from "@/context/ToastContext";

export function AffiliateTable() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("ALL");
  const [partners, setPartners] = useState<AffiliatePartnerDTO[]>([]);
  const [history, setHistory] = useState<CommissionHistoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ email: "", source: "" });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "HISTORY") {
        const data = await adminAffiliateService.getHistory({
          page,
          size: 10,
        });
        setHistory(data.content);
        setTotalPages(data.totalPages);
      } else {
        const data = await adminAffiliateService.getPartners({
          status: activeTab === "ALL" ? undefined : activeTab,
          search: debouncedSearch,
          page,
          size: 10,
        });
        setPartners(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [activeTab, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [activeTab, page, debouncedSearch]);

  const handleApprove = async (id: number) => {
    if (!confirm("Xác nhận phê duyệt đối tác này?")) return;
    try {
      await adminAffiliateService.approvePartner(id);
      showToast("Phê duyệt thành công", "success");
      fetchData();
    } catch (error) {
      showToast("Phê duyệt thất bại", "error");
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm("Xác nhận từ chối/khóa đối tác này?")) return;
    try {
      await adminAffiliateService.rejectPartner(id);
      showToast("Đã từ chối đối tác", "success");
      fetchData();
    } catch (error) {
      showToast("Thao tác thất bại", "error");
    }
  };

  const handleCreatePartner = async () => {
    try {
      await adminAffiliateService.createPartner(createForm);
      showToast("Thêm đối tác thành công", "success");
      setIsCreateModalOpen(false);
      setCreateForm({ email: "", source: "" });
      if (activeTab !== "ALL") setActiveTab("ALL");
      else fetchData();
    } catch (error) {
      showToast(
        "Thêm đối tác thất bại (Email không tồn tại hoặc đã là đối tác)",
        "error"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col dark:bg-[#1a2632] dark:border-gray-700">
      {/* Tabs */}
      <div className="border-b border-gray-200 px-6 dark:border-gray-700 flex justify-between items-center">
        <div className="flex gap-8 overflow-x-auto">
          {["ALL", "PENDING", "ACTIVE", "HISTORY"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 border-b-[3px] pb-3 pt-4 px-1 whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <p className="text-sm font-bold leading-normal">
                {tab === "ALL" && "Tất cả đối tác"}
                {tab === "PENDING" && "Chờ duyệt"}
                {tab === "ACTIVE" && "Đang hoạt động"}
                {tab === "HISTORY" && "Lịch sử hoa hồng"}
              </p>
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm đối tác
        </button>
      </div>

      {/* Toolbar (Only for Partners tab) */}
      {activeTab !== "HISTORY" && (
        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2 min-w-[280px] max-w-md bg-gray-50 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/50 focus-within:bg-white transition-all dark:bg-gray-800 dark:focus-within:bg-gray-800 dark:focus-within:border-primary">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 focus:ring-0 p-0 text-gray-900 dark:text-white dark:placeholder-gray-400"
              placeholder="Tìm kiếm đối tác (Tên, Email)..."
              type="text"
            />
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        {activeTab === "HISTORY" ? (
          <table className="w-full text-sm text-left text-gray-900 dark:text-white">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Đối tác</th>
                <th className="px-6 py-3 font-medium">Loại giao dịch</th>
                <th className="px-6 py-3 font-medium">Số tiền</th>
                <th className="px-6 py-3 font-medium">Mô tả</th>
                <th className="px-6 py-3 font-medium">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Đang tải...
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white hover:bg-gray-50 dark:bg-[#1a2632] dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">#{item.id}</td>
                    <td className="px-6 py-4 font-medium">
                      {item.partnerName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          item.type === "EARNED"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : item.type === "WITHDRAWN"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.amount)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left text-gray-900 dark:text-white">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium" scope="col">
                  Đối tác
                </th>
                <th className="px-6 py-3 font-medium" scope="col">
                  Nguồn
                </th>
                <th className="px-6 py-3 font-medium text-right" scope="col">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 font-medium text-right" scope="col">
                  Doanh thu
                </th>
                <th className="px-6 py-3 font-medium text-right" scope="col">
                  Hoa hồng
                </th>
                <th className="px-6 py-3 font-medium text-center" scope="col">
                  Trạng thái
                </th>
                <th className="px-6 py-3 font-medium text-center" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    Đang tải...
                  </td>
                </tr>
              ) : partners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr
                    key={partner.id}
                    className="bg-white hover:bg-gray-50 transition-colors group dark:bg-[#1a2632] dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {partner.avatar ? (
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-gray-700"
                            style={{
                              backgroundImage: `url('${partner.avatar}')`,
                            }}
                          ></div>
                        ) : (
                          <div className="flex items-center justify-center rounded-full size-10 bg-purple-100 text-purple-600 font-bold text-sm border border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
                            {partner.name ? partner.name.charAt(0) : "?"}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-gray-900 font-medium dark:text-white">
                            {partner.name}
                          </p>
                          <p className="text-gray-500 text-xs dark:text-gray-400">
                            ID: #{partner.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 text-xs font-medium border border-gray-200 rounded px-2 py-0.5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                          {partner.source || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {partner.orders}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(partner.revenue)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-primary">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(partner.commission)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {partner.status === "ACTIVE" && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          Hoạt động
                        </span>
                      )}
                      {partner.status === "PENDING" && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">
                          Chờ duyệt
                        </span>
                      )}
                      {partner.status === "BANNED" && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                          Đã khóa
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {partner.status === "PENDING" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApprove(partner.id)}
                            className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors dark:hover:bg-green-900/20"
                            title="Phê duyệt"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              check
                            </span>
                          </button>
                          <button
                            onClick={() => handleReject(partner.id)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors dark:hover:bg-red-900/20"
                            title="Từ chối"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              close
                            </span>
                          </button>
                        </div>
                      ) : (
                        <button className="text-gray-500 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                          <span className="material-symbols-outlined text-[20px]">
                            more_horiz
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Trang {page + 1} / {totalPages || 1}
        </span>
        <div className="inline-flex -space-x-px text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md dark:bg-gray-800">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 dark:text-white">
                Thêm đối tác mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Email người dùng
                  </label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="nhap@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Nguồn giới thiệu
                  </label>
                  <select
                    value={createForm.source}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, source: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Chọn nguồn...</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreatePartner}
                  disabled={!createForm.email || !createForm.source}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  Thêm đối tác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
