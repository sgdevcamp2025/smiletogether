import { User } from '@/types/user';

interface DMLastMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

interface DMItem {
  dmId: string;
  participants: User[];
  lastMessage: DMLastMessage;
  unreadCount: number;
}

export interface DMListResponseDto {
  userId: string;
  dms: DMItem[];
}
