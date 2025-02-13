export class WorkspaceSearchItemDto {
  workspace_id: number;
  name: string;
  owner_id: number;
  nickname: string;
}

export class WorkspaceSearchResponseDto {
  workspaces: WorkspaceSearchItemDto[];
}
