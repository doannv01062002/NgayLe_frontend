import React from "react";

interface ProductDescriptionProps {
  description?: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold bg-slate-50 dark:bg-slate-800 p-3 rounded mb-4">
        MÔ TẢ SẢN PHẨM
      </h2>
      <div
        className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
