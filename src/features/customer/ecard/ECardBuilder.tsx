"use client";

import React from "react";
import { ECardState } from "@/types/ecard";
import { ECardCanvas } from "./ECardCanvas";
import { ECardEditor } from "./ECardEditor";
import { ECardPreviewModal } from "./ECardPreviewModal";

export function ECardBuilder() {
  // History management
  const [history, setHistory] = React.useState<ECardState[]>([
    {
      template: null,
      message: "",
      messageStyle: {
        fontFamily: "Dancing Script",
        color: "#ad2bee",
        fontSize: 24,
        bold: false,
        italic: false,
        alignment: "center",
      },
      messagePosition: { x: 50, y: 50 }, // Initial position (percentage or pixels, logic to decide)
      stickers: [],
    },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(false);

  const currentState = history[currentIndex];

  // Wrapper for setState to push to history
  // We need to type this carefully to match React.Dispatch<React.SetStateAction<ECardState>>
  const setECardState: React.Dispatch<React.SetStateAction<ECardState>> = (
    action
  ) => {
    const newState =
      typeof action === "function"
        ? (action as (prev: ECardState) => ECardState)(currentState)
        : action;

    // Don't push if state hasn't changed JSON-wise (simple check)
    if (JSON.stringify(newState) === JSON.stringify(currentState)) return;

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
        <ECardCanvas
          state={currentState}
          setState={setECardState}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={currentIndex > 0}
          canRedo={currentIndex < history.length - 1}
        />
        <ECardEditor
          state={currentState}
          setState={setECardState}
          onPreview={() => setShowPreview(true)}
        />
      </div>

      <ECardPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        state={currentState}
      />
    </>
  );
}
