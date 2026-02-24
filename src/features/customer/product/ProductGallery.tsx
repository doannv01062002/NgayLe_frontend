"use client";
import { useState, useEffect } from "react";

interface ProductGalleryProps {
  images?: string[];
  productName?: string;
  promotionPercent?: number;
}

export function ProductGallery({
  images,
  productName,
  promotionPercent,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || "");

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage("");
    }
  }, [images]);

  if (!images || images.length === 0) {
    // Fallback if no images
    return (
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Không có ảnh</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 group">
        {(promotionPercent || 0) > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-[#d0011b] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            -{promotionPercent}%
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {selectedImage && (
          <img
            alt={productName || "Product Main"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            src={selectedImage}
          />
        )}
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`aspect-square rounded border overflow-hidden hover:opacity-80 transition-all ${
              selectedImage === img
                ? "border-[#d0011b] ring-1 ring-[#d0011b]"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Thumbnail ${idx}`}
              className="w-full h-full object-cover"
              src={img}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
