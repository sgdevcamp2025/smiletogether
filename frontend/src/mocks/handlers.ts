import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';
import { nanoid } from 'nanoid';
import {
  PostNewWorkspaceRequestDto,
  PostNewWorkspaceResponseDto,
} from '@/apis/workspace/dto';

let db = JSON.parse(JSON.stringify(dummy));

interface InvitedUser {
  userId: string;
  status: string;
}

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    return HttpResponse.json(db.userWorkspaces);
  }),
  http.post(`/api/workspaces/:workspaceId/leave`, () => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  }),
  http.delete(`/api/workspaces/:workspaceId`, () => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  }),
  http.get(`/api/workspaces/:workspaceId`, ({ params }) => {
    const { workspaceId } = params;
    const workspace = db.userWorkspaces.workspaces.find(
      (item: { workspaceId: string | readonly string[] | undefined }) =>
        item.workspaceId === workspaceId
    );
    return HttpResponse.json(workspace);
  }),
  http.post('/api/workspaces', async ({ request }) => {
    try {
      const newPost: PostNewWorkspaceRequestDto =
        (await request.json()) as PostNewWorkspaceRequestDto;

      if (!newPost.workspaceName) {
        return HttpResponse.json(
          { error: 'workspace name is required' },
          { status: 400 }
        );
      }
      if (!newPost.username) {
        return HttpResponse.json(
          { error: 'username is required' },
          { status: 400 }
        );
      }

      const workspaceId = nanoid(8);
      const userList = [];
      for (let i = 0; i < newPost.inviteResults.length; i++) {
        const dummyUser = {
          userId: 'user_12345',
          profileImage: 'https://example.com/user_12345.png',
          role: 'member',
        };
        userList.push(dummyUser);
      }
      userList.push({
        userId: 'user_123457',
        profileImage: 'https://example.com/user_12345.png',
        role: 'admin',
      });

      const workspaceData = {
        workspaceId: workspaceId,
        name: newPost.workspaceName,
        profileImage: newPost.profileImage,
        memberCount: newPost.inviteResults.length,
        users: userList,
      };
      const responseData: PostNewWorkspaceResponseDto = {
        workspaceId,
        name: String(newPost.workspaceName),
        creator: newPost.ownerId,
        defaultChannel: 'general',
        profileImage: newPost.profileImage,
        inviteResults: {
          success: [],
          failed: newPost.inviteResults,
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
      const inviteResultsResult: InvitedUser[] = [];
      requestBody.map(email => {
        inviteResultsResult.push({
          userId: email,
          status: 'invitation_sent',
        });
      });
      const response = {
        workspaceId: workspaceId,
        invited_users: inviteResultsResult,
      };
      return HttpResponse.json(response, { status: 200 });
    }
  ),
  http.post(`/api/workspaces/:workspaceId/channels`, async ({ request }) => {
    const requsetBody = await request.json();
    console.log('채널 생성 요청 확인', requsetBody);
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
  http.delete('/api/workspaces/:workspaceId/channels/:channelId/leave', () => {
    return HttpResponse.json(
      { message: 'leave the chaneel suc' },
      { status: 200 }
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
