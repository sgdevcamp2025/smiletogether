import { CiBellOn } from 'react-icons/ci';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoChatbubblesOutline, IoHomeOutline } from 'react-icons/io5';

export const NAVIGATION_ICONS = {
  Home: { icon: <IoHomeOutline />, label: '홈', type: 'Home' },
  DM: { icon: <IoChatbubblesOutline />, label: 'DM', type: 'DM' },
  MyActive: { icon: <CiBellOn />, label: '내 활동', type: 'MyActive' },
  ETC: { icon: <BiDotsHorizontalRounded />, label: '더보기', type: 'ETC' },
};
