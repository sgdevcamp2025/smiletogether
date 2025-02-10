import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';
import { WorkspaceSearchResponseDto } from './dto/search-workspace.dto';
import { WorkspaceDetailResponseDto } from './dto/workspace-detail.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

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
    @Param('workspace_id', ParseIntPipe) workspaceId: number,
  ): Promise<WorkspaceDetailResponseDto> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);
    return workspace;
  }
}
