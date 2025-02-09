import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.userProfiles);
  }),
  http.get('/api/workspaces', () => {
    return HttpResponse.json(dummy.workspaces);
  }),
  http.post('/api/workspaces', async ({ request }) => {
    const newPost = await request.json();
    return HttpResponse.json(newPost, { status: 201 });
  }),
];
