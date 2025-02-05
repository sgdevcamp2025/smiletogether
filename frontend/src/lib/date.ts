export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formatter.format(date);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const weekday = weekdays[date.getDay()];

  return `${month}월 ${day}일 ${weekday}`;
};
