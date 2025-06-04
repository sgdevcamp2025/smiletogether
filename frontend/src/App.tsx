import { router } from './routers';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase-messaging-sw';
import { useEffect } from 'react';

const queryClient = new QueryClient({});

function App() {
  useEffect(() => {
    onMessage(messaging, payload => {
      console.log('포그라운드 메세지', payload);
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
