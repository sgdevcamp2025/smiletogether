export class ChannelDetailsDto {
  channelId: string;
  channelName: string;
  description: string | null;
  createdAt: string;
  createdBy: MemberDto;
  isPrivate: boolean;
  totalMembers: number;
  members: MemberDto[] | null;
}

export class MemberDto {
  userId: string;
  nickname: string;
  displayName: string | null;
  profileImage: string;
  position: string | null;
  isActive: boolean;
  statusMessage: string | null;
}
