"use client";
import { AuthForm } from "@/features/auth/AuthForm";
import { AuthHeader, AuthFooter } from "@/features/auth/AuthLayoutComponents";

export default function LoginPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans flex flex-col min-h-screen overflow-x-hidden text-[#1b0d0d]">
      <AuthHeader />

      <main className="flex-1 bg-[#d41111]/5 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-10 lg:px-40 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 h-full">
            {/* Left: Promotional Banner */}
            <div className="hidden lg:flex flex-col flex-1 max-w-[500px] text-center lg:text-left items-center lg:items-start">
              <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-xl mb-8">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyNeNWpSF6WkosNw4fr8D0k8sQ5a1cB7jff50sHEaG3bgD038Z7zoKWJha7ec4QNcEorcfbFVHnlU16b1ZgnqHZVH3KogY_4Yn3DpGj49LVAcWJtEqvT4GOKcax8oW54qsu3owKgRiXqxywVBN_W6V35qOo-unxw2gF2-zgJj44TndXwtnJexxaB9UrGs7-ayFErBcyvy-pDrjjnZPi41Q4PxJHf5CquJkPWdjElvVi3FU6dEpFXGiafAu6rG4WM2Fs22-SPlinyM')",
                  }}
                ></div>
              </div>
              <h1 className="text-[#1b0d0d] text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
                Săn sale ngày lễ - Ưu đãi cực mê
              </h1>
              <p className="text-[#5c3838] text-lg font-medium">
                Hàng ngàn deal hot giảm đến 50% đang chờ đón bạn trong dịp lễ
                sắp tới.
              </p>
            </div>

            {/* Right: Auth Card */}
            <AuthForm />
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
