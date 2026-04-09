import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, currentUser }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} mine={message.sender_id === currentUser?.id} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
