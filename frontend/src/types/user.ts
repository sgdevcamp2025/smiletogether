export interface User {
  userId: string;
  username: string;
  displayName: string;
  profileImage: string;
  position?: string;
  statusMessage?: string;
  isActive: boolean;
  isMessage?: boolean;
}
