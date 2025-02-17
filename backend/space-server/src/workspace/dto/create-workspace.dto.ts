import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  workspace_name: string;

  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsOptional()
  profile_image?: string;

  @IsArray()
  @IsString()
  invite_user_list: string[];
}
