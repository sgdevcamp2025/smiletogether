// src/workspace/dto/create-workspace.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  workspace_image?: string;
}
