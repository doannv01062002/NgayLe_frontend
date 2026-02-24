"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

export function VisitTracker() {
  const pathname = usePathname();
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only track if:
    // 1. Not an admin page
    // 2. Not already tracked in this session (sessionStorage)
    // 3. Not already tracked in this component mount (useRef) to avoid double calls in StrictMode
    if (pathname?.startsWith("/admin")) return;

    const hasRecorded = sessionStorage.getItem("visit_recorded");

    if (!hasRecorded && !trackedRef.current) {
      trackedRef.current = true;
      setTimeout(() => {
        api
          .post("common/track-visit")
          .then(() => {
            sessionStorage.setItem("visit_recorded", "true");
          })
          .catch((err) => console.error("Visit tracking failed", err));
      }, 2000);
    }
  }, [pathname]);

  return null;
}
