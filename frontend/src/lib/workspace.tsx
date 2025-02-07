interface StepData {
  [key: number]: {
    title: string | ((worksapceName: string) => string);
    description: string;
  };
}

export const stepData: StepData = {
  1: {
    title: '회사 또는 팀 이름이 어떻게 되나요',
    description: '이것은 smiltogether 워크스페이스의 이름이 됩니다.',
  },
  2: {
    title: '이름을 알려주세요',
    description: '팀원이 고객님을 쉽게 알아보고 연계하는데 도움이 됩니다.',
  },
  3: {
    title: (workspaceName: string) => `${workspaceName} 에 또 누가 있나요`,
    description: '이메일로 직장동료 추가',
  },
};
