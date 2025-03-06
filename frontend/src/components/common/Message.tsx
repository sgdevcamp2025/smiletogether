import { formatTime } from '@/lib/date';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserHoverCard from './UserHoverCard';
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
import { useEditMessage } from '@/hooks/channel/useEditMessage';
import { User } from '@/types/user';
import { Client } from '@stomp/stompjs';
import { useDeleteMessage } from '@/hooks/channel/useDeleteMessage';

interface MessageProps {
  messageId: string;
  user: User;
  content: string;
  createdAt: string;
  client: Client;
  workspaceId: string;
  channelId: string;
  onDeleteMessage: (messageId: string) => void;
}

const Message = ({
  messageId,
  user,
  content,
  createdAt,
  client,
  workspaceId,
  channelId,
  onDeleteMessage,
}: MessageProps) => {
  const { user: currentUser } = useUserStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { editMessage } = useEditMessage({ workspaceId, channelId, client });
  const { deleteMessage } = useDeleteMessage({
    workspaceId,
    channelId,
    client,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (newContent: string) => {
    editMessage(messageId, newContent);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    deleteMessage(messageId, () => {
      onDeleteMessage(messageId);
    });
  };

  return (
    <div
      className={`relative flex gap-2 w-full py-2 px-5 transition-colors ${
        isEditing ? 'bg-amber-100' : 'hover:bg-zinc-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="w-12 h-12 rounded-lg">
        <AvatarImage
          src={user.profileImage ?? 'https://github.com/shadcn.png'}
          alt="유저의 프로필이미지"
        />
        <AvatarFallback>{user.username ?? ''}</AvatarFallback>
      </Avatar>

      {isEditing ? (
        <EditBox
          onCancel={handleCancelEdit}
          content={content}
          onSave={handleSaveEdit}
        />
      ) : (
        <div>
          <div className="flex items-center gap-2">
            <UserHoverCard
              userId={user.userId}
              displayName={user.displayName}
              profileImage="https://github.com/shadcn.png"
              isMessage={true}
            />
            <p className="text-sm text-zinc-400">{formatTime(createdAt)}</p>
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
                  <MenubarItem
                    className="text-red-600"
                    onClick={handleDeleteClick}
                  >
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
