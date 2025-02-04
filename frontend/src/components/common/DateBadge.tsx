import { formatDate } from '@/lib/date';

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
