"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/hooks/useChat";

interface MessageListProps {
  conversations: Conversation[];
  activeId: number | null;
  onSelect: (c: Conversation) => void;
}

export function MessageList({
  conversations,
  activeId,
  onSelect,
}: MessageListProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredConversations = conversations.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return c.unread > 0;
    // "seller" tab logic? Maybe type === 'SHOP'?
    if (activeTab === "seller") return c.type === "SHOP";
    if (activeTab === "support") return c.type === "SUPPORT";
    return true;
  });

  return (
    <aside className="w-80 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2632] shrink-0 h-full">
      {/* Search */}
      <div className="p-4 pb-0">
        <label className="flex flex-col w-full h-10">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-primary transition-all">
            <div className="text-gray-500 flex items-center justify-center pl-3">
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 bg-transparent border-none text-sm text-gray-900 dark:text-white focus:ring-0 placeholder:text-gray-500 px-3 outline-none"
              placeholder="Tìm người dùng hoặc shop..."
            />
          </div>
        </label>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2">
        <div className="flex border-b border-gray-200 dark:border-gray-700 gap-4 overflow-x-auto no-scrollbar">
          {["all", "unread", "seller", "support"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex flex-col items-center justify-center border-b-[2px] pb-2 pt-3 px-1 whitespace-nowrap transition-colors",
                activeTab === tab
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              <p className="text-sm font-bold leading-normal capitalize">
                {tab === "all"
                  ? "Tất cả"
                  : tab === "unread"
                  ? "Chưa đọc"
                  : tab === "seller"
                  ? "Người bán"
                  : "Hỗ trợ"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={cn(
                "flex items-center gap-3 px-4 py-4 cursor-pointer transition-colors border-l-[3px]",
                activeId === conv.id
                  ? "bg-blue-50 dark:bg-blue-900/10 border-primary"
                  : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}
            >
              <div className="relative shrink-0">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundImage: conv.avatar
                      ? `url('${conv.avatar}')`
                      : undefined,
                  }}
                >
                  {!conv.avatar && (
                    <span className="flex items-center justify-center w-full h-full text-gray-400 text-xs font-bold">
                      {conv.name.charAt(0)}
                    </span>
                  )}
                </div>
                {conv.isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#1a2632] rounded-full"></span>
                )}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-gray-900 dark:text-white text-sm font-bold line-clamp-1">
                    {conv.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-normal",
                      conv.unread > 0
                        ? "text-primary font-bold"
                        : "text-gray-400"
                    )}
                  >
                    {conv.time}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "text-sm font-normal line-clamp-1",
                      conv.unread > 0
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-500"
                    )}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="flex items-center justify-center size-5 bg-primary text-white text-[10px] font-bold rounded-full ml-2 shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            Không tìm thấy cuộc trò chuyện nào.
          </div>
        )}
      </div>
    </aside>
  );
}
