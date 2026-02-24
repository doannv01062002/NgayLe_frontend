"use client";

import { MessageList } from "@/features/customer/messages/MessageList";
import { ChatArea } from "@/features/customer/messages/ChatArea";

import { useChat } from "@/hooks/useChat";

export default function SellerMessagesPage() {
  const {
    conversations,
    messages,
    activeConversation,
    selectConversation,
    sendMessage,
    user,
    joined,
    uploadImage,
    reactToMessage,
  } = useChat("SHOP");

  return (
    <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-[#2b3a4a] flex flex-col h-[calc(100vh-140px)] overflow-hidden text-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        <MessageList
          conversations={conversations}
          activeId={activeConversation?.id || null}
          onSelect={selectConversation}
        />
        <ChatArea
          activeConversation={activeConversation}
          messages={messages}
          currentUser={user}
          onSendMessage={sendMessage}
          onUploadImage={uploadImage}
          onReact={reactToMessage}
          joined={joined}
        />
      </div>
    </div>
  );
}
