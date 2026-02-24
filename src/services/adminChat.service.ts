import api from "@/lib/api";

export interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    type: string;
    partnerId: number;
    isOnline?: boolean;
}

export interface Message {
    id: number;
    conversationId: number;
    content: string;
    mediaUrl: string | null;
    senderId: number;
    senderName: string;
    createdAt: string;
    isRead: boolean;
    reactions: any[];
}

export interface ChatContext {
    userId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    userAddress: string;
    userAvatar: string | null;
    rank: string;
    orderId?: number;
    orderStatus?: string;
    totalAmount?: number;
    orderItemName?: string;
    orderItemCount?: number;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminChatService = {
    getConversations: async (keyword?: string): Promise<Conversation[]> => {
        const response = await api.get<Conversation[]>("/v1/admin/chat/conversations", {
            params: { keyword }
        });
        return response.data;
    },

    getMessages: async (conversationId: number, page = 0, size = 50): Promise<Page<Message>> => {
        const response = await api.get<Page<Message>>(`/v1/admin/chat/${conversationId}/messages`, {
            params: { page, size }
        });
        return response.data;
    },

    sendMessage: async (conversationId: number, content: string, mediaUrl?: string): Promise<Message> => {
        const response = await api.post<Message>("/v1/admin/chat/send", {
            conversationId,
            content,
            mediaUrl
        });
        return response.data;
    },

    getContext: async (conversationId: number): Promise<ChatContext> => {
        const response = await api.get<ChatContext>(`/v1/admin/chat/${conversationId}/context`);
        return response.data;
    },

    markAsRead: async (conversationId: number): Promise<void> => {
        await api.put(`/v1/admin/chat/${conversationId}/read`);
    },

    reactToMessage: async (messageId: number, type: string): Promise<Message> => {
        const response = await api.post<Message>(`/v1/admin/chat/messages/${messageId}/react`, {
            type
        });
        return response.data;
    }
};
