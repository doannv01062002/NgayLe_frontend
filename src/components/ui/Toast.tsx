"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const duration = toast.duration || 3000;

  useEffect(() => {
    const intervalTime = 50;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - step;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  useEffect(() => {
    if (progress <= 0) {
      // Defer removal slightly to avoid conflicts
      const t = setTimeout(() => onClose(toast.id), 0);
      return () => clearTimeout(t);
    }
  }, [progress, toast.id, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "check";
      case "error":
        return "priority_high";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          border: "border-green-500",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          titleColor: "text-green-800",
          progressBg: "bg-green-500",
        };
      case "error":
        return {
          border: "border-red-500",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          titleColor: "text-red-800",
          progressBg: "bg-red-500",
        };
      case "warning":
        return {
          border: "border-yellow-500",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          titleColor: "text-yellow-800",
          progressBg: "bg-yellow-500",
        };
      default: // info
        return {
          border: "border-blue-500",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          titleColor: "text-blue-800",
          progressBg: "bg-blue-500",
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative w-80 bg-white rounded-lg shadow-2xl overflow-hidden border-l-4 ${styles.border}`}
    >
      <div className="flex items-center p-4 gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}
        >
          <span className="material-symbols-outlined text-lg font-bold">
            {getIcon()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-sm ${styles.titleColor}`}>
            {toast.title ||
              (toast.type === "success"
                ? "Thành công"
                : toast.type === "error"
                ? "Lỗi"
                : "Thông báo")}
          </h4>
          <p className="text-sm text-gray-600 break-words mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>

        <button
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          onClick={() => onClose(toast.id)}
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <div className="h-1 bg-gray-100 w-full mt-auto">
        <motion.div
          className={`h-full ${styles.progressBg}`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div
      aria-live="assertive"
      className="fixed top-24 right-4 z-[100] flex flex-col space-y-4 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
