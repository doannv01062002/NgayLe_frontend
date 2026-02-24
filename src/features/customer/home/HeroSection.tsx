"use client";
import { useState, useEffect, useRef } from "react";
import { bannerService } from "@/services/bannerService";
import { Banner, BannerPosition } from "@/types/banner";

export function HeroSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await bannerService.getPublicBanners(
          BannerPosition.HOME_SLIDER
        );
        const subData = await bannerService.getPublicBanners(
          BannerPosition.HOME_SUB_BANNER
        );
        setBanners([...data, ...subData]);
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };
    fetchBanners();
  }, []);

  const sliders = banners.filter(
    (b) => b.position === BannerPosition.HOME_SLIDER
  );
  const subBanners = banners
    .filter((b) => b.position === BannerPosition.HOME_SUB_BANNER)
    .slice(0, 2);

  const trackedBanners = useRef<Set<number>>(new Set());

  // Auto slide
  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliders.length]);

  // Track view for sub-banners
  useEffect(() => {
    if (subBanners.length > 0) {
      subBanners.forEach((b) => {
        if (!trackedBanners.current.has(b.bannerId)) {
          bannerService.trackView(b.bannerId).catch(console.error);
          trackedBanners.current.add(b.bannerId);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners]);

  // Track view for active slider
  useEffect(() => {
    if (sliders.length > 0 && sliders[currentSlide]) {
      const bannerId = sliders[currentSlide].bannerId;
      if (!trackedBanners.current.has(bannerId)) {
        bannerService.trackView(bannerId).catch(console.error);
        trackedBanners.current.add(bannerId);
      }
    }
  }, [currentSlide, sliders]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  };

  const handleBannerClick = async (banner: Banner) => {
    try {
      await bannerService.trackClick(banner.bannerId);
      if (banner.linkUrl) {
        window.open(banner.linkUrl, "_blank");
      }
    } catch (e) {
      console.error("Click track failed", e);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:h-[300px]">
      {/* Main Carousel (Left) */}
      <div className="col-span-1 lg:col-span-8 h-full rounded-xl overflow-hidden shadow-sm relative group cursor-pointer">
        {sliders.length > 0 ? (
          <>
            <div
              onClick={() => handleBannerClick(sliders[currentSlide])}
              className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('${sliders[currentSlide].imageUrl}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                {/* Optional: Add text overlay if title is meant to be shown, currently image contains text often */}
                {/* <h2 className="text-white text-3xl font-bold mb-2">{sliders[currentSlide].title}</h2> */}
              </div>
            </div>

            {/* Controls */}
            {sliders.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm cursor-pointer z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm cursor-pointer z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {sliders.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        idx === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // Fallback or Skeleton
          <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">
            Loading banners...
          </div>
        )}
      </div>

      {/* Side Banners (Right) */}
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-2 h-full">
        {subBanners.map((banner) => (
          <div
            key={banner.bannerId}
            onClick={() => handleBannerClick(banner)}
            className="flex-1 rounded-xl bg-cover bg-center relative overflow-hidden group cursor-pointer"
            style={{
              backgroundImage: `url('${banner.imageUrl}')`,
            }}
          >
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition duration-300"></div>
          </div>
        ))}
        {subBanners.length === 0 && (
          // Placeholder if no sub banners
          <>
            <div className="flex-1 rounded-xl bg-gray-100 animate-pulse"></div>
            <div className="flex-1 rounded-xl bg-gray-100 animate-pulse"></div>
          </>
        )}
      </div>
    </div>
  );
}
