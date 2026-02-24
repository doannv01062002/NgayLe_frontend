import { useState, useEffect, useRef, useCallback } from "react";
import { webSocketService } from "@/services/websocketService";
import api from "@/lib/api";

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "SAD" | "ANGRY";

export interface Reaction {
  id: number;
  userId: number;
  userName: string;
  type: ReactionType;
}

export interface ChatMessage {
  id?: number;
  senderId?: number;
  senderName?: string;
  sender: string; 
  content: string;
  mediaUrl?: string; // New
  type: "CHAT" | "JOIN" | "LEAVE";
  createdAt?: string;
  isRead?: boolean;
  reactions?: Reaction[]; // New
}

export interface Conversation {
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

export function useChat(role: "USER" | "SHOP") {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<any>(null);
  const [joined, setJoined] = useState(false);

  // Load User
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        setUser(JSON.parse(userStr));
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    try {
      const endpoint = role === "SHOP" ? "/chat/conversations/shop" : "/chat/conversations";
      const { data } = await api.get<any[]>(endpoint);
      let mapped: Conversation[] = data.map(c => ({
          id: c.id,
          name: c.name,
          avatar: c.avatar,
          lastMessage: c.lastMessage,
          time: c.time ? new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          unread: c.unread || 0,
          isOnline: c.isOnline,
          type: c.type,
          partnerId: c.partnerId
      }));

      // If SHOP role, ensure Admin Support exists
      if (role === "SHOP") {
           const hasAdmin = mapped.some(c => c.type === 'SUPPORT' || c.name === 'Admin Support');
           if (!hasAdmin) {
               mapped.unshift({
                   id: -1, // Placeholder
                   name: "Admin Support",
                   avatar: "https://cdn-icons-png.flaticon.com/512/2345/2345338.png",
                   lastMessage: "Chat with Admin",
                   time: "",
                   unread: 0,
                   type: "SUPPORT",
                   partnerId: 0
               });
           }
      }

      setConversations(mapped);
    } catch (e) {
      console.error("Failed to fetch conversations", e);
    }
  }, [user, role]);

  const fetchMessages = useCallback(async (convId: number) => {
    if (!user || convId === -1) return; // Don't fetch for placeholder
    try {
        const { data } = await api.get(`/chat/${convId}/messages`);
        const msgs: ChatMessage[] = data.content.reverse().map((m: any) => ({
            sender: m.senderId === user.id || m.senderId === user.userId ? (user.fullName || "Me") : m.senderName,
            content: m.content,
            mediaUrl: m.mediaUrl,
            type: "CHAT",
            senderId: m.senderId,
            id: m.id,
            isRead: m.isRead,
            reactions: m.reactions || []
        }));
        setMessages(msgs);
    } catch (e) {
        console.error("Failed to fetch messages", e);
    }
  }, [user]);

  // Keep active conversation ref for WS callback
  const activeConversationRef = useRef<Conversation | null>(null);
  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  useEffect(() => {
    if (!user) return;
    
    fetchConversations();

    let subscription: any = null;

    const onConnected = () => {
        setJoined(true);
        const userId = user.id || user.userId;
        // User specific topic
        const topic = `/topic/user.${userId}`;
        
        console.log("Subscribing to", topic);
        subscription = webSocketService.subscribe(topic, (message) => {
            const body = JSON.parse(message.body);
            
            // Handle different message types if needed, currently assuming content is MessageResponse
            const newMessage: ChatMessage = {
                id: body.id,
                senderId: body.senderId,
                sender: body.senderName === user.fullName ? "Me" : body.senderName, // logic check
                senderName: body.senderName,
                content: body.content,
                mediaUrl: body.mediaUrl,
                type: "CHAT",
                createdAt: body.createdAt,
                isRead: body.isRead,
                reactions: body.reactions || []
            };
            
            // We need to know which conversation this message belongs to.
            // Backend MessageResponse now has conversationId (added in Step 384/386).
            // body.conversationId

            if (activeConversationRef.current && body.conversationId === activeConversationRef.current.id) {
                 setMessages(prev => {
                     // Check if it's a reaction update (same ID)
                     const existingIndex = prev.findIndex(m => m.id === newMessage.id);
                     if (existingIndex !== -1) {
                         // Update existing message (e.g. for reactions)
                         const updated = [...prev];
                         updated[existingIndex] = newMessage;
                         return updated;
                     }
                     // Append new message
                     // Check if message is from "Me" but locally sent? 
                     // Usually optimistic update handles "Me". 
                     // If we receive our own message back, we should deduplicate or replace temp.
                     // For now, strict append if not exists.
                     return [...prev, newMessage];
                 });
            }

            fetchConversations();
        });
    };

    webSocketService.activate();
    webSocketService.onConnect(onConnected);

    return () => {
        if (subscription) {
            subscription.unsubscribe();
        }
        webSocketService.removeConnectListener(onConnected);
    };
  }, [user, fetchConversations]); // Removed dependency on role as topic is user-specific

  // ... (keep WS code)

  const markRead = async (convId: number) => {
    if (convId === -1) return;
    try {
        await api.put(`/chat/${convId}/read`);
        setConversations(prev => prev.map(c => 
            c.id === convId ? { ...c, unread: 0 } : c
        ));
    } catch (e) {
        console.error("Mark read failed", e);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    if (conv.id === -1) {
        // Start Admin Conversation
        try {
            const { data } = await api.post("/chat/start/admin");
            const newConv: Conversation = {
                id: data.id,
                name: data.name,
                avatar: data.avatar,
                lastMessage: data.lastMessage,
                time: data.time ? new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                unread: data.unread || 0,
                type: data.type, // SUPPORT
                partnerId: data.partnerId
            };
            
            // Replace placeholder
            setConversations(prev => [newConv, ...prev.filter(c => c.id !== -1)]);
            setActiveConversation(newConv);
            fetchMessages(newConv.id);
        } catch (e) {
            console.error("Failed to start admin chat", e);
        }
    } else {
        setActiveConversation(conv);
        fetchMessages(conv.id);
        if (conv.unread > 0) {
            markRead(conv.id);
        }
    }
  };

  // ... (keep rest)
  


  // Auto-read when new messages arrive in active conversation
  useEffect(() => {
    if (activeConversation && messages.length > 0 && user) {
        const lastMsg = messages[messages.length - 1];
        const userId = user.id || user.userId;
        if (lastMsg.senderId !== userId) {
            const currentConv = conversations.find(c => c.id === activeConversation.id);
            if (currentConv && currentConv.unread > 0) {
                 markRead(activeConversation.id);
            }
        }
    }
  }, [messages, activeConversation, user, conversations]);

  const sendMessage = async (content: string, mediaUrl?: string) => {
      if ((!content.trim() && !mediaUrl) || !user || !activeConversation) return;
      try {
          await api.post("/chat/send", {
              conversationId: activeConversation.id,
              content: content,
              mediaUrl: mediaUrl
          });
          
          fetchConversations();
      } catch (e) {
          console.error("Send failed", e);
      }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
      try {
          const formData = new FormData();
          formData.append("file", file);
          const { data } = await api.post("/chat/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" }
          });
          return data.url;
      } catch (e) {
          console.error("Upload failed", e);
          return null;
      }
  };

  const reactToMessage = async (messageId: number, type: ReactionType) => {
      try {
           await api.post(`/chat/${messageId}/react`, { type });
           // Optimistic update handled by WS usually, but we can also update local state if we want instant feedback
           // WS will confirm it.
      } catch (e) {
          console.error("Reaction failed", e);
      }
  }

  return {
      conversations,
      messages,
      activeConversation,
      user,
      selectConversation,
      sendMessage,
      uploadImage,
      reactToMessage,
      joined
  };
}
