"use client";

import { useEffect, useState, useRef } from "react";
import { formatDate } from "@/lib/utils";
import {
  adminChatService,
  Conversation,
  Message,
  ChatContext,
} from "@/services/adminChat.service";
import { webSocketService } from "@/services/websocketService";

const ChatSystemPage = () => {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [context, setContext] = useState<ChatContext | null>(null);
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "SUPPORT" | "REPORT">(
    "ALL"
  );
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);

  const REACTION_ICONS: Record<string, string> = {
    LIKE: "👍",
    LOVE: "❤️",
    LAUGH: "😂",
    SAD: "😢",
    ANGRY: "😡",
  };

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedIdRef = useRef<number | null>(null);

  // Sync Ref
  useEffect(() => {
    selectedIdRef.current = selectedConversation?.id || null;
  }, [selectedConversation]);

  // Initial Fetch & WebSocket
  useEffect(() => {
    fetchConversations();

    let subscription: any = null;
    webSocketService.activate();

    webSocketService.onConnect(() => {
      subscription = webSocketService.subscribe("/topic/admin", (msg) => {
        const body = JSON.parse(msg.body) as Message;
        handleIncomingMessage(body);
      });
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleIncomingMessage = (newMessage: Message) => {
    const currentSelectedId = selectedIdRef.current;

    setConversations((prev) => {
      const existing = prev.find((c) => c.id === newMessage.conversationId);
      if (existing) {
        // Check if this is a new message or an update to an old one (e.g. reaction)
        // We assume if createdAt is newer than the conversation's last time, it's new.
        // This prevents reactions to old messages from bumping the conversation or increasing unread count.
        const msgTime = new Date(newMessage.createdAt).getTime();
        const lastTime = new Date(existing.time).getTime();
        const isNew = msgTime > lastTime;

        // If timestamps are equal, it might be the SAME last message being updated (e.g. reaction to last message)
        // In that case, we don't increment unread, but we might want to update content if needed (though reaction doesn't change content)
        // For simplicity: treat equal as "not new" for unread count purposes.

        const updated = {
          ...existing,
          lastMessage: isNew ? newMessage.content : existing.lastMessage,
          time: isNew ? newMessage.createdAt : existing.time,
          unread:
            isNew && currentSelectedId !== newMessage.conversationId
              ? existing.unread + 1
              : existing.unread,
        };

        // If it is new, move to top. If not, keep position or move?
        // Usually reactions don't move conversation to top in many apps, but some do.
        // Let's keep it simple: Only move to top if isNew.
        if (isNew) {
          return [
            updated,
            ...prev.filter((c) => c.id !== newMessage.conversationId),
          ];
        } else {
          // Just update the object in place
          return prev.map((c) =>
            c.id === newMessage.conversationId ? updated : c
          );
        }
      } else {
        // If new conversation, we might want to reload list or optimistically add
        fetchConversations();
        return prev;
      }
    });

    if (currentSelectedId === newMessage.conversationId) {
      setMessages((prev) => {
        const existingIndex = prev.findIndex((msg) => msg.id === newMessage.id);
        if (existingIndex !== -1) {
          // Update existing message (e.g. reactions)
          const updated = [...prev];
          updated[existingIndex] = newMessage;
          return updated;
        }
        return [...prev, newMessage];
      });
      // Only scroll if it's a new message
      // We can't easily check here without ref or complex logic, but scrolling on reaction is bad UX.
      // So let's rely on the fact that reactions usually don't change height much.
      // But if we scroll on every update, it might be annoying if looking at history.
      // Let's scroll only if it is NEW.
      // Actually, checking "prev" inside "setMessages" makes it hard to decided side-effects.
      // We can do a check before setting?
      // But state is async.
      // Let's just fix the state update first.
    }
  };

  // Auto-scroll on messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch Context & Messages when selection changes
  useEffect(() => {
    if (!selectedConversation) return;

    // Fetch Context
    fetchContext(selectedConversation.id);

    // Fetch Messages
    fetchMessages(selectedConversation.id);

    // Mark as Read
    adminChatService.markAsRead(selectedConversation.id).catch(console.error);
  }, [selectedConversation]);

  // Fetch Conversations
  const fetchConversations = async () => {
    try {
      const data = await adminChatService.getConversations(keyword);
      setConversations(data);
    } catch (error) {
      console.error("Fetch conversations error", error);
    }
  };

  // Fetch Messages
  const fetchMessages = async (id: number) => {
    try {
      const data = await adminChatService.getMessages(id, 0, 50);
      setMessages(data.content.reverse());
      scrollToBottom();
    } catch (error) {
      console.error("Fetch messages error", error);
    }
  };

  // Fetch Context
  const fetchContext = async (id: number) => {
    try {
      const data = await adminChatService.getContext(id);
      setContext(data);
    } catch (error) {
      console.error("Fetch context error", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setContext(null);
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedConversation) return;

    try {
      const sentMsg = await adminChatService.sendMessage(
        selectedConversation.id,
        input
      );
      setInput("");
      // Optimistically update messages (or wait for Websocket? Websocket is safer for consistency but slower response)
      // Ideally we get the echo back from websocket.
      // But we can append immediately for UX.
      // Note: WebSocket might send it back to us if we subscribe to 'admin'.
      // Our backend sends to '/topic/admin' on sendAdminMessage, so yes we will receive it.
      // So we don't need to manually append if the websocket is fast enough.
      // But to avoid lag, let's append?
      // If we append AND websocket comes, we might have duplicate if we don't handle dedup.
      // Dedup by ID?
      // Let's rely on WebSocket for now for simplicity, or dedup.
    } catch (error) {
      console.error("Send message error", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReaction = async (messageId: number, type: string) => {
    try {
      await adminChatService.reactToMessage(messageId, type);
    } catch (error) {
      console.error("Reaction error", error);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (keyword && !c.name.toLowerCase().includes(keyword.toLowerCase()))
      return false;
    // Tab logic placeholder
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-100px)] -m-6 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      {/* Left Sidebar: Conversation List */}
      <div className="w-80 bg-white dark:bg-[#1a2634] border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Hệ thống Chat Tổng
          </h2>
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm kiếm..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                if (e.target.value === "") fetchConversations();
              }}
              onKeyDown={(e) => e.key === "Enter" && fetchConversations()}
            />
          </div>
          <div className="flex gap-4 text-sm font-medium border-b border-gray-100 dark:border-gray-700 pb-2 overflow-x-auto text-gray-500">
            <button
              className={`${
                activeTab === "ALL"
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-gray-700"
              } pb-1 whitespace-nowrap transition-all`}
              onClick={() => setActiveTab("ALL")}
            >
              Tất cả
            </button>
            <button
              className={`${
                activeTab === "SUPPORT"
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-gray-700"
              } pb-1 whitespace-nowrap transition-all`}
              onClick={() => setActiveTab("SUPPORT")}
            >
              Hỗ trợ{" "}
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block mb-1 ml-1" />
            </button>
            <button
              className={`${
                activeTab === "REPORT"
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-gray-700"
              } pb-1 whitespace-nowrap transition-all`}
              onClick={() => setActiveTab("REPORT")}
            >
              Báo cáo
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800 ${
                selectedConversation?.id === conv.id
                  ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-primary"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="relative flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={conv.avatar || "/placeholder-avatar.png"}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  alt=""
                />
                {conv.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-2">
                    {conv.name}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(conv.time).split(" ")[1]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className={`text-sm truncate ${
                      conv.unread > 0
                        ? "text-gray-900 font-bold dark:text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Chat Window */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1a2634] w-full min-w-0">
        {selectedConversation ? (
          <>
            <div className="h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Admin Support
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-500">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Online
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
              {messages.map((msg, index) => {
                const isMe = msg.senderId !== selectedConversation.partnerId;
                return (
                  <div
                    key={msg.id || index}
                    className="flex flex-col group relative"
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    <div
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      } items-center gap-2 relative`}
                    >
                      {/* Reaction Picker Popover (Only shows on hover) */}
                      {hoveredMessageId === msg.id && (
                        <div
                          className={`absolute -top-10 ${
                            isMe ? "right-0" : "left-0"
                          } bg-white dark:bg-gray-800 shadow-lg rounded-full px-2 py-1 flex gap-1 z-50 border border-gray-100 dark:border-gray-700 animate-fade-in-scale`}
                        >
                          {Object.entries(REACTION_ICONS).map(
                            ([type, icon]) => (
                              <button
                                key={type}
                                onClick={() => handleReaction(msg.id, type)}
                                className="hover:scale-125 transition-transform text-lg p-0.5"
                              >
                                {icon}
                              </button>
                            )
                          )}
                        </div>
                      )}

                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          isMe
                            ? "bg-primary text-white rounded-br-none"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                    </div>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div
                        className={`flex ${
                          isMe ? "justify-end" : "justify-start"
                        } px-2 -mt-2 mb-2 pt-1`}
                      >
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-1.5 py-0.5 shadow-sm flex items-center gap-0.5 z-10 scale-90 origin-top">
                          {msg.reactions.map((r: any, i: number) => (
                            <span
                              key={i}
                              className="text-[10px]"
                              title={r.userName}
                            >
                              {REACTION_ICONS[r.type] || "👍"}
                            </span>
                          ))}
                          <span className="text-[10px] text-gray-500 font-medium ml-0.5">
                            {msg.reactions.length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-[#1a2634] border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 items-end bg-gray-50 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <textarea
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-2 text-sm text-gray-900 dark:text-white"
                  placeholder="Nhập tin nhắn hỗ trợ..."
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    send
                  </span>
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                Nhấn Enter để gửi
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">
              chat_bubble_outline
            </span>
            <p>Chọn một hội thoại để bắt đầu hỗ trợ</p>
          </div>
        )}
      </div>

      {/* Right Sidebar: Context Info */}
      {selectedConversation && context && (
        <div className="w-80 bg-white dark:bg-[#1a2634] border-l border-gray-200 dark:border-gray-700 overflow-y-auto p-4 flex flex-col gap-6 ">
          {/* Order Info Section */}
          {context.orderId && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
                Thông tin đơn hàng
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-primary">
                    #ORD-{context.orderId}
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded font-bold">
                    {context.orderStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mb-3">
                  <span>Tổng cộng:</span>
                  <span className="text-red-500">
                    {context.totalAmount?.toLocaleString()}₫
                  </span>
                </div>

                <button className="w-full py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Xem chi tiết đơn hàng
                </button>
              </div>
            </div>
          )}

          {/* Customer Info Section */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
              Thông tin khách hàng
            </h3>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={context.userAvatar || "/placeholder-avatar.png"}
                className="w-10 h-10 rounded-full bg-gray-200"
                alt=""
              />
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">
                  {context.userName}
                </p>
                <p className="text-xs text-gray-500">{context.rank}</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5">
                  call
                </span>
                <div>
                  <p>
                    {context.userPhone || "N/A"}{" "}
                    <span className="text-blue-500 cursor-pointer text-xs ml-1">
                      Hiện
                    </span>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5">
                  location_on
                </span>
                <p>{context.userAddress || "N/A"}</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5">
                  mail
                </span>
                <p className="truncate w-56">{context.userEmail}</p>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
              Hành động nhanh
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center gap-1 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined">restart_alt</span>
                <span className="text-xs font-medium">Hoàn tiền</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-red-500">
                <span className="material-symbols-outlined">block</span>
                <span className="text-xs font-medium">Chặn Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystemPage;
