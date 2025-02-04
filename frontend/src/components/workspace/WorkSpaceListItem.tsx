import { Avatar } from '@/components/common/Avatar';

interface WorkSpaceListItemProps {
  name: string;
  profileImage: string;
  memberCount: number;
  members: memberProps[];
}

interface memberProps {
  user_id: string;
  profile_image: string;
}

export const WorkSpaceListItem = ({
  name,
  profileImage,
  memberCount,
  members,
}: WorkSpaceListItemProps) => {
  return (
    <div className="flex items-center mt-8 px-6 py-4 w-full max-w-lg border rounded-lg shadow hover:bg-gray-50">
      <Avatar src={profileImage} alt="workspace_profile_image" fallback="CN" />
      <div className="pl-2 flex flex-col">
        <h2 className="font-medium">{name}</h2>
        <div className="flex">
          <div className="flex">
            {members &&
              members.map(item => {
                return (
                  <Avatar src={item.profile_image} alt="user_profile_image" />
                );
              })}
          </div>
          <p className="text-gray-600 text-sm">{memberCount}</p>
        </div>
      </div>
      <div className="ml-auto text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};
