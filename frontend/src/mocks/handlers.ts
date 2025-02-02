import { http, HttpResponse } from 'msw';
import dummy from '@/mocks/dummy.json';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(dummy.users);
  }),
];
