import { motion } from "framer-motion";

function Sidebar({ currentUser, onlineUsers }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="glass h-full w-full max-w-xs rounded-ios p-5"
    >
      <h2 className="text-xl font-semibold tracking-tight">Chats</h2>
      <p className="mt-1 text-sm text-slate-300">Signed in as {currentUser?.display_name}</p>
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
          <div>
            <p className="text-sm font-medium">Global Room</p>
            <p className="text-xs text-slate-300">Public channel</p>
          </div>
          <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-300">
            {onlineUsers.length} online
          </span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-2 text-xs uppercase tracking-wide text-slate-400">Active now</h3>
        <ul className="space-y-2">
          {onlineUsers.map((user) => (
            <li key={user.id} className="flex items-center gap-2 text-sm">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>{user.display_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
