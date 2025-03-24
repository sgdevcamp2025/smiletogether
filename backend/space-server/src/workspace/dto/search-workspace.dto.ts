export class WorkspaceSearchItemDto {
  workspaceId: string;
  name: string;
  ownerId: string;
  nickname: string;
}

export class WorkspaceSearchResponseDto {
  workspaces: WorkspaceSearchItemDto[];
}
