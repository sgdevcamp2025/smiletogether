import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';
import { nanoid } from 'nanoid';
import {
  PostNewWorkspaceRequestDto,
  PostNewWorkspaceResponseDto,
} from '@/apis/workspace/dto';

let db = JSON.parse(JSON.stringify(dummy));

interface InvitedUser {
  user_id: string;
  status: string;
}

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    console.log('나 부름?', db.userWorkspaces);
    return HttpResponse.json(db.userWorkspaces);
  }),
  http.get(`/api/workspaces/:workspaceId`, ({ params }) => {
    const { workspaceId } = params;
    const workspace = db.userWorkspaces.workspaces.find(
      (item: { workspace_id: string | readonly string[] | undefined }) =>
        item.workspace_id === workspaceId
    );
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
  http.post(
    `/api/workspaces/:workspaceId/invite`,
    async ({ request, params }) => {
      const requestBody = await request.json();
      if (!requestBody || !Array.isArray(requestBody)) {
        return HttpResponse.json(
          {
            message: '입력된 이메일이 없습니다!',
          },
          { status: 400 }
        );
      }
      const { workspaceId } = params;
      const inviteUserListResult: InvitedUser[] = [];
      requestBody.map(email => {
        inviteUserListResult.push({
          user_id: email,
          status: 'invitation_sent',
        });
      });
      const response = {
        workspace_id: workspaceId,
        invited_users: inviteUserListResult,
      };
      return HttpResponse.json(response, { status: 200 });
    }
  ),
  http.post(`/api/workspaces/:workspaceId/channels/invite`, request => {
    return HttpResponse.json({ status: 200 });
  }),
  http.get(`/api/workspaces/:workspaceId/channels`, ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(dummy.channels);
  }),
  http.get('/api/channel', ({ request }) => {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channelId');
    const channel = dummy.channel.find(c => c.channelId === '12345');
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
    if ('12345' === dummy.messages.channelId) {
      return HttpResponse.json(dummy.messages);
    }

    return HttpResponse.json(
      { message: '채널을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),
  http.get('/api/dms', () => {
    return HttpResponse.json(dummy.workspacedmList);
  }),
];
