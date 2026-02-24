"use client";
import React, { useEffect, useState, useRef } from "react";
import { webSocketService } from "@/services/websocketService";

interface ChatMessage {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Admin connects immediately or on load
    connect("Admin Support");
    // Clean up connection on unmount
    return () => {
      webSocketService.deactivate();
    };
  }, []);

  const connect = (user: string) => {
    webSocketService.activate();
    webSocketService.onConnect(() => {
      setJoined(true);
      webSocketService.subscribe("/topic/public", (message) => {
        const msgData = JSON.parse(message.body);
        setMessages((prev) => [...prev, msgData]);
      });

      webSocketService.sendMessage("/app/chat.addUser", {
        sender: user,
        type: "JOIN",
      });
    });
  };

  const sendMessage = () => {
    if (input.trim() && joined) {
      webSocketService.sendMessage("/app/chat.sendMessage", {
        sender: "Admin Support",
        content: input,
        type: "CHAT",
      });
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 h-full relative dark:bg-gray-900">
      {/* Chat Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10 dark:bg-[#1a2634] dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="size-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Admin Support
            </h3>
            <p className="text-xs text-green-500 font-medium">
              {joined ? "Online" : "Connecting..."}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "JOIN" || msg.type === "LEAVE"
                ? "justify-center"
                : msg.sender === "Admin Support"
                ? "flex-row-reverse"
                : "flex-row"
            } gap-2 max-w-[80%] ${
              msg.sender === "Admin Support" ? "ml-auto" : ""
            }`}
          >
            {msg.type === "CHAT" ? (
              <>
                <div
                  className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${
                    msg.sender === "Admin Support"
                      ? "bg-primary"
                      : "bg-gray-400"
                  }`}
                >
                  {msg.sender.charAt(0)}
                </div>
                <div
                  className={`flex flex-col gap-1 ${
                    msg.sender === "Admin Support" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-gray-500 mx-1">
                    {msg.sender}
                  </span>
                  <div
                    className={`p-3 rounded-2xl shadow-sm text-sm ${
                      msg.sender === "Admin Support"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white text-gray-900 rounded-tl-none border border-gray-100 dark:bg-gray-800 dark:text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center my-4">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium dark:bg-gray-700 dark:text-gray-300">
                  {msg.sender}{" "}
                  {msg.type === "JOIN" ? "đã tham gia" : "đã rời phòng"}
                </span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 dark:bg-[#1a2634] dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-end">
            <textarea
              className="flex-1 bg-gray-50 border-gray-200 rounded-lg text-sm p-3 focus:ring-primary focus:border-primary min-h-[50px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
              placeholder="Nhập tin nhắn hỗ trợ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!joined}
            ></textarea>
            <button
              onClick={sendMessage}
              disabled={!joined}
              className="bg-primary hover:bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span>Nhấn Enter để gửi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
