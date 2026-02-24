"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "Bán hàng",
    items: [
      {
        href: "/seller/orders",
        label: "Quản lý Đơn hàng",
        icon: "receipt_long",
        badge: 12,
      },
      {
        href: "/seller/products",
        label: "Quản lý Sản phẩm",
        icon: "inventory_2",
      },
    ],
  },
  {
    label: "Tăng trưởng",
    items: [
      {
        href: "/seller/marketing",
        label: "Kênh Marketing",
        icon: "campaign",
      },
      {
        href: "/seller/finance",
        label: "Tài chính",
        icon: "account_balance_wallet",
      },
      {
        href: "/seller/analytics",
        label: "Dữ liệu",
        icon: "insights",
      },
    ],
  },
  {
    label: "Chăm sóc khách hàng",
    items: [
      {
        href: "/seller/messages",
        label: "Tin nhắn",
        icon: "chat",
        badge: 3,
      },
    ],
  },
  {
    label: "Cửa hàng",
    items: [
      {
        href: "/seller/settings",
        label: "Thiết lập Shop",
        icon: "storefront",
      },
    ],
  },
];

export function SellerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (!pathname) return false;
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#1a2632] border-r border-gray-200 dark:border-[#2b3a4a] flex flex-col shrink-0 h-screen sticky top-0 z-20">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-[#2b3a4a]">
        <div className="flex items-center gap-2 text-primary">
          <span
            className="material-symbols-outlined text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_mall
          </span>
          <span className="text-xl font-bold tracking-tight text-black dark:text-white">
            NgayLe<span className="text-primary">.com</span>
          </span>
        </div>
      </div>

      {/* Shop Profile Tiny */}
      <div className="p-4 border-b border-gray-200 dark:border-[#2b3a4a]">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-gray-100 dark:border-gray-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMfgqe6zmQj6CB_R_GlHwvw4iN_3Vt3sBNakgMmMeAPhPUWddm6ILwMXpEDD-pWgIf_KJfNt3F9ubRKekDCPvakRJY1iX3EbGtD7ot8eQatQ_ohVnAvufqMoKSFbkGYZfOtiL_GCXYCtJjJZ_TlbB0vjIQlhhZ-4dG0R-PrIsDMuoYxJB7qCLUpW77tEaBCHRNwrN2TFhtmGEEZp1KPxcO_ITfiHFUQSd-m1YPAOg-3Ywy66x0S1zWUADxr6FeidKaEOSrJHshV_w')",
            }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-gray-900 dark:text-white text-sm font-bold truncate">
              Shop Quà Tặng Việt
            </h1>
            <p className="text-gray-500 text-xs truncate">
              ngayle.com/shopquatang
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        <Link
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
            isActive("/seller", true)
              ? "bg-red-50 dark:bg-red-900/10 text-primary"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2b3a4a]"
          )}
          href="/seller"
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: isActive("/seller", true)
                ? "'FILL' 1"
                : "'FILL' 0",
            }}
          >
            dashboard
          </span>
          <span className="text-sm font-medium">Tổng quan</span>
        </Link>

        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="pt-2 pb-1 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {group.label}
            </div>
            {group.items.map((item, itemIndex) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={itemIndex}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                    active
                      ? "bg-red-50 dark:bg-red-900/10 text-primary"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2b3a4a]"
                  )}
                  href={item.href}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-[#2b3a4a]">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#2b3a4a] hover:bg-gray-200 dark:hover:bg-[#344558] text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-lg">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
