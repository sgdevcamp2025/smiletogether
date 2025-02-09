import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';
import { nanoid } from 'nanoid';
import {
  PostNewWorkspaceRequestDto,
  PostNewWorkspaceResponseDto,
} from '@/apis/workspace/dto';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    return HttpResponse.json(dummy.userWorkspaces);
  }),
  http.post('/api/workspaces', async ({ request }) => {
    const newPost: PostNewWorkspaceRequestDto =
      (await request.json()) as PostNewWorkspaceRequestDto;
    const responseData: PostNewWorkspaceResponseDto = {
      workspaceId: nanoid(8),
      name: newPost.workspace_name,
      creator: newPost.owner_id,
      defaultChannel: 'general',
      profileImage: newPost.profile_image,
      inviteResults: {
        success: [],
        failed: newPost.invite_user_list,
      },
      createdAt: new Date(),
    };
    return HttpResponse.json(responseData, { status: 201 });
  }),
];
