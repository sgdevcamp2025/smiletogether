import { User } from './user';

export interface Chat {
  messageId?: number;
  user: User;
  content: string;
  createdAt: string;
}

interface Reaction {
  count: number;
  emoji: string;
  user: User[];
}

export interface MessageType {
  content: string;
  createdAt: string;
  hasThread: boolean;
  isUpdated: boolean;
  messageId: string;
  reactions: Reaction[];
  threadCount: number;
  updateAt: string | null;
  user: User;
}
