import { CiBellOn } from 'react-icons/ci';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoChatbubblesOutline, IoHomeOutline } from 'react-icons/io5';

export const NAVIGATION_ICONS = {
  Home: { icon: <IoHomeOutline />, label: '홈' },
  DM: { icon: <IoChatbubblesOutline />, label: 'DM' },
  MyActive: { icon: <CiBellOn />, label: '내 활동' },
  ETC: { icon: <BiDotsHorizontalRounded />, label: '더보기' },
};
