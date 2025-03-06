import { User } from '@/types/user';

interface DMLastMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

export interface DMItem {
  dmId: string;
  participants: User[];
  lastMessage: DMLastMessage;
  unreadCount: number;
}
