import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  workspace_name: string;

  @IsInt()
  owner_id: number;

  @IsString()
  user_name: string;

  @IsOptional()
  profile_image?: string;

  @IsArray()
  @IsInt({ each: true })
  invite_user_list: number[];
}
