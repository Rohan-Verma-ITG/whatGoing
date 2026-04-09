import { formatTime } from "../utils/date";

function MessageBubble({ message, mine }) {
  return (
    <div className={`mb-3 flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-3xl px-4 py-2 backdrop-blur-md ${
          mine
            ? "bg-indigo-500/70 text-white"
            : "border border-white/15 bg-white/10 text-slate-100"
        }`}
      >
        {!mine && <p className="mb-1 text-xs text-slate-300">{message.sender_name}</p>}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className="mt-1 text-right text-[11px] opacity-70">{formatTime(message.created_at)}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
