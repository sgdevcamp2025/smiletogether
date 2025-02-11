import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    return HttpResponse.json(dummy.userWorkspaces);
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
