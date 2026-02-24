"use client";
import { MessageHeader } from "@/features/customer/messages/MessageHeader";
import { MessageList } from "@/features/customer/messages/MessageList";
import { ChatArea } from "@/features/customer/messages/ChatArea";
import { ChatContext } from "@/features/customer/messages/ChatContext";
import { useChat } from "@/hooks/useChat";

export default function MessagesPage() {
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
  } = useChat("USER");

  return (
    <div className="bg-white dark:bg-[#1a2632] min-h-screen pt-[64px] flex flex-col">
      <div className="container mx-auto p-6 flex-1 flex flex-col h-[calc(100vh-64px)]">
        <div className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-gray-200 dark:border-[#2b3a4a] flex flex-col flex-1 overflow-hidden">
          <MessageHeader />
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
            {activeConversation && <ChatContext />}
          </div>
        </div>
      </div>
    </div>
  );
}
