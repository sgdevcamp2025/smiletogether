import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';
// import { nanoid } from 'nanoid';
// import {
//   PostNewWorkspaceRequestDto,
//   PostNewWorkspaceResponseDto,
// } from '@/apis/workspace/dto';

let db = JSON.parse(JSON.stringify(dummy));

interface InvitedUser {
  userId: string;
  status: string;
}

export const handlers = [
  http.post(`/api/auth/login`, () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMDNjNmIwODMtZThkNi00ODhjLWFhODMtMmEwMWIzZjM5ZDAwIiwiaWF0IjoxNTE2MjM5MDIyfQ.iVTdh4kkGh6f6gEZLf9MJPwkjusaXf58z_Tc4ncummw',
        'Set-Cookie':
          'refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiMDNjNmIwODMtZThkNi00ODhjLWFhODMtMmEwMWIzZjM5ZDAwIiwiaWF0IjoxNTE2MjM5MDIyfQ.iVTdh4kkGh6f6gEZLf9MJPwkjusaXf58z_Tc4ncummw; HttpOnly; Secure; Path=/; SameSite=Strict',
      },
    });
    // // accessToken 만료시 상황을 연습하기 위한 코드입니다.
    // return HttpResponse.json(
    //   {
    //     message: 'Authorization header missing',
    //     error: 'Unauthorized',
    //     statusCode: 401,
    //   },
    //   {
    //     status: 401,
    //   }
    // );
  }),
  http.post(`/api/auth/refresh`, () => {
    return HttpResponse.json({
      status: 200,
    });
    // return HttpResponse.json(
    //   {
    //     statusCode: 401,
    //     message: 'Refresh token not found.',
    //     error: 'Unauthorized',
    //   },
    //   {
    //     status: 401,
    //   }
    // );
  }),
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  // 워크스페이스 생성
  // http.post('/api/workspaces', async ({ request }) => {
  //   try {
  //     const newPost: PostNewWorkspaceRequestDto =
  //       (await request.json()) as PostNewWorkspaceRequestDto;

  //     if (!newPost.workspaceName) {
  //       return HttpResponse.json(
  //         { error: 'workspace name is required' },
  //         { status: 400 }
  //       );
  //     }
  //     if (!newPost.userName) {
  //       return HttpResponse.json(
  //         { error: 'username is required' },
  //         { status: 400 }
  //       );
  //     }

  //     const workspaceId = nanoid(8);
  //     const userList = [];
  //     for (let i = 0; i < newPost.inviteUserList.length; i++) {
  //       const dummyUser = {
  //         userId: 'user_12345',
  //         profileImage: 'https://example.com/user_12345.png',
  //         role: 'member',
  //       };
  //       userList.push(dummyUser);
  //     }
  //     userList.push({
  //       userId: 'user_123457',
  //       profileImage: 'https://example.com/user_12345.png',
  //       role: 'admin',
  //     });

  //     const workspaceData = {
  //       workspaceId: workspaceId,
  //       name: newPost.workspaceName,
  //       profileImage: newPost.profileImage,
  //       memberCount: newPost.inviteUserList.length,
  //       users: userList,
  //     };
  //     const responseData: PostNewWorkspaceResponseDto = {
  //       workspaceId,
  //       name: String(newPost.workspaceName),
  //       creator: newPost.ownerId,
  //       defaultChannel: 'general',
  //       profileImage: newPost.profileImage,
  //       inviteResults: {
  //         success: [],
  //         failed: newPost.inviteUserList,
  //       },
  //       createdAt: new Date().toISOString(),
  //     };
  //     db.userWorkspaces.workspaces.push(workspaceData);
  //     return HttpResponse.json(responseData, { status: 201 });
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (e: unknown) {
  //     return HttpResponse.json(
  //       { error: 'internal server error' },
  //       { status: 500 }
  //     );
  //   }
  // }),
  // 워크스페이스 상세 조회
  http.get(`/api/workspaces/:workspaceId`, ({ params }) => {
    const { workspaceId } = params;
    const workspace = db.userWorkspaces.workspaces.find(
      (item: { workspaceId: string | readonly string[] | undefined }) =>
        item.workspaceId === workspaceId
    );
    return HttpResponse.json(workspace);
  }),
  // 본인 워크스페이스 목록 조회
  http.get('/api/workspaces', () => {
    return HttpResponse.json(db.userWorkspaces);
  }),
  // 워크스페이스 삭제
  http.delete(`/api/workspaces/:workspaceId`, () => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  }),
  // 워크스페이스 초대
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
  // 워크스페이스 나가기
  http.delete(`/api/workspaces/:workspaceId/leave`, () => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  }),

  // 채널 생성
  http.post(`/api/channels`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  // (유저가 소속된) 채널 목록 조회
  http.get(`/api/channels/workspaces/:workspaceId`, () => {
    return HttpResponse.json(dummy.channels);
  }),
  // 채널 초대
  http.post(`/api/channels/invite`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  // 채널 참여
  http.post(`/api/channels/:channelId/join`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  // 채널 삭제
  http.delete(`/api/channels/:channelId`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  // 채널 나가기
  http.delete('/api/channels/:channelId/leave', () => {
    return HttpResponse.json(
      { message: 'leave the chaneel suc' },
      { status: 200 }
    );
  }),

  http.get('/api/channel', () => {
    const channel = dummy.channel.find(c => c.channelId === '12345');
    if (channel) {
      return HttpResponse.json(channel);
    }

    return HttpResponse.json(
      { message: '채널을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),

  http.get('/api/chatMessage', () => {
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
  http.get('/api/dms/:dmId', ({ params }) => {
    const { dmId } = params;
    const dm = dummy.dummyDms.find(dm => dm.dmId === dmId);

    if (!dm) {
      return HttpResponse.json({ message: 'DM not found' }, { status: 404 });
    }

    return HttpResponse.json(dm);
  }),
];
