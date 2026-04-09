import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
