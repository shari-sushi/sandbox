import { create } from "zustand";
import { type Message } from "../types/message";

interface ChatState {
  roomNum: number;
  messages: Message[];
  isConnected: boolean;
  setRoomNum: (roomNum: number) => void;
  addMessage: (message: Message) => void;
  setConnected: (connected: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  roomNum: 0,
  messages: [],
  isConnected: false,

  setRoomNum: (roomNum: number) => set({ roomNum }),

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setConnected: (connected: boolean) => set({ isConnected: connected }),

  clearMessages: () => set({ messages: [] }),
}));
