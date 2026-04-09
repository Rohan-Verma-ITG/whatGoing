import { useState } from "react";

function AuthCard({ onLogin, onSignup }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", display_name: "" });

  const submit = async (event) => {
    event.preventDefault();
    if (mode === "login") {
      await onLogin({ email: form.email, password: form.password });
    } else {
      await onSignup(form);
    }
  };

  return (
    <div className="glass w-full max-w-md rounded-ios p-7">
      <h1 className="text-2xl font-semibold">Realtime Chat</h1>
      <p className="mt-1 text-sm text-slate-300">Minimal iOS-inspired messaging workspace</p>
      <form className="mt-6 space-y-3" onSubmit={submit}>
        {mode === "signup" && (
          <input
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none"
            placeholder="Display name"
            value={form.display_name}
            onChange={(e) => setForm((prev) => ({ ...prev, display_name: e.target.value }))}
            required
          />
        )}
        <input
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
          minLength={6}
        />
        <button type="submit" className="w-full rounded-xl bg-indigo-500 py-3 font-medium transition hover:bg-indigo-400">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
      <button
        type="button"
        className="mt-4 text-sm text-indigo-300"
        onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
      >
        {mode === "login" ? "No account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default AuthCard;
