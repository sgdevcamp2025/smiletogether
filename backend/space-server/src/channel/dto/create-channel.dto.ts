import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  isPrivate: boolean;
}
