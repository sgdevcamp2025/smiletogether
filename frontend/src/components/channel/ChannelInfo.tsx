import UserHoverCard from '../common/UserHoverCard';

interface ChannelInfoProps {
  userId: string;
  channelName: string;
  displayName: string;
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
}

const ChannelInfo = ({
  userId,
  channelName,
  displayName,
  createdBy,
  createdAt,
  isPrivate,
}: ChannelInfoProps) => {
  const date = new Date(createdAt);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="flex flex-col items-start gap-1 p-5 pt-16">
      <div className="flex gap-3 items-center">
        {isPrivate && <img src="/icons/Private.svg" alt="private" />}
        <span className="text-2xl font-bold">{channelName}</span>
      </div>
      <h6 className="text-sm text-zinc-500">
        <UserHoverCard
          userId={userId}
          username={createdBy}
          displayName={displayName}
          profileImage="https://github.com/shadcn.png"
          isActive={true}
        />
        이(가) 이 날짜 : {month}월 {day}일 채널을 생성했습니다.
        {isPrivate ? ' 비공개' : ' 공개'} 채널이며 초대로만 참여할 수 있습니다.
      </h6>
      <button
        className="flex gap-1 py-1 px-3 border border-zinc-950 text-sm font-semibold rounded-md mt-4"
        onClick={() => {
          console.log('여기는 나중에 사람 추가 모달 연결');
        }}
      >
        <img src="/icons/AddPeople.svg" alt="사람 추가" />
        채널에 사람 추가
      </button>
    </div>
  );
};

export default ChannelInfo;
