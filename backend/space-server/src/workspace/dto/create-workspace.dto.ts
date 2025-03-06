import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  workspaceName: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  profileImage?: string;

  @IsArray()
  @IsString()
  inviteUserList: string[];
}
