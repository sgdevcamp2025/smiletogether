import { User } from '@/types/user';

export interface GetChannelResponse {
  createdBy: {
    userId: string;
    displayName: string;
    username: string;
  };
  name: string;
  createdAt: string;
  isPrivate: boolean;
  totalMembers: number;
  members: User[];
}

interface Message {
  messageId: string;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  reactions: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  hasThread: boolean;
  threadCount: number;
}

interface DateGroupedMessages {
  [date: string]: Message[]; // 날짜를 키로 갖고 메시지 배열을 값으로 저장
}

export interface GetMessagesResponse {
  channelId: string;
  messages: DateGroupedMessages;
}
