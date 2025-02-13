import { Button } from '@/components/ui/button';

interface WorkspaceProfileModalProps {
  imgFile: string;
  onClose: () => void;
}

const WorkspaceProfileModal = ({
  imgFile,
  onClose,
}: WorkspaceProfileModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-1/4 h-1/2 absolute bg-yellow-50 flex items-center justify-center flex-col">
        <img
          src={imgFile ? imgFile : `/images/icon/user.png`}
          alt="프로필 이미지"
          className="w-3/4 h-3/4 rounded-full border-2 border-gray-300"
        />
        <Button onClick={onClose}>닫기</Button>
      </div>
    </div>
  );
};

export default WorkspaceProfileModal;
