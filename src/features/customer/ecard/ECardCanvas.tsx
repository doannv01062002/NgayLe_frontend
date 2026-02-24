"use client";
import React from "react";
import { ECardState } from "@/types/ecard";
import { cn } from "@/lib/utils";

interface ECardCanvasProps {
  state: ECardState;
  setState: React.Dispatch<React.SetStateAction<ECardState>>;
  readOnly?: boolean;
  id?: string;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function ECardCanvas({
  state,
  setState,
  readOnly = false,
  id,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: ECardCanvasProps) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [dragState, setDragState] = React.useState<{
    id: string | null;
    type: "sticker" | "message";
    action: "drag" | "resize";
    startX: number;
    startY: number;
    initialLeft: number;
    initialTop: number;
    initialScale: number;
    initialFontSize: number;
  }>({
    id: null,
    type: "sticker",
    action: "drag",
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,
    initialScale: 1,
    initialFontSize: 0,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleRemoveSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag start when clicking delete
    setState((prev) => ({
      ...prev,
      stickers: prev.stickers.filter((s) => s.id !== id),
    }));
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    id: string | null,
    type: "sticker" | "message",
    action: "drag" | "resize",
    x: number,
    y: number,
    scale: number = 1,
    fontSize: number = 0
  ) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();

    setDragState({
      id,
      type,
      action,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: x,
      initialTop: y,
      initialScale: scale,
      initialFontSize: fontSize,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (readOnly) return;
    if (dragState.type === "sticker" && !dragState.id) return;
    if (dragState.type === "message" && dragState.id !== "message-drag") return;
    if (!dragState.id) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    if (dragState.action === "resize") {
      if (dragState.type === "message") {
        // Resize message (font size)
        // Simple logic: dragging right/down increases size
        const newSize = Math.max(10, dragState.initialFontSize + deltaX / 5); // slow down resizing speed
        setState((prev) => ({
          ...prev,
          messageStyle: {
            ...prev.messageStyle,
            fontSize: newSize,
          },
        }));
      } else if (dragState.type === "sticker") {
        // Resize sticker (scale)
        const newScale = Math.max(0.1, dragState.initialScale + deltaX / 100);
        setState((prev) => ({
          ...prev,
          stickers: prev.stickers.map((s) => {
            if (s.id === dragState.id) {
              return { ...s, scale: newScale };
            }
            return s;
          }),
        }));
      }
    } else {
      // Dragging
      if (dragState.type === "message") {
        setState((prev) => ({
          ...prev,
          messagePosition: {
            x: dragState.initialLeft + deltaX,
            y: dragState.initialTop + deltaY,
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          stickers: prev.stickers.map((s) => {
            if (s.id === dragState.id) {
              return {
                ...s,
                x: dragState.initialLeft + deltaX,
                y: dragState.initialTop + deltaY,
              };
            }
            return s;
          }),
        }));
      }
    }
  };

  const handleMouseUp = () => {
    if (readOnly) return;
    setDragState((prev) => ({ ...prev, id: null }));
  };

  const handleDownload = async () => {
    try {
      const { toPng } = await import("html-to-image");
      const element = document.getElementById(id || "ecard-canvas-node");
      if (!element) return;

      let dataUrl;
      try {
        dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
      } catch (e) {
        console.warn("Retrying download with skipFonts...", e);
        dataUrl = await toPng(element, {
          cacheBust: true,
          pixelRatio: 2,
          skipFonts: true,
        });
      }
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `ecard-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {!readOnly && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Xem trước
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="text-gray-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-[#efe7f3] dark:hover:bg-[#2b3a4a]"
              title="Tải ảnh về máy"
            >
              <span className="material-symbols-outlined">download</span>
            </button>
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={cn(
                "text-gray-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-[#efe7f3] dark:hover:bg-[#2b3a4a]",
                !canUndo &&
                  "opacity-30 cursor-not-allowed hover:text-gray-500 hover:bg-transparent"
              )}
              title="Hoàn tác"
            >
              <span className="material-symbols-outlined">undo</span>
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={cn(
                "text-gray-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-[#efe7f3] dark:hover:bg-[#2b3a4a]",
                !canRedo &&
                  "opacity-30 cursor-not-allowed hover:text-gray-500 hover:bg-transparent"
              )}
              title="Làm lại"
            >
              <span className="material-symbols-outlined">redo</span>
            </button>
            <button
              className="text-gray-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-[#efe7f3] dark:hover:bg-[#2b3a4a]"
              title="Phóng to"
            >
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
          </div>
        </div>
      )}

      {/* The Canvas Area */}
      <div
        id={id || "ecard-canvas-node"}
        className={cn(
          "relative flex-grow bg-[#efe7f3] dark:bg-[#1a2632] rounded-2xl border-2 border-dashed border-[#dcd0e3] dark:border-gray-700 flex items-center justify-center p-8 overflow-hidden group/canvas shadow-inner min-h-[500px]",
          readOnly &&
            "border-none bg-transparent dark:bg-transparent p-0 min-h-0"
        )}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={containerRef}
      >
        {/* Card Mockup */}
        <div className="relative w-full max-w-[480px] aspect-[3/4] bg-white shadow-2xl rounded-lg overflow-hidden select-none">
          {/* Background Image */}
          {state.template ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt="Card Background"
              className="w-full h-full object-cover opacity-90 pointer-events-none"
              src={state.template.thumbnailUrl}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              Chưa chọn mẫu thiệp
            </div>
          )}

          {/* Text Overlay Layer */}
          <div
            className={cn(
              "absolute p-4 z-20 max-w-[90%] group/text",
              !readOnly &&
                "cursor-move hover:ring-1 hover:ring-blue-400 rounded border border-transparent hover:border-blue-200"
            )}
            style={{
              left: state.messagePosition?.x ?? 50,
              top: state.messagePosition?.y ?? 150,
            }}
            onMouseDown={(e) =>
              handleMouseDown(
                e,
                "message-drag",
                "message",
                "drag",
                state.messagePosition?.x ?? 50,
                state.messagePosition?.y ?? 150
              )
            }
          >
            <p
              style={{
                fontFamily: state.messageStyle.fontFamily,
                color: state.messageStyle.color,
                fontSize: `${state.messageStyle.fontSize}px`,
                fontWeight: state.messageStyle.bold ? "bold" : "normal",
                fontStyle: state.messageStyle.italic ? "italic" : "normal",
                textAlign: state.messageStyle.alignment,
                whiteSpace: "pre-wrap",
                userSelect: "none",
              }}
              className="leading-relaxed drop-shadow-sm break-words"
            >
              {state.message || "Nhập lời chúc của bạn..."}
            </p>
            {!readOnly && (
              <>
                {/* Top Left */}
                <div
                  className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-50"
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e,
                      "message-drag",
                      "message",
                      "resize",
                      0,
                      0,
                      1,
                      state.messageStyle.fontSize
                    )
                  }
                />
                {/* Top Right */}
                <div
                  className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50"
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e,
                      "message-drag",
                      "message",
                      "resize",
                      0,
                      0,
                      1,
                      state.messageStyle.fontSize
                    )
                  }
                />
                {/* Bottom Left */}
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50"
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e,
                      "message-drag",
                      "message",
                      "resize",
                      0,
                      0,
                      1,
                      state.messageStyle.fontSize
                    )
                  }
                />
                {/* Bottom Right */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e,
                      "message-drag",
                      "message",
                      "resize",
                      0,
                      0,
                      1,
                      state.messageStyle.fontSize
                    )
                  }
                />
              </>
            )}
          </div>

          {/* Sticker Layer */}
          {state.stickers.map((sticker) => (
            <div
              key={sticker.id}
              className={cn(
                "absolute w-16 h-16 group/sticker rounded",
                !readOnly && "cursor-move hover:ring-1 ring-blue-400"
              )}
              style={{
                left: sticker.x, // In a real app, this needs relative positioning logic
                top: sticker.y,
                transform: `scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                touchAction: "none",
              }}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  sticker.id,
                  "sticker",
                  "drag",
                  sticker.x,
                  sticker.y
                )
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Sticker"
                className="w-full h-full object-contain drop-shadow-md pointer-events-none"
                src={sticker.url}
              />
              {!readOnly && (
                <>
                  <button
                    onClick={(e) => handleRemoveSticker(sticker.id, e)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/sticker:opacity-100 transition-opacity z-20 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      close
                    </span>
                  </button>
                  {/* 4 invisible resize corners */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div
                      className="absolute -top-1 -left-1 w-3 h-3 cursor-nw-resize pointer-events-auto z-50"
                      onMouseDown={(e) =>
                        handleMouseDown(
                          e,
                          sticker.id,
                          "sticker",
                          "resize",
                          0,
                          0,
                          sticker.scale
                        )
                      }
                    />
                    <div
                      className="absolute -top-1 -right-1 w-3 h-3 cursor-ne-resize pointer-events-auto z-50"
                      onMouseDown={(e) =>
                        handleMouseDown(
                          e,
                          sticker.id,
                          "sticker",
                          "resize",
                          0,
                          0,
                          sticker.scale
                        )
                      }
                    />
                    <div
                      className="absolute -bottom-1 -left-1 w-3 h-3 cursor-sw-resize pointer-events-auto z-50"
                      onMouseDown={(e) =>
                        handleMouseDown(
                          e,
                          sticker.id,
                          "sticker",
                          "resize",
                          0,
                          0,
                          sticker.scale
                        )
                      }
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-3 h-3 cursor-se-resize pointer-events-auto z-50"
                      onMouseDown={(e) =>
                        handleMouseDown(
                          e,
                          sticker.id,
                          "sticker",
                          "resize",
                          0,
                          0,
                          sticker.scale
                        )
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {!readOnly && (
          /* Canvas Actions */
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover/canvas:opacity-100 transition-opacity">
            <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                crop
              </span>
            </button>
          </div>
        )}
      </div>
      {!readOnly && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>Thiệp sẽ được in trên giấy Art Paper cao cấp 250gsm</span>
        </div>
      )}
    </div>
  );
}
