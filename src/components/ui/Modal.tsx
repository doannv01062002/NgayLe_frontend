"use client";
import React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  type?: "default" | "success" | "danger" | "warning";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  type = "default",
  className,
}: ModalProps) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "bg-white dark:bg-[#1f1f1f] rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex justify-between items-center ${
            type === "success"
              ? "bg-green-50 border-green-100"
              : type === "danger"
              ? "bg-red-50 border-red-100"
              : "bg-white dark:bg-[#1f1f1f] border-slate-100 dark:border-slate-800"
          }`}
        >
          <h3
            className={`font-bold text-lg ${
              type === "success"
                ? "text-green-700"
                : type === "danger"
                ? "text-red-700"
                : "text-slate-800 dark:text-white"
            }`}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-transparent border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-slate-600 dark:text-slate-300">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
