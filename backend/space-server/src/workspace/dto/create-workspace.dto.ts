import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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

  inviteEmailList: string[];
}
