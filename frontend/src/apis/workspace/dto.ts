interface workSpaceMember {
  user_id: string;
  profile_image: string;
}

export interface GetWorkSpaceResponseDto {
  workspace_id: string;
  name: string;
  profile_image: string;
  member_count: number;
  workspace_members: workSpaceMember[];
}
