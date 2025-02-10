export class WorkspaceUserDto {
  user_id: number;
  nickname: string;
  role: string;
}

export class WorkspaceDetailResponseDto {
  workspace_id: number;
  name: string;
  owner_id: number;
  profile_image: string;
  users: WorkspaceUserDto[];
  created_at: Date;
  updated_at: Date;
}
