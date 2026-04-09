export function formatTime(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
