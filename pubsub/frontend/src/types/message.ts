export interface Message {
  id: string;
  content: string;
  room_num: number;
  timestamp: string;
}

export interface SendMessageRequest {
  mes: string;
  room_num: number;
}
