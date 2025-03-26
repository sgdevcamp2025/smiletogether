import { User } from '@/types/user';
import { Message } from '../channel/dto';

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

export interface DMResponseDto {
  dmId: string;
  participants: User[];
  isGroup: boolean;
  messages: Record<string, Message[]>;
}
