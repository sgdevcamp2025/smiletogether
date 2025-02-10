import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';

@Controller('workspace')
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
}
