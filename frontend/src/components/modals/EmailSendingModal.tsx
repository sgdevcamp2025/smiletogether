import ModalPortal from '@/components/common/ModalPortal';

const EmailSendingModal = () => {
  return (
    <ModalPortal>
      <div className=" min-w-64 min-h-48 bg-white text-black flex flex-col items-center justify-center p-5 rounded-lg shadow-lg">
        <div className="w-16 h-16 border-8 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="mt-3 text-lg font-medium">이메일 전송 중...</p>
      </div>
    </ModalPortal>
  );
};

export default EmailSendingModal;
