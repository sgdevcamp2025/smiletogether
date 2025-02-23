import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ArrorIcon from '@/components/common/ArrorIcon';
import ModalPortal from '@/components/common/ModalPortal';
import { useModalStore } from '@/stores/modalStore';
import RadioButton from '@/components/common/button/RadioButton';
import XButton from '@/components/common/button/XButton';

const ChannelCreateModal = ({
  channelName,
  channelVisibility,
  setStep,
  setChannelName,
  setChannelVisibility,
}: {
  channelName: string;
  channelVisibility: boolean;
  setStep: (step: number) => void;
  setChannelName: (name: string) => void;
  setChannelVisibility: (channelVisibility: boolean) => void;
}) => {
  return (
    <ModalPortal>
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-lg flex h-screen  max-h-[70vh]">
        <ChannelCreateModalLeftPannel
          channelName={channelName}
          channelVisibility={channelVisibility}
          setStep={setStep}
          setChannelName={setChannelName}
          setChannelVisibility={setChannelVisibility}
        />
        <ChannelCreateModalRightPannel />
      </div>
    </ModalPortal>
  );
};

export default ChannelCreateModal;

const ChannelCreateModalLeftPannel = ({
  channelName,
  channelVisibility,
  setStep,
  setChannelName,
  setChannelVisibility,
}: {
  channelName: string;
  channelVisibility: boolean;
  setStep: (step: number) => void;
  setChannelName: (name: string) => void;
  setChannelVisibility: (channelVisibility: boolean) => void;
}) => {
  const handleChennelVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelVisibility(e.target.value === 'public');
  };

  const handleChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const handleChannelCreateButtonHandler = () => {
    if (channelName === '') {
      alert('채널 이름을 작성해주세요');
      return;
    }
    setStep(2);
  };

  return (
    <div className="w-2/5 px-6 py-8  flex flex-col">
      <Button className="bg-transparent text-black p-0 left-auto flex justify-start">
        <ArrorIcon className="rotate-180 " />
        <span>뒤로</span>
      </Button>
      <h3 className="font-bold text-xl py-2">채널 세부정보</h3>
      <p className="font-bold text-sm py-2">채널 이름</p>
      <div>
        <Input placeholder="# 예: 플랜 예산" onChange={handleChannelName} />
        <span className="text-xs text-gray-400">
          채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운
          이름을 사용하세요
        </span>
      </div>
      <h3 className="pt-4 font-bold">가시성</h3>
      <form action="" className="flex flex-col gap-1">
        <RadioButton
          id="public"
          name="chennel"
          value="public"
          children="공개 -test의 누구나"
          onChange={handleChennelVisibility}
          defaultChecked={true}
        />
        <div className="space-y-1">
          <RadioButton
            id="private"
            name="chennel"
            value="private"
            children="비공개 - 일부 사람만"
            onChange={handleChennelVisibility}
          />
          <span className="text-sm text-gray-500 block pl-5">
            초대를 통해서만 조회 및 가입 가능
          </span>
        </div>
      </form>
      <Button
        className="w-full mt-auto bg-yellow-300 hover:bg-yellow-200"
        onClick={handleChannelCreateButtonHandler}
      >
        새로 만들기
      </Button>
    </div>
  );
};

const ChannelCreateModalRightPannel = () => {
  const closeModal = useModalStore(state => state.closeModal);
  return (
    <div className="w-3/5 px-8 py-10 bg-yellow-100 flex flex-col">
      <div className="flex justify-end">
        <XButton className="p-0" onClick={closeModal} />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-full shadow-lg shadow-black"></div>
      </div>
    </div>
  );
};
