import { motion } from "framer-motion";
import { useEffect } from "react";
import AuthCard from "../components/AuthCard";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { useChatSocket } from "../hooks/useChatSocket";

function ChatPage() {
  const { user, loading, login, signup } = useAuth();
  const { messages, onlineUsers, loadHistory, sendMessage, addIncomingMessage, updatePresence } = useChat();

  const token = localStorage.getItem("access_token");
  useChatSocket({ token, onMessage: addIncomingMessage, onPresence: updatePresence });

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-slate-300">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <AuthCard onLogin={login} onSignup={signup} />
      </div>
    );
  }

  useEffect(() => {
    if (messages.length === 0) {
      loadHistory();
    }
  }, [messages.length, loadHistory]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex h-[calc(100vh-2rem)] max-w-7xl gap-4"
      >
        <div className="hidden md:block">
          <Sidebar currentUser={user} onlineUsers={onlineUsers} />
        </div>
        <section className="glass flex w-full flex-1 flex-col rounded-ios">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 className="font-medium">Global Room</h2>
            <div className="flex items-center gap-2 text-sm text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live
            </div>
          </header>
          <MessageList messages={messages} currentUser={user} />
          <MessageInput onSend={sendMessage} />
        </section>
      </motion.div>
    </div>
  );
}

export default ChatPage;
