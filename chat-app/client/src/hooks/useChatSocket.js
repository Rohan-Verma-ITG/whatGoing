import { useEffect, useRef } from "react";
import { createChatSocket } from "../services/socketService";

export function useChatSocket({ token, onMessage, onPresence }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return undefined;

    const socket = createChatSocket(token);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "message") {
        onMessage?.(payload.data);
      }
      if (payload.type === "presence") {
        onPresence?.(payload.data);
      }
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [token, onMessage, onPresence]);

  return socketRef;
}
