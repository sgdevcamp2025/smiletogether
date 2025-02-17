interface InfoProps {
  manager: string;
  handleLeaveChannel: () => void;
}

const Info = ({ manager, handleLeaveChannel }: InfoProps) => {
  return (
    <div className="p-5 bg-zinc-100 rounded-lg">
      <div className="bg-white rounded-lg border border-zinc-200">
        <div className="p-4">
          <span className="font-semibold text-sm">채널 매니저</span>
          <p className="text-xs pt-2">{manager}</p>
        </div>
        <div className="w-full h-[1px] bg-zinc-200" />
        <div
          className="p-4 font-semibold text-sm text-red-600"
          onClick={handleLeaveChannel}
        >
          채널에서 나가기
        </div>
      </div>
    </div>
  );
};

export default Info;
