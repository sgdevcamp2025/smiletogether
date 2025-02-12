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
    try {
      const newPost: PostNewWorkspaceRequestDto =
        (await request.json()) as PostNewWorkspaceRequestDto;

      if (!newPost.workspace_name) {
        return HttpResponse.json(
          { error: 'workspace name is required' },
          { status: 400 }
        );
      }
      if (!newPost.user_name) {
        return HttpResponse.json(
          { error: 'username is required' },
          { status: 400 }
        );
      }
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
        createdAt: new Date().toISOString(),
      };
      return HttpResponse.json(responseData, { status: 201 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      return HttpResponse.json(
        { error: 'internal server error' },
        { status: 500 }
      );
    }
  }),
  http.get('/api/channel', ({ request }) => {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channelId');

    const channel = dummy.channels.find(c => c.channelId === channelId);

    if (channel) {
      return HttpResponse.json(channel);
    }

    return HttpResponse.json(
      { message: '채널을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),
  http.get('/api/chatMessage', ({ request }) => {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channelId');

    if (channelId === dummy.messages.channelId) {
      return HttpResponse.json(dummy.messages);
    }

    return HttpResponse.json(
      { message: '채널을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),
];
