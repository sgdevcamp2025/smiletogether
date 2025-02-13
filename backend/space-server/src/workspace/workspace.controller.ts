import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';
import { WorkspaceSearchResponseDto } from './dto/search-workspace.dto';
import { WorkspaceDetailResponseDto } from './dto/workspace-detail.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/workspaces')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async getUserWorkspaces(
    @UserId() userId: string,
  ): Promise<WorkspaceSearchResponseDto> {
    return this.workspaceService.getUserWorkspaces(userId);
  }

  @Post()
  async createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService.createWorkspace(createWorkspaceDto);
  }

  @Get('search')
  async searchWorkspaces(
    @Query('name') name: string,
  ): Promise<WorkspaceSearchResponseDto> {
    return this.workspaceService.searchWorkspacesByName(name);
  }

  @Get(':workspace_id')
  async getWorkspaceById(
    @Param('workspace_id') workspaceId: string,
  ): Promise<WorkspaceDetailResponseDto> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);
    return workspace;
  }
}
