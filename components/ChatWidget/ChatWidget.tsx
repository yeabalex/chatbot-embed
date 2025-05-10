"use client";
import React, { useState, useEffect } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatWidgetContainer } from "./ChatWidgetContainer";
import { useSearchParams } from "next/navigation";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [origin, setOrigin] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const params = useSearchParams();
  const urlUserId = params.get("user_id");

  useEffect(() => {
    // Send ready signal to parent
    window.parent.postMessage({ type: "WIDGET_READY" }, "*");

    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "EMBED_ORIGIN") {
        setOrigin(event.data.origin || null);
      }
    }

    window.addEventListener("message", handleMessage);
    setUserId(urlUserId); // set once

    return () => window.removeEventListener("message", handleMessage);
  }, [urlUserId]);

  if (!userId || !origin) {
    return null; // or a spinner/loading state
  }

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    window.parent.postMessage(
      { type: "TOGGLE_CHAT_WIDGET", expand: newIsOpen },
      "*"
    );
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={unreadCount}
      />
      <ChatWidgetContainer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          window.parent.postMessage(
            { type: "TOGGLE_CHAT_WIDGET", expand: false },
            "*"
          );
        }}
        user_id={userId}
        origin={origin}
      />
    </>
  );
};
