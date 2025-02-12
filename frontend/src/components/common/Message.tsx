import { formatTime } from '@/lib/date';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserHoverCard from './UserHoverCard';
import { User } from '@/types/user';
import { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import EditBox from './EditBox';
import { useUserStore } from '@/stores/userStore';

interface MessageProps {
  messageId?: number;
  user: User;
  content: string;
  createdAt: string;
}

const Message = ({ user, content, createdAt }: MessageProps) => {
  const { user: currentUser } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`relative flex gap-2 w-full p-2 transition-colors ${
        isEditing ? 'bg-amber-100' : 'hover:bg-zinc-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="rounded-lg w-12 h-12">
        <AvatarImage src={user.profileImage} alt="유저의 프로필이미지" />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>

      {isEditing ? (
        <EditBox onCancel={handleCancelEdit} content={content} />
      ) : (
        <div>
          <div className="flex gap-2 items-center">
            <UserHoverCard
              userId={user.userId}
              username={user.username}
              displayName={user.displayName}
              profileImage="https://github.com/shadcn.png"
              isActive={true}
              isMessage={true}
            />
            <p className="text-zinc-400 text-sm">{formatTime(createdAt)}</p>
          </div>
          <p className="text-base">{content}</p>
        </div>
      )}

      {isHovered && !isEditing && (
        <Menubar className="absolute top-[-12px] right-1">
          <MenubarMenu>
            <MenubarTrigger>Emoji</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>여기에 이모지가 나와야함</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Thread</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>여기도 스레드가 나와야함</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Option</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>스레드에서 허들 시작</MenubarItem>
              {currentUser.userId === user.userId && (
                <>
                  <MenubarSeparator />
                  <MenubarItem onClick={handleEditClick}>
                    메시지 편집
                  </MenubarItem>
                  <MenubarItem className="text-red-600">
                    메시지 삭제
                  </MenubarItem>
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </div>
  );
};

export default Message;
