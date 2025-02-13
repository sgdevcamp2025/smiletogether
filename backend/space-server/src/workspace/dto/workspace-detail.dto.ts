export class WorkspaceUserDto {
  user_id: string;
  nickname: string;
  role: string;
}

export class WorkspaceDetailResponseDto {
  workspace_id: string;
  name: string;
  owner_id: string;
  profile_image: string;
  users: WorkspaceUserDto[];
  created_at: Date;
  updated_at: Date;
}
