import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="name@work-email.com"
        className="w-full px-3 py-2 border rounded-md"
      />
      <Button className="w-full bg-amber-300 hover:bg-rose-200 text-white py-2 rounded-md">
        계속
      </Button>
    </form>
  );
};
