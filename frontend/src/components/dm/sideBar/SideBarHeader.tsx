import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const SideBarHeader = () => {
  return (
    <div className="flex flex-col py-2 px-4 gap-4">
      <div className="flex justify-between items-center">
        <span className="text-lg text-amber-50 font-bold">다이렉트 메시지</span>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-amber-50 font-semibold">읽지 않은 항목</p>
          <Switch className="data-[state=unchecked]:bg-amber-100 data-[state=checked]:bg-amber-300" />
          <img src="/icons/Write.svg" alt="새메시지" />
        </div>
      </div>
      <div className="relative">
        <Input
          className="bg-amber-50 border-amber-100 focus-visible:ring-0 focus:border-amber-300 placeholder:text-amber-200 pl-8"
          placeholder="DM 찾기"
        />
        <img
          className="absolute top-2 left-2 w-5 h-5"
          src="/icons/Search.svg"
          alt="search"
        />
      </div>
    </div>
  );
};

export default SideBarHeader;
