import { User } from '@/types/user';
export interface getWorkspaceChannelsResponseDto {
  channelId: string;
  name: string;
  isPrivate: boolean;
}
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

export interface postWorkspaceChannelsRequestDto {
  name: string;
  isPrivate: boolean;
  emails: string[];
}

export interface postWorkspaceChannelsResponseDto {
  channelId: string;
  name: string;
  isPrivate: boolean;
  createdAt: string;
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  messageId: string;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  reactions: Reaction[];
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
