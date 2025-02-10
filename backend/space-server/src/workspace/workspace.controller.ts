import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';
import { WorkspaceSearchResponseDto } from './dto/search-workspace.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  getUser() {
    return this.workspaceService.findAll();
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
}
