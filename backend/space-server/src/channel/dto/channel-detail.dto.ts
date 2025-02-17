export class ChannelDetailsDto {
  channelId: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  members: MemberDto[];
  createdAt: string;
  lastActiveAt: string;
}

export class MemberDto {
  userId: string;
  nickname: string;
  profileImage: string;
}
