"use client";
import React, { useEffect, useRef, useState } from "react";
import { Conversation, ChatMessage, ReactionType } from "@/hooks/useChat";

interface ChatAreaProps {
  activeConversation: Conversation | null;
  messages: ChatMessage[];
  currentUser: any;
  onSendMessage: (text: string, mediaUrl?: string) => void;
  onUploadImage?: (file: File) => Promise<string | null>;
  onReact?: (messageId: number, type: ReactionType) => void;
  joined: boolean;
}

const REACTION_ICONS: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😆",
  SAD: "😢",
  ANGRY: "😡",
};

export function ChatArea({
  activeConversation,
  messages,
  currentUser,
  onSendMessage,
  onUploadImage,
  onReact,
  joined,
}: ChatAreaProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadImage && onSendMessage) {
      setIsUploading(true);
      try {
        const file = e.target.files[0];
        const url = await onUploadImage(file);
        if (url) {
          onSendMessage("", url);
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (!activeConversation) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#101922] h-full text-gray-500">
        <span className="material-symbols-outlined text-[64px] opacity-20 mb-4">
          chat
        </span>
        <p>Chọn một cuộc hội thoại để bắt đầu</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-gray-50/50 dark:bg-[#101922] relative h-full">
      {/* Chat Header */}
      <div className="px-6 py-3 bg-white dark:bg-[#1a2632] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm cursor-pointer border border-gray-200"
            style={{
              backgroundImage: activeConversation.avatar
                ? `url('${activeConversation.avatar}')`
                : undefined,
            }}
          >
            {!activeConversation.avatar && (
              <span className="flex items-center justify-center w-full h-full text-gray-400 text-xs font-bold bg-gray-100 rounded-full">
                {activeConversation.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white text-base font-bold flex items-center gap-2">
              {activeConversation.name}
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                title="Đã xác thực"
              >
                verified
              </span>
            </h3>
            {activeConversation.isOnline && (
              <p className="text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-1">
                <span className="inline-block size-2 bg-green-500 rounded-full"></span>
                Trực tuyến
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50 dark:bg-[#0d141b]">
        {messages.map((msg, index) => {
          const isMe =
            msg.senderId === currentUser?.id ||
            msg.senderId === currentUser?.userId ||
            msg.sender === currentUser?.fullName ||
            msg.sender === "Me";

          return (
            <div
              key={index}
              className={`flex ${
                msg.type === "JOIN" || msg.type === "LEAVE"
                  ? "justify-center"
                  : isMe
                  ? "flex-row-reverse"
                  : "flex-row"
              } gap-3 max-w-[80%] ${isMe ? "ml-auto" : ""} group relative`}
              onMouseEnter={() => setHoveredMessageId(msg.id || null)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              {msg.type === "CHAT" ? (
                <>
                  {!isMe && (
                    <div className="bg-blue-500 rounded-full size-8 shrink-0 flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden">
                      {activeConversation.avatar ? (
                        <img
                          src={activeConversation.avatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        msg.sender.charAt(0)
                      )}
                    </div>
                  )}

                  <div
                    className={`flex flex-col gap-1 relative ${
                      isMe ? "items-end" : "items-start"
                    }`}
                  >
                    {!isMe && (
                      <span className="text-xs text-gray-500 ml-1">
                        {msg.sender}
                      </span>
                    )}

                    {/* Reaction Picker Popover (Only shows on hover) */}
                    {hoveredMessageId === msg.id && onReact && (
                      <div
                        className={`absolute -top-10 ${
                          isMe ? "right-0" : "left-0"
                        } bg-white dark:bg-gray-800 shadow-lg rounded-full px-2 py-1 flex gap-1 z-10 border border-gray-100 dark:border-gray-700 animate-fade-in-scale`}
                      >
                        {Object.entries(REACTION_ICONS).map(([type, icon]) => (
                          <button
                            key={type}
                            onClick={() =>
                              msg.id && onReact(msg.id, type as ReactionType)
                            }
                            className="hover:scale-125 transition-transform text-lg p-0.5"
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl shadow-sm relative ${
                        isMe
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {msg.mediaUrl && (
                        <div className="mb-2 rounded-lg overflow-hidden max-w-[200px]">
                          <img
                            src={msg.mediaUrl}
                            alt="Sent image"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      {msg.content && (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      )}

                      {/* Reactions Display */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div
                          className={`absolute -bottom-3 ${
                            isMe ? "right-0" : "left-0"
                          } flex -space-x-1 items-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-full px-1.5 py-0.5 z-10`}
                        >
                          {Array.from(new Set(msg.reactions.map((r) => r.type)))
                            .slice(0, 3)
                            .map((type) => (
                              <span key={type} className="text-[10px]">
                                {REACTION_ICONS[type]}
                              </span>
                            ))}
                          <span className="text-[10px] text-gray-500 ml-1 font-bold">
                            {msg.reactions.length}
                          </span>
                        </div>
                      )}
                    </div>

                    {isMe && msg.isRead && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        Đã xem
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-xs text-gray-400 bg-gray-200/50 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {msg.sender}{" "}
                  {msg.type === "JOIN" ? "đã tham gia" : "đã rời phòng"}
                </span>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-800 p-4 shrink-0">
        {/* Loading Indicator */}
        {isUploading && (
          <div className="flex justify-end gap-2 items-center mb-2 mr-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-br-none text-xs text-gray-500 animate-pulse flex items-center gap-2">
              <div className="size-3 border-2 border-gray-400 border-t-primary rounded-full animate-spin"></div>
              Đang gửi ảnh...
            </div>
          </div>
        )}
        <div className="flex items-end gap-2">
          {/* Image Upload Button */}
          {onUploadImage && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary dark:text-gray-400 p-3 rounded-xl transition-colors flex items-center justify-center h-[52px] w-[52px]"
              >
                <span className="material-symbols-outlined">image</span>
              </button>
            </>
          )}

          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-end p-2 border border-transparent focus-within:border-primary/50 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 text-sm resize-none custom-scrollbar py-2 outline-none"
              placeholder="Nhập tin nhắn..."
              rows={1}
            ></textarea>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() && !onUploadImage}
            className="bg-primary hover:bg-green-600 text-white p-3 rounded-xl shadow-md transition-colors flex items-center justify-center disabled:opacity-50 h-[52px] w-[52px]"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </main>
  );
}
