"use client";

import dynamic from "next/dynamic";

const GlobalChatWidget = dynamic(
  () =>
    import("@/features/customer/chat/GlobalChatWidget").then(
      (mod) => mod.GlobalChatWidget
    ),
  { ssr: false }
);
const HolidayEffect = dynamic(
  () =>
    import("@/features/common/HolidayEffect").then((mod) => mod.HolidayEffect),
  { ssr: false }
);
const VisitTracker = dynamic(
  () =>
    import("@/components/common/VisitTracker").then((mod) => mod.VisitTracker),
  { ssr: false }
);

export function GlobalWidgets() {
  return (
    <>
      <HolidayEffect />
      <VisitTracker />
      <GlobalChatWidget />
    </>
  );
}
