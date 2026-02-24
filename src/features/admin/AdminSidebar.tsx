"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { authService } from "@/services/authService";

import { usePathname, useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    await authService.logout();
    router.push("/login"); // Redirect explicit to login
    setShowLogoutConfirm(false);
  };

  const sidebarItems = [
    { icon: "dashboard", label: "Tổng quan", href: "/admin" },
    { icon: "shopping_cart", label: "Đơn hàng", href: "/admin/orders" },
    { icon: "inventory_2", label: "Sản phẩm", href: "/admin/products" },
    {
      icon: "storefront",
      label: "Quản lý Cửa Hàng (Shop)",
      href: "/admin/shops",
    },
    { icon: "group", label: "Quản lý Người Dùng", href: "/admin/users" },
  ];

  const marketingItems = [
    {
      icon: "web",
      label: "Landing Page Event",
      href: "/admin/landing-pages",
    },
    { icon: "article", label: "CMS Blog", href: "/admin/blog" },
    {
      icon: "ad_units",
      label: "Banner Quảng cáo",
      href: "/admin/banners",
    },
    {
      icon: "confirmation_number",
      label: "Quản lý Voucher",
      href: "/admin/vouchers",
    },
    {
      icon: "redeem",
      label: "Gợi ý quà tặng",
      href: "/admin/gift-suggestions",
    },
    { icon: "mail", label: "Thiệp điện tử", href: "/admin/ecards" },
    // { icon: "hub", label: "Quản lý Affiliate", href: "/admin/affiliate" },
    { icon: "bolt", label: "Quản lý Flash Sale", href: "/admin/flash-sales" },
    { icon: "celebration", label: "Sự kiện & Lễ hội", href: "/admin/holidays" },
    { icon: "recommend", label: "Gợi ý hôm nay", href: "/admin/suggestions" },
  ];

  const supportItems = [
    { icon: "chat", label: "Hệ thống Chat", href: "/admin/chat" },
    {
      icon: "rate_review",
      label: "Quản lý Đánh giá",
      href: "/admin/reviews",
    },
    {
      icon: "help_center",
      label: "FAQ / Hỗ trợ",
      href: "/admin/support",
    },
  ];

  const systemItems = [
    { icon: "analytics", label: "Báo cáo", href: "/admin/reports" },
    { icon: "settings", label: "Cài đặt", href: "/admin/settings" },
  ];

  return (
    <>
      <aside
        className={cn(
          "flex-shrink-0 border-r border-[#e7edf3] bg-white dark:bg-[#1a2632] dark:border-[#2b3a4a] hidden md:flex flex-col z-20 h-screen sticky top-0 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#e7edf3] dark:border-[#2b3a4a]">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6A1cIDgPEyk1gdAnbFr_XC4HmJWvk4xtJq-Ke-lAZZ8NgnGIqidnb3tKgMRbSUve0B7YGDjHRPvIh7efLaoRBagmwF8ycGJHVMIgclQRhWmqHig1yNivQzEKFVGm2isXhTW94yNGAxj6HJDz7HXLLPDTVn-dRPsItQWZA8QeR2v-WD8iUWGmWiR2SnKj4d-2LHWWdbiO0JFXBH0ir0xnoihkxwDUE1ndVtieK6_jqHpqKtP7zpllGoK84b9iFnXEHIFxblL4YpqI')",
                }}
              ></div>
              <h1 className="text-lg font-bold tracking-tight text-[#0d141b] dark:text-white truncate">
                Ngayle Admin
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors",
              isCollapsed && "mx-auto"
            )}
          >
            <span className="material-symbols-outlined">
              {isCollapsed ? "menu_open" : "menu"}
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors min-h-[44px]",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] dark:text-[#94a3b8]",
                isCollapsed && "justify-center px-0"
              )}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: "24px" }}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <p className="text-sm font-medium leading-normal truncate">
                  {item.label}
                </p>
              )}
            </Link>
          ))}

          <div className="my-2 border-t border-[#e7edf3] dark:border-[#2b3a4a]"></div>
          {!isCollapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
              Marketing & Nội dung
            </p>
          )}
          {marketingItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors min-h-[44px]",
                pathname.startsWith(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] dark:text-[#94a3b8]",
                isCollapsed && "justify-center px-0"
              )}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: "24px" }}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <p className="text-sm font-medium leading-normal truncate">
                  {item.label}
                </p>
              )}
            </Link>
          ))}

          <div className="my-2 border-t border-[#e7edf3] dark:border-[#2b3a4a]"></div>
          {!isCollapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
              Chăm sóc khách hàng
            </p>
          )}
          {supportItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors min-h-[44px]",
                pathname.startsWith(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] dark:text-[#94a3b8]",
                isCollapsed && "justify-center px-0"
              )}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: "24px" }}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <p className="text-sm font-medium leading-normal truncate">
                  {item.label}
                </p>
              )}
            </Link>
          ))}

          <div className="my-2 border-t border-[#e7edf3] dark:border-[#2b3a4a]"></div>
          {!isCollapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-[#4c739a] uppercase tracking-wider">
              Hệ thống
            </p>
          )}

          {systemItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors min-h-[44px]",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-[#4c739a] hover:bg-[#e7edf3] dark:hover:bg-[#2b3a4a] dark:text-[#94a3b8]",
                isCollapsed && "justify-center px-0"
              )}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: "24px" }}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <p className="text-sm font-medium leading-normal truncate">
                  {item.label}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-[#e7edf3] dark:border-[#2b3a4a]">
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg bg-background-light dark:bg-[#2b3a4a]",
              isCollapsed && "flex-col justify-center p-0 bg-transparent gap-4"
            )}
          >
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 border border-gray-200 dark:border-gray-600"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcxuv5i9qOcIgsHFKYNE7QJJDXpvUywZ9Ru2352cQV31fDzzYCRw66F8vltW0ancrnNMHVlykO1UAKnh5BavMZWBYdjrwDmDEe7WdPPUc0oS2waLd-QA5Y-okHT1QrWob3BjerCdWK9zHPY0IfK-huvO_w-HQsZhZXOJ1L3LQWcq_07UFnuXWdLI4s9KOfIlAqcci0aAQ8cR8u6jsAWRUQKASPwGcfoPnRqdT3dmCcAN80wWq94a9V4phwi7tn2DGParMAF4Dz-Ak')",
              }}
            ></div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden flex-1">
                <p className="text-sm font-medium text-[#0d141b] dark:text-white truncate">
                  Admin Quản trị
                </p>
                <p className="text-xs text-[#4c739a] dark:text-[#94a3b8] truncate">
                  admin@ngayle.com
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={cn(
                "p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all",
                !isCollapsed && "ml-auto"
              )}
              title="Đăng xuất"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Đăng xuất"
        type="danger"
        footer={
          <>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
            >
              Hủy
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Đăng xuất
            </button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?</p>
      </Modal>
    </>
  );
}
