import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { fetchMessages, sendMessage as sendMessageHttp } from "../services/chatService";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const loadHistory = useCallback(async () => {
    const history = await fetchMessages();
    setMessages(history.reverse());
  }, []);

  const addIncomingMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const updatePresence = useCallback((presenceList) => {
    setOnlineUsers(presenceList);
  }, []);

  const sendMessage = useCallback(async (content) => {
    const created = await sendMessageHttp(content);
    setMessages((prev) => [...prev, created]);
  }, []);

  const value = useMemo(
    () => ({ messages, onlineUsers, loadHistory, sendMessage, addIncomingMessage, updatePresence }),
    [messages, onlineUsers, loadHistory, sendMessage, addIncomingMessage, updatePresence]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
