"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { webSocketService } from "@/services/websocketService";
import api from "@/lib/api";

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "SAD" | "ANGRY";

const REACTION_ICONS: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  LAUGH: "😆",
  SAD: "😢",
  ANGRY: "😡",
};

export interface Reaction {
  id: number;
  userId: number;
  userName: string;
  type: ReactionType;
}

interface ChatMessage {
  id?: number;
  senderId?: number;
  senderName?: string;
  sender: string;
  content: string;
  mediaUrl?: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  createdAt?: string;
  isRead?: boolean;
  reactions?: Reaction[];
}

interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline?: boolean;
  type: "SHOP" | "SUPPORT" | "USER";
  partnerId: number;
}

export function GlobalChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  // Chat Logic States
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, activeConversation]);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get<any[]>("/chat/conversations");
      const mapped: Conversation[] = data.map((c) => ({
        id: c.id,
        name: c.name,
        avatar: c.avatar,
        lastMessage: c.lastMessage,
        time: c.time
          ? new Date(c.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        unread: c.unread || 0,
        isOnline: c.isOnline,
        type: c.type,
        partnerId: c.partnerId,
      }));
      setConversations(mapped);
    } catch (e) {
      console.error("Failed to fetch conversations", e);
    }
  };

  const fetchMessages = async (convId: number) => {
    try {
      const { data } = await api.get(`/chat/${convId}/messages`);
      const msgs: ChatMessage[] = data.content.reverse().map((m: any) => ({
        sender: m.senderId === user?.id ? user?.fullName || "Me" : m.senderName,
        content: m.content,
        mediaUrl: m.mediaUrl,
        type: "CHAT",
        senderId: m.senderId,
        id: m.id,
        isRead: m.isRead,
      }));
      setMessages(msgs);
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          const excludedRoles = ["ADMIN", "SUPPORT", "WORKER", "HIRER"];

          if (excludedRoles.includes(u.role)) {
            setUser(null);
            setIsOpen(false);
          } else {
            setUser(u);
          }
        } catch (e) {
          console.error("Invalid user data", e);
          setUser(null);
        }
      } else {
        setUser(null);
        setIsOpen(false);
      }
    };

    checkAuth();
    window.addEventListener("auth-changed", checkAuth);

    return () => {
      window.removeEventListener("auth-changed", checkAuth);
      webSocketService.deactivate();
    };
  }, []);

  useEffect(() => {
    const handleOpenChat = async (event: CustomEvent) => {
      const { shopId } = event.detail;
      if (!user) {
        // Optional: Redirect to login or show alert
        // router.push("/auth/login");
        return;
      }
      try {
        const { data: conversation } = await api.post("/chat/start", {
          shopId: Number(shopId),
        });

        const conv: Conversation = {
          id: conversation.id,
          name: conversation.name,
          avatar: conversation.avatar,
          lastMessage: conversation.lastMessage,
          time: conversation.time
            ? new Date(conversation.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          unread: 0,
          isOnline: conversation.isOnline,
          type: conversation.type,
          partnerId: conversation.partnerId,
        };

        // Update list if new
        setConversations((prev) => {
          const exists = prev.find((c) => c.id === conv.id);
          if (exists) return prev;
          return [conv, ...prev];
        });

        setActiveConversation(conv);
        setIsOpen(true);
        fetchMessages(conv.id); // Fetch messages for the new conversation
      } catch (e) {
        console.error("Failed to start shop chat", e);
      }
    };

    window.addEventListener("open-chat-shop" as any, handleOpenChat);

    const handleOpenSupport = async () => {
      if (!user) {
        // Redirect login?
        return;
      }
      try {
        const { data: conversation } = await api.post("/chat/start/admin");
        const conv: Conversation = {
          id: conversation.id,
          name: conversation.name,
          avatar: conversation.avatar,
          lastMessage: conversation.lastMessage,
          time: conversation.time
            ? new Date(conversation.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          unread: 0,
          isOnline: conversation.isOnline,
          type: conversation.type,
          partnerId: conversation.partnerId,
        };

        setConversations((prev) => {
          const exists = prev.find((c) => c.id === conv.id);
          if (exists) return prev;
          return [conv, ...prev];
        });

        setActiveConversation(conv);
        setIsOpen(true);
        fetchMessages(conv.id);
      } catch (e) {
        console.error("Failed to start admin chat", e);
      }
    };

    window.addEventListener("open-chat-support" as any, handleOpenSupport);

    return () => {
      window.removeEventListener("open-chat-shop" as any, handleOpenChat);
      window.removeEventListener("open-chat-support" as any, handleOpenSupport);
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchConversations();
      connect();
    }
  }, [user]);

  const markRead = async (convId: number) => {
    try {
      await api.put(`/chat/${convId}/read`);
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, unread: 0 } : c))
      );
    } catch (e) {
      console.error("Mark read failed", e);
    }
  };

  const connect = () => {
    if (!user || joined) return;

    webSocketService.activate();
    webSocketService.onConnect(() => {
      setJoined(true);
      const userId = user.id || user.userId;
      if (userId) {
        webSocketService.subscribe(`/topic/user.${userId}`, (message) => {
          const msgData = JSON.parse(message.body);

          const newMsg: ChatMessage = {
            sender: msgData.senderName,
            content: msgData.content,
            mediaUrl: msgData.mediaUrl,
            type: "CHAT",
            senderId: msgData.senderId,
            id: msgData.id,
            isRead: msgData.isRead,
            reactions: msgData.reactions,
          };

          fetchConversations();

          setActiveConversation((prev) => {
            if (prev) {
              const isRelevant =
                (prev.type === "SHOP" && msgData.senderId === prev.partnerId) ||
                (prev.type === "USER" && msgData.senderId === prev.partnerId) ||
                msgData.senderId === userId; // Own message

              if (isRelevant) {
                // If message is from partner and we are viewing it, mark as read
                if (msgData.senderId !== userId) {
                  markRead(prev.id);
                }

                setMessages((curr) => {
                  const existingIndex = curr.findIndex(
                    (m) => m.id === newMsg.id
                  );
                  if (existingIndex !== -1) {
                    const updated = [...curr];
                    updated[existingIndex] = {
                      ...updated[existingIndex],
                      ...newMsg,
                    };
                    return updated;
                  }
                  return [...curr, newMsg];
                });
              }
            }
            return prev;
          });
        });
      }
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && user) {
      fetchConversations();
    }
  };

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    fetchMessages(conv.id);
    if (conv.unread > 0) {
      markRead(conv.id);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/chat/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    } catch (e) {
      console.error("Upload failed", e);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const reactToMessage = async (messageId: number, type: ReactionType) => {
    try {
      await api.post(`/chat/${messageId}/react`, { type });
      // Optimistic update for better UX? Or wait for socket? Socket handles it.
    } catch (e) {
      console.error("Reaction failed", e);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = await uploadImage(file);
      if (url) {
        sendMessage(url);
      }
    }
  };

  const sendMessage = async (mediaUrl?: string) => {
    if ((input.trim() || mediaUrl) && user && activeConversation) {
      try {
        await api.post("/chat/send", {
          conversationId: activeConversation.id,
          content: input,
          mediaUrl: mediaUrl,
        });

        setInput("");
        fetchConversations();
      } catch (e) {
        console.error("Send failed", e);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (pathname?.startsWith("/seller")) {
    return null;
  }

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white dark:bg-[#1a2632] shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-[500px] animate-fade-in-up transition-all duration-300">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              {activeConversation ? (
                <>
                  <button
                    onClick={() => setActiveConversation(null)}
                    className="mr-1 text-white/80 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_back
                    </span>
                  </button>
                  <div className="size-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20">
                    {activeConversation.avatar ? (
                      <img
                        src={activeConversation.avatar}
                        alt={activeConversation.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        store
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white font-bold text-sm line-clamp-1 max-w-[180px]">
                      {activeConversation.name}
                    </h3>
                    {activeConversation.isOnline && (
                      <div className="flex items-center gap-1.5">
                        <div className="size-2 bg-green-400 rounded-full border border-white/20 animate-pulse"></div>
                        <span className="text-white/80 text-[10px]">
                          Trực tuyến
                        </span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[20px]">
                      chat
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-sm">
                    Tin nhắn của bạn
                  </h3>
                </>
              )}
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-[#111]">
            {activeConversation ? (
              /* Chat View */
              <div className="flex flex-col h-full">
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                  <div className="text-center text-xs text-gray-400 my-2">
                    Hôm nay
                  </div>

                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.type === "JOIN" || msg.type === "LEAVE"
                          ? "justify-center"
                          : msg.senderId === user.id ||
                            msg.senderId === user.userId
                          ? "flex-row-reverse"
                          : "flex-row"
                      } gap-2 items-end group relative`}
                      onMouseEnter={() => setHoveredMessageId(msg.id || null)}
                      onMouseLeave={() => setHoveredMessageId(null)}
                    >
                      {msg.type === "CHAT" ? (
                        <>
                          {!(
                            msg.senderId === user.id ||
                            msg.senderId === user.userId
                          ) && (
                            <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase overflow-hidden">
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
                            className={`flex flex-col gap-1 relative max-w-[85%] ${
                              msg.senderId === user.id ||
                              msg.senderId === user.userId
                                ? "items-end"
                                : "items-start"
                            }`}
                          >
                            {/* Reaction Picker on Hover */}
                            {hoveredMessageId === msg.id && (
                              <div
                                className={`absolute -top-8 ${
                                  msg.senderId === user.id ||
                                  msg.senderId === user.userId
                                    ? "right-0"
                                    : "left-0"
                                } bg-white dark:bg-gray-800 shadow-lg rounded-full px-2 py-0.5 flex gap-1 z-20 border border-gray-100 dark:border-gray-700 animate-fade-in-scale`}
                              >
                                {Object.entries(REACTION_ICONS).map(
                                  ([type, icon]) => (
                                    <button
                                      key={type}
                                      onClick={() =>
                                        msg.id &&
                                        reactToMessage(
                                          msg.id,
                                          type as ReactionType
                                        )
                                      }
                                      className="hover:scale-125 transition-transform text-sm p-0.5"
                                    >
                                      {icon}
                                    </button>
                                  )
                                )}
                              </div>
                            )}

                            <div
                              className={`p-3 rounded-2xl shadow-sm text-sm relative ${
                                msg.senderId === user.id ||
                                msg.senderId === user.userId
                                  ? "bg-primary text-white rounded-br-none"
                                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700"
                              }`}
                            >
                              {msg.mediaUrl && (
                                <div className="mb-2 rounded-lg overflow-hidden">
                                  <img
                                    src={msg.mediaUrl}
                                    alt="Image"
                                    className="w-full h-auto"
                                  />
                                </div>
                              )}
                              {msg.content}

                              {/* Reactions Display */}
                              {msg.reactions && msg.reactions.length > 0 && (
                                <div
                                  className={`absolute -bottom-2 ${
                                    msg.senderId === user.id ||
                                    msg.senderId === user.userId
                                      ? "right-0"
                                      : "left-0"
                                  } flex -space-x-1 items-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-full px-1 py-0.5 z-10 custom-shadow`}
                                >
                                  {Array.from(
                                    new Set(msg.reactions.map((r) => r.type))
                                  )
                                    .slice(0, 3)
                                    .map((type) => (
                                      <span key={type} className="text-[10px]">
                                        {REACTION_ICONS[type]}
                                      </span>
                                    ))}
                                  <span className="text-[10px] text-gray-500 ml-0.5 font-bold">
                                    {msg.reactions.length}
                                  </span>
                                </div>
                              )}
                            </div>

                            {msg.senderId === user.id
                              ? msg.isRead && (
                                  <div className="text-[10px] text-gray-400 text-right w-full mt-1 mr-1">
                                    Đã xem
                                  </div>
                                )
                              : null}
                          </div>
                        </>
                      ) : (
                        <span className="text-[10px] text-gray-400 bg-gray-200/50 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                          {msg.content}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {isUploading && (
                    <div className="flex justify-end gap-2 items-center mr-2">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-br-none text-xs text-gray-500 animate-pulse flex items-center gap-2">
                        <div className="size-3 border-2 border-gray-400 border-t-primary rounded-full animate-spin"></div>
                        Đang gửi ảnh...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="bg-white dark:bg-[#1a2632] p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-center">
                  {/* Image Upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-400 hover:text-primary p-2 rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      image
                    </span>
                  </button>

                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none text-sm focus:ring-0 dark:text-white px-0 focus:outline-none"
                      placeholder="Nhập tin nhắn..."
                    />
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="bg-primary hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      send
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Conversation List View */
              <div className="h-full overflow-y-auto custom-scrollbar">
                {conversations.length > 0 ? (
                  conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="relative shrink-0">
                        <div className="size-12 rounded-full bg-gray-200 overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                          {conv.avatar ? (
                            <img
                              src={conv.avatar}
                              alt={conv.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-gray-500">
                              store
                            </span>
                          )}
                        </div>
                        {conv.isOnline && (
                          <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#1a2632] rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">
                            {conv.name}
                          </h4>
                          <span className="text-[10px] text-gray-500">
                            {conv.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p
                            className={`text-xs line-clamp-1 ${
                              conv.unread > 0
                                ? "font-bold text-gray-900 dark:text-white"
                                : "text-gray-500"
                            }`}
                          >
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 && (
                            <span className="size-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ml-2">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                      chat_bubble_outline
                    </span>
                    <p className="text-sm">Bạn chưa có cuộc trò chuyện nào.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`${
          isOpen
            ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
            : "bg-primary text-white hover:bg-primary-hover animate-bounce-subtle"
        } p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center relative group`}
      >
        <span
          className={`material-symbols-outlined text-[28px] transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isOpen ? "close" : "chat"}
        </span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold size-5 flex items-center justify-center rounded-full border-2 border-white">
            {conversations.reduce((acc, c) => acc + c.unread, 0) > 0
              ? conversations.reduce((acc, c) => acc + c.unread, 0)
              : ""}
          </span>
        )}
      </button>
    </div>
  );
}
