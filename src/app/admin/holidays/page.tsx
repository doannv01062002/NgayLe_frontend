"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { cn } from "@/lib/utils";

interface HolidayDTO {
  holidayId?: number;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  effectType: string; // "SNOW", "LIXI", "FIREWORKS", "NONE"
}

export default function HolidayAdminPage() {
  const [holidays, setHolidays] = useState<HolidayDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingHoliday, setEditingHoliday] = useState<HolidayDTO | null>(null);

  const toast = useToast();

  // Default form data
  const [formData, setFormData] = useState<Partial<HolidayDTO>>({
    name: "",
    slug: "",
    startDate: "",
    endDate: "",
    isActive: true,
    effectType: "NONE",
  });

  const effectOptions = [
    { value: "NONE", label: "Không có hiệu ứng", icon: "block" },
    {
      value: "TET_BLOSSOMS",
      label: "Tết Nguyên Đán (Hoa + Lì xì)",
      icon: "local_florist",
    },
    {
      value: "MID_AUTUMN",
      label: "Trung Thu (Lá thu + Đèn lồng)",
      icon: "light_mode",
    },
    { value: "VU_LAN", label: "Lễ Vu Lan (Hoa Sen + Lotus)", icon: "spa" },
    {
      value: "CHRISTMAS",
      label: "Giáng Sinh (Tuyết + Ông già Noel)",
      icon: "ac_unit",
    },
  ];

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const res = await api.get("/holidays");
      setHolidays(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách ngày lễ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleOpenCreate = () => {
    setEditingHoliday(null);
    setFormData({
      name: "",
      slug: "",
      startDate: "",
      endDate: "",
      isActive: true,
      effectType: "NONE",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (holiday: HolidayDTO) => {
    setEditingHoliday(holiday);
    setFormData({
      ...holiday,
      startDate: holiday.startDate ? holiday.startDate.split("T")[0] : "",
      endDate: holiday.endDate ? holiday.endDate.split("T")[0] : "",
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (holiday: HolidayDTO) => {
    if (!holiday.holidayId) return;
    try {
      const updated = { ...holiday, isActive: !holiday.isActive };
      // Ensure dates are string format YYYY-MM-DD if needed, but backend DTO handles LocalDate usually
      // We just send the object.
      await api.put(`/holidays/${holiday.holidayId}`, updated);

      setHolidays((prev) =>
        prev.map((h) =>
          h.holidayId === holiday.holidayId
            ? { ...h, isActive: !h.isActive }
            : h
        )
      );
      toast.success(
        `Đã ${updated.isActive ? "bật" : "tắt"} sự kiện: ${holiday.name}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/holidays/${deleteId}`);
      toast.success("Đã xóa thành công");
      fetchHolidays();
    } catch (error) {
      toast.error("Xóa thất bại");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHoliday && editingHoliday.holidayId) {
        await api.put(`/holidays/${editingHoliday.holidayId}`, formData);
        toast.success("Cập nhật thành công");
      } else {
        await api.post("/holidays", formData);
        toast.success("Tạo mới thành công");
      }
      setIsModalOpen(false);
      fetchHolidays();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link className="text-gray-400 hover:text-gray-500" href="/admin">
              <span className="material-symbols-outlined text-xl">home</span>
            </Link>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>
            <span className="text-sm font-medium text-primary dark:text-blue-400">
              Quản lý sự kiện & Lễ hội
            </span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Sự kiện và Hiệu ứng
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý các sự kiện, ngày lễ và hiệu ứng hình ảnh (tuyết, lì xì...)
            trên toàn trang.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined mr-2 -ml-1 text-lg">
              add
            </span>
            Thêm sự kiện mới
          </button>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-[#2b3a4a] overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-[#2b3a4a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tên sự kiện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Hiệu ứng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1a2632]">
                {holidays.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Chưa có sự kiện nào
                    </td>
                  </tr>
                )}
                {holidays.map((holiday) => (
                  <tr
                    key={holiday.holidayId}
                    className="hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {holiday.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {holiday.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{holiday.startDate || "N/A"}</div>
                      <div className="text-xs">
                        đến {holiday.endDate || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {holiday.effectType !== "NONE" ? (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {
                            effectOptions.find(
                              (o) => o.value === holiday.effectType
                            )?.label
                          }
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400 italic">
                          Không có
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => handleToggleActive(holiday)}
                        className={cn(
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                          holiday.isActive ? "bg-green-500" : "bg-gray-200"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            holiday.isActive ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(holiday)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => setDeleteId(holiday.holidayId!)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingHoliday ? "Cập nhật Sự kiện" : "Tạo sự kiện mới"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên sự kiện <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({ ...formData, name, slug: generateSlug(name) });
              }}
              placeholder="Ví dụ: Tết Nguyên Đán 2026"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
            <input
              type="text"
              className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              value={formData.slug}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Ngày kết thúc
              </label>
              <input
                type="date"
                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Hiệu ứng Animation
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {effectOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() =>
                    setFormData({ ...formData, effectType: opt.value })
                  }
                  className={cn(
                    "cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-colors",
                    formData.effectType === opt.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                >
                  <span
                    className={cn(
                      "material-symbols-outlined",
                      formData.effectType === opt.value
                        ? "text-primary"
                        : "text-gray-400"
                    )}
                  >
                    {opt.icon}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      formData.effectType === opt.value
                        ? "text-primary"
                        : "text-gray-700"
                    )}
                  >
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              checked={formData.isActive || false}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Kích hoạt ngay sau khi tạo
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-600 shadow-sm"
            >
              {editingHoliday ? "Lưu thay đổi" : "Tạo sự kiện"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Xóa sự kiện"
        message="Bạn có chắc chắn muốn xóa sự kiện này? Hành động này không thể hoàn tác."
        type="danger"
        confirmText="Xóa bỏ"
      />
    </>
  );
}
