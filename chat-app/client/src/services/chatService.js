import http from "./http";

export async function fetchMessages(limit = 50) {
  const { data } = await http.get(`/messages?limit=${limit}`);
  return data;
}

export async function sendMessage(content) {
  const { data } = await http.post("/messages", { content });
  return data;
}
