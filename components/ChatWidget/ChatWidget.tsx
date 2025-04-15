"use client";
import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatWidgetContainer } from "./ChatWidgetContainer";
import { useSearchParams } from "next/navigation";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const params = useSearchParams()
  const user_id = params.get("user_id")
  const origin = params.get("origin")
  if(!user_id || !origin){
    return;
  }

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    window.parent.postMessage({ type: 'TOGGLE_CHAT_WIDGET', expand: newIsOpen }, '*');
    setIsOpen(newIsOpen);
    if (newIsOpen === true) {
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
      <ChatWidgetContainer isOpen={isOpen} onClose={() => {setIsOpen(false); window.parent.postMessage({ type: 'TOGGLE_CHAT_WIDGET', expand: false }, '*');}} user_id={user_id} origin={origin}/>
    </>
  );
};
