import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceService {
  getWorkspace(): string {
    return 'Workspace';
  }
}
