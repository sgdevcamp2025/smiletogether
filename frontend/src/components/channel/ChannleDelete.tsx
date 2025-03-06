import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ChannleDeleteProps {
  openDeleteChannel: boolean;
  setOpenDeleteChannel: (open: boolean) => void;
  name: string;
  isPrivate?: boolean;
  onClickDeleteChannel: () => void;
}

const ChannleDelete = ({
  openDeleteChannel,
  setOpenDeleteChannel,
  name,
  isPrivate,
  onClickDeleteChannel,
}: ChannleDeleteProps) => {
  return (
    <Dialog open={openDeleteChannel} onOpenChange={setOpenDeleteChannel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="flex gap-2 items-center">
              {isPrivate && (
                <img
                  className="w-5 h-5"
                  src="/icons/Private.svg"
                  alt="private"
                />
              )}
              {name}에서 나가기
            </p>
          </DialogTitle>
          <DialogDescription className="py-5">
            {isPrivate &&
              '비공개 채널에서 나오면 더 이상 해당 채널의 메시지를 볼 수 없게 됩니다. 나중에 이 채널에 다시 참여하려면 초대를 받아야 합니다.'}
          </DialogDescription>
          <div className="flex gap-2 justify-end">
            <button
              className="py-1 px-2 border border-zinc-300 rounded-lg font-semibold"
              onClick={() => setOpenDeleteChannel(false)}
            >
              취소
            </button>
            <button
              className="py-1 px-2 border border-red-600 bg-red-600 rounded-lg text-white font-semibold"
              onClick={onClickDeleteChannel}
            >
              채널에서 나가기
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChannleDelete;
