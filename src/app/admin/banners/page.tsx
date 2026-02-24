"use client";
import React, { useState, useEffect } from "react";
import BannerStatsCards from "@/features/admin/banner/BannerStatsCards";
import BannerFilter from "@/features/admin/banner/BannerFilter";
import BannerTable from "@/features/admin/banner/BannerTable";
import BannerModal from "@/features/admin/banner/BannerModal";
import { bannerService } from "@/services/bannerService";
import { Banner, BannerPosition, BannerStats } from "@/types/banner";
import { useToast } from "@/context/ToastContext";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AdminBannersPage() {
  const { success, error } = useToast();
  const [stats, setStats] = useState<BannerStats>({
    active: 0,
    totalViews: 0,
    avgCtr: 0,
    expiringSoon: 0,
  });
  const [banners, setBanners] = useState<Banner[]>([]);
  const [allBanners, setAllBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("ALL");
  const [positionFilter, setPositionFilter] = useState<BannerPosition | "">("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | undefined>(
    undefined
  );

  // Delete Confirmation State
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch strict filter for position if selected
      const response = await bannerService.getBanners({
        position: positionFilter,
        // For tabs, we fetch wider range and filter client side to accurate dates
        // because API isActive=true might include expiring soon etc.
        // However, if list is huge this is bad. For admin panel < 100 items it's fine.
        size: 100,
      });

      const content = response.content;
      setAllBanners(content);
      const statsData = await bannerService.getStats();
      setStats(statsData);

      // Client side filtering for tabs
      let filtered = content;
      const now = new Date();

      if (activeTab === "ACTIVE") {
        // Active AND currently running (time-wise)
        filtered = content.filter(
          (b) =>
            b.isActive &&
            (!b.endTime || new Date(b.endTime) > now) &&
            (!b.startTime || new Date(b.startTime) <= now)
        );
      } else if (activeTab === "SCHEDULED") {
        // To be run in future
        filtered = content.filter(
          (b) => b.startTime && new Date(b.startTime) > now
        );
      } else if (activeTab === "ENDED") {
        // Ended
        filtered = content.filter(
          (b) => b.endTime && new Date(b.endTime) < now
        );
      }

      setBanners(filtered);
    } catch (e) {
      console.error("Failed to load banners", e);
      error("Không thể tải danh sách banner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, positionFilter]);

  const handleCreate = () => {
    setEditingBanner(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await bannerService.deleteBanner(deleteId);
        success("Đã xóa banner thành công");
        fetchData();
      } catch (e) {
        error("Xóa thất bại");
      }
      setDeleteId(null);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await bannerService.toggleStatus(id);
      success("Cập nhật trạng thái thành công");
      fetchData();
    } catch (e) {
      error("Cập nhật trạng thái thất bại");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <nav className="flex text-sm text-gray-500 mb-6 dark:text-gray-400">
        <a href="/admin" className="hover:text-primary transition-colors">
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <span className="cursor-default">Marketing</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium dark:text-white">
          Quản lý Banner
        </span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight dark:text-white">
            Quản lý Banner & Quảng cáo
          </h2>
          <p className="text-gray-500 mt-1 dark:text-gray-400">
            Quản lý vị trí hiển thị, tải lên hình ảnh mới và theo dõi hiệu quả
            chiến dịch.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-all active:scale-95 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Thêm Banner Mới
        </button>
      </div>

      <BannerStatsCards stats={stats} />

      <BannerFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        position={positionFilter}
        onPositionChange={setPositionFilter}
        total={banners.length}
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="size-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <BannerTable
          banners={banners}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <BannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        banner={editingBanner}
        onSave={fetchData}
        existingBanners={allBanners}
      />

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa banner này? Hành động này không thể hoàn tác."
        confirmText="Xóa bỏ"
        type="danger"
      />
    </div>
  );
}
