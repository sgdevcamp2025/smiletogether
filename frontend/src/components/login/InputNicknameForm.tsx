import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InputNicknameFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  placeholder: string;
}

export const InputNicknameForm = ({
  onSubmit,
  placeholder,
}: InputNicknameFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md"
      />
      <Button className="w-full bg-amber-300 hover:bg-rose-200 text-white py-2 rounded-md">
        계속
      </Button>
    </form>
  );
};
