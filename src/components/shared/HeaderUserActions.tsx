"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authService, AuthResponse } from "@/services/authService";
import { profileService, UserProfile } from "@/services/profileService";
import { ShopResponse } from "@/services/shopService";
import { useRouter } from "next/navigation";

export function HeaderUserActions() {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [shop, setShop] = useState<ShopResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check local storage for user
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
          // Fetch profile to get avatar
          if (userData.userId) {
            profileService
              .getProfile(userData.userId)
              .then((data) => {
                setProfile(data);
              })
              .catch((e) =>
                console.error("Could not fetch profile for header avatar", e)
              );

            // Fetch cart count
            import("@/services/cartService").then(({ cartService }) => {
              cartService
                .getCart(userData.userId)
                .then((cart) => {
                  setCartCount(cart.totalItems);
                })
                .catch((e) => console.error("Could not fetch cart", e));
            });

            // Fetch shop status
            import("@/services/shopService").then(({ shopService }) => {
              shopService
                .getCurrentShop()
                .then((s) => setShop(s))
                .catch((e) => console.error("Could not fetch shop status", e));
            });
          }
        } catch (e) {
          console.error("Invalid user data in local storage");
          localStorage.removeItem("user");
          setUser(null);
          setProfile(null);
          setCartCount(0);
          setShop(null);
        }
      } else {
        setUser(null);
        setProfile(null);
        setCartCount(0);
        setShop(null);
      }
    };

    checkAuth();
    window.addEventListener("auth-changed", checkAuth);
    return () => {
      window.removeEventListener("auth-changed", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        import("@/services/cartService").then(({ cartService }) => {
          cartService
            .getCart(userData.userId)
            .then((cart) => {
              setCartCount(cart.totalItems);
            })
            .catch((e) => console.error("Could not fetch cart", e));
        });
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setProfile(null);
    setCartCount(0);
    setShop(null);
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-6 lg:gap-8 shrink-0">
      {/* User */}
      {user ? (
        <div className="relative group cursor-pointer">
          <Link
            href="/profiles"
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className="relative">
              {profile?.avatarUrl ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/80 group-hover:border-yellow-300 transition-all shadow-md">
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span className="material-symbols-outlined text-[26px] group-hover:text-yellow-200 transition-colors">
                  account_circle
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium hidden lg:block group-hover:text-yellow-200 max-w-[80px] truncate">
              {user.fullName ? user.fullName.split(" ").pop() : "Tài khoản"}
            </span>
          </Link>

          {/* Dropdown for logout */}
          <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-48 z-50">
            <div className="bg-white rounded-md shadow-xl py-1 text-gray-800 border border-gray-100 animate-fade-in-up">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-bold truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <Link
                href="/profiles"
                className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700"
              >
                Hồ sơ của tôi
              </Link>
              <Link
                href="/profiles/orders"
                className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700"
              >
                Đơn hàng của tôi
              </Link>
              <Link
                href={shop ? "/seller" : "/seller/register"}
                className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700"
              >
                Kênh người bán
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex flex-col items-center gap-0.5 group"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[26px] group-hover:text-yellow-200 transition-colors">
              account_circle
            </span>
          </div>
          <span className="text-[11px] font-medium hidden lg:block group-hover:text-yellow-200">
            Đăng nhập
          </span>
        </Link>
      )}

      {/* Notifications */}
      <Link
        href="/notifications"
        className="flex flex-col items-center gap-0.5 group relative"
      >
        <div className="relative">
          <span className="material-symbols-outlined text-[26px] group-hover:text-yellow-200 transition-colors">
            notifications
          </span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-[#d0011b] border-[1.5px] border-[#d0011b]">
            3
          </span>
        </div>
        <span className="text-[11px] font-medium hidden lg:block group-hover:text-yellow-200">
          Thông báo
        </span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex flex-col items-center gap-0.5 group relative"
      >
        <div className="relative">
          <span className="material-symbols-outlined text-[26px] group-hover:text-yellow-200 transition-colors">
            shopping_cart
          </span>
          <span className="absolute -top-1 -right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#d0011b] border-[0px]">
            {cartCount}
          </span>
        </div>
        <span className="text-[11px] font-medium hidden lg:block group-hover:text-yellow-200">
          Giỏ hàng
        </span>
      </Link>
    </div>
  );
}
