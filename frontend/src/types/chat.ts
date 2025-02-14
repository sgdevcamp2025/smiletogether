import { User } from './user';

export interface Chat {
  messageId?: number;
  user: User;
  content: string;
  createdAt: string;
}
