interface DMParticipant {
  userId: string;
  username: string;
  profileImage: string;
}

interface DMLastMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

interface DMItem {
  dmId: string;
  participants: DMParticipant[];
  lastMessage: DMLastMessage;
  unreadCount: number;
}

export interface DMListResponseDto {
  userId: string;
  dms: DMItem[];
}
