const formatDate = (isoString: string): string => {
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

interface DateBadgeProps {
  date: string;
}

const DateBadge = ({ date }: DateBadgeProps) => {
  return (
    <div className="relative flex items-center py-5">
      <div className="border-t border-zinc-200 w-full" />
      <div className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold p-1 w-fit rounded-full border bg-white z-10">
        {formatDate(date)}
      </div>
    </div>
  );
};

export default DateBadge;
