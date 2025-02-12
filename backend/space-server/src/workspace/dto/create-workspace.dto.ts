import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  workspace_name: string;

  @IsString()
  owner_id: string;

  @IsString()
  user_name: string;

  @IsOptional()
  profile_image?: string;

  @IsArray()
  @IsInt({ each: true })
  invite_user_list: string[];
}
