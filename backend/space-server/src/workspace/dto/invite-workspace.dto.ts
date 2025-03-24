import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class InviteWorkspaceDto {
  @IsArray()
  @IsString()
  @IsNotEmpty()
  inviteUserList: string[];
}
