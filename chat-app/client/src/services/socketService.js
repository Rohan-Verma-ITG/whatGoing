import { WS_BASE_URL } from "../utils/constants";

export function createChatSocket(token) {
  return new WebSocket(`${WS_BASE_URL}?token=${encodeURIComponent(token)}`);
}
