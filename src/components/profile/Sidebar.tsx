"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profileService, UserProfile } from "@/services/profileService";

export function Sidebar() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.userId) {
          profileService
            .getProfile(user.userId)
            .then(setProfile)
            .catch(console.error);
        }
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }
  }, []);

  const menuItems = [
    { label: "Hồ sơ của tôi", icon: "person", href: "/profiles" },
    { label: "Đơn mua", icon: "receipt_long", href: "/profiles/orders" },
    { label: "Thông báo", icon: "notifications", href: "/notifications" },
    { label: "Kho Voucher", icon: "confirmation_number", href: "/vouchers" },
    { label: "Đã thích", icon: "favorite", href: "/wishlist" },
  ];

  return (
    <div className="w-64 shrink-0 hidden lg:block">
      <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="material-symbols-outlined">person</span>
            </div>
          )}
        </div>
        <div>
          <div className="font-bold text-gray-800 text-sm truncate max-w-[120px]">
            {profile?.fullName || "Tài khoản"}
          </div>
          <Link
            href="/profiles"
            className="text-gray-500 text-xs flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors group ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-red-600"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-400 group-hover:text-red-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
