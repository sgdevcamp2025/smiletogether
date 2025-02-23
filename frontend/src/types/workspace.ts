import { WorkspaceMember } from '@/types/user';

export interface Workspace {
  workspaceId: string;
  name: string;
  profileImage: string;
  memberCount: number;
  workspaceMembers: WorkspaceMember[];
}
