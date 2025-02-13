import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';
import { nanoid } from 'nanoid';
import {
  PostNewWorkspaceRequestDto,
  PostNewWorkspaceResponseDto,
} from '@/apis/workspace/dto';

let db = JSON.parse(JSON.stringify(dummy));

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    return HttpResponse.json(db.userWorkspaces);
  }),
  http.get(`/api/workspaces/:workspaceId`, ({ params }) => {
    const { workspaceId } = params;
    const workspace = db.userWorkspaces.workspaces.find(
      (item: { workspace_id: string | readonly string[] | undefined }) =>
        item.workspace_id === workspaceId
    );
    console.log('find', workspace);
    return HttpResponse.json(workspace);
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

      const workspaceId = nanoid(8);
      const userList = [];
      for (let i = 0; i < newPost.invite_user_list.length; i++) {
        const dummyUser = {
          user_id: 'user_12345',
          profile_image: 'https://example.com/user_12345.png',
        };
        userList.push(dummyUser);
      }

      const workspaceData = {
        workspace_id: workspaceId,
        name: newPost.workspace_name,
        profile_image: newPost.profile_image,
        member_count: newPost.invite_user_list.length,
        workspace_members: userList,
      };
      const responseData: PostNewWorkspaceResponseDto = {
        workspaceId,
        name: String(newPost.workspace_name),
        creator: newPost.owner_id,
        defaultChannel: 'general',
        profileImage: newPost.profile_image,
        inviteResults: {
          success: [],
          failed: newPost.invite_user_list,
        },
        createdAt: new Date().toISOString(),
      };
      db.userWorkspaces.workspaces.push(workspaceData);
      return HttpResponse.json(responseData, { status: 201 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      return HttpResponse.json(
        { error: 'internal server error' },
        { status: 500 }
      );
    }
  }),
  http.get(`/api/workspaces/:workspaceId/channels`, ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    return HttpResponse.json(dummy.channels);
  }),
  http.get('/api/channel', ({ request }) => {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channelId');

    const channel = dummy.channel.find(c => c.channelId === channelId);

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
