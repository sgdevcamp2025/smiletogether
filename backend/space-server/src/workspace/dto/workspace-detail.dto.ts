export class WorkspaceUserDto {
  userId?: string | '';
  userEmail?: string | '';
  nickName: string;
  profileImage: string | '';
  role: string;
}

export class WorkspaceDetailResponseDto {
  workspaceId: string;
  name: string;
  ownerId: string;
  profileImage: string;
  users: WorkspaceUserDto[];
  createdAt: Date;
  updatedAt: Date;
}
