import ModalPortal from '@/components/common/ModalPortal';

interface WorkspaceActionModalProps {
  title: string;
  onClick: () => void;
  onClickButtonName: string;
  closeModal: () => void;
}

const WorkspaceActionModal = ({
  title,
  onClick,
  onClickButtonName,
  closeModal,
}: WorkspaceActionModalProps) => {
  return (
    <ModalPortal>
      <div className="p-4 w-full max-w-xl bg-white rounded-lg shadow-lg">
        <p className="flex gap-2 items-center">{title}</p>

        <div className="py-5"></div>
        <div className="flex gap-2 justify-end">
          <button
            className="py-1 px-2 border border-zinc-300 rounded-lg font-semibold"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="py-1 px-2 border border-red-600 bg-red-600 rounded-lg text-white font-semibold"
            onClick={onClick}
          >
            {onClickButtonName}
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default WorkspaceActionModal;
