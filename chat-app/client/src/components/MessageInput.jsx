import { SendHorizonal } from "lucide-react";
import { useState } from "react";

function MessageInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    await onSend(trimmed);
    setValue("");
  };

  return (
    <div className="border-t border-white/10 p-4">
      <div className="glass flex items-center gap-2 rounded-2xl p-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400"
          placeholder="Type a message..."
        />
        <button
          type="button"
          onClick={handleSend}
          className="rounded-xl bg-indigo-500 px-3 py-2 text-white transition hover:bg-indigo-400"
          aria-label="Send"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
