import { postFirebaseToken } from '@/apis/alarm';
import { messaging } from '@/fcmConfig';
import { User } from '@/types/user';
import { getToken } from 'firebase/messaging';
import { useEffect } from 'react';

interface Props {
  user: User;
}

export const usePushTokenInit = ({ user }: Props) => {
  useEffect(() => {
    if (!user?.userId) return;
    Notification.requestPermission()
      .then(permission => {
        if (permission === 'granted') {
          getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          }).then(fmc_responsed_token => {
            const expiredAt = new Date();
            expiredAt.setDate(expiredAt.getDate() + 30); // 30일 후 만료일 설정
            const exsiting_token = localStorage.getItem('fcm_token');
            // localstorage에 없거나 있어도 fcm에서 발급받은것과 저장된것이 같다면 서버에 업데이트 해줄 필요가 없음
            if (!exsiting_token || fmc_responsed_token !== exsiting_token) {
              return postFirebaseToken({
                userId: user.userId,
                token: fmc_responsed_token,
                expiredAt: expiredAt.toISOString(),
              }).then(() => {
                localStorage.setItem('fcm_token', fmc_responsed_token);
              });
            }
          });
        } else {
          alert('알림 설정을 거부하셨습니다.');
        }
      })
      .catch(err => {
        console.error('에러 log', err);
      });
  }, [user?.userId]);
};
