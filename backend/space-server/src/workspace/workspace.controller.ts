import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';
import { WorkspaceSearchResponseDto } from './dto/search-workspace.dto';
import { WorkspaceDetailResponseDto } from './dto/workspace-detail.dto';
import { JwtService } from '@nestjs/jwt';
import { UserId } from 'src/decorators/user-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @Get('testjwt')
  async testJWT(@Req() req: Request): Promise<any> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token) as { userId?: number };
    const userId = decoded.userId;

    console.log('token: ', decoded, userId);
    return userId;
  }

  @Get('testdecorator')
  @UseGuards(AuthGuard)
  async testDecorator(@UserId() userId: string): Promise<any> {
    console.log('userId: ', userId);
    return userId;
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
    @Param('workspace_id', ParseIntPipe) workspaceId: number,
  ): Promise<WorkspaceDetailResponseDto> {
    const workspace = await this.workspaceService.getWorkspaceById(workspaceId);
    return workspace;
  }
}
