export class ProfileResponseDto {
  userId: string;
  username: string;
  displayName: string | null;
  profileImage: string;
  position: string | null;
  role: string;
  isActive: boolean;
  statusMessage: string;
}
