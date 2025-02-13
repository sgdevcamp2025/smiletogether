export class WorkspaceSearchItemDto {
  workspace_id: string;
  name: string;
  owner_id: string;
  nickname: string;
}

export class WorkspaceSearchResponseDto {
  workspaces: WorkspaceSearchItemDto[];
}
