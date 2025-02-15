import { cn, isValidEmail } from '@/lib/utils';
import React, { useState } from 'react';

interface EmailTagInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
  setIsValidEmail: (isValid: boolean) => void;
  inputType?: 'input' | 'textarea';
  className?: string;
}

const EmailTagInput = ({
  emails,
  setEmails,
  setIsValidEmail,
  inputType = 'input',
  className,
}: EmailTagInputProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [pendingDelete, setPendingDelete] = useState(false);

  const removeLastTagOnBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && emailInput === '') {
      if (!pendingDelete) {
        setPendingDelete(true);
        return;
      }
      setEmails(emails.slice(0, -1));
      setPendingDelete(false);
    } else {
      setPendingDelete(false);
    }
  };

  const addEmailOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isValidEmail(emailInput)) {
        setIsValidEmail(true);
        return;
      }

      if (emailInput !== '' && !emails.includes(emailInput)) {
        setEmails([...emails, emailInput]);
        setEmailInput('');
        setIsValidEmail(false);
      }
    }
  };

  const removeTags = (tag: string) => {
    setEmails(emails.filter(item => item !== tag));
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 p-4 border rounded-md max-w-xl ${className}`}
    >
      {emails.map(tag => {
        return (
          <div className="flex items-center px-2  bg-blue-100 rounded-md text-sm ">
            <span className="flex items-center px-2 py-1 rounded-full text-sm">
              {tag}
            </span>
            <span
              onClick={() => {
                removeTags(tag);
              }}
              className="text-lg"
            >
              x
            </span>
          </div>
        );
      })}
      <input
        className="flex-1 border-none outline-none focus:border-none focus-visible:outline-none focus:ring-0"
        onKeyUp={e => {
          removeLastTagOnBackspace(e);
          addEmailOnEnter(e);
        }}
        placeholder={
          emails.length > 0 ? '' : '예: elis@naver.com, maria@naver.com'
        }
        value={emailInput}
        onChange={e => {
          setEmailInput(e.target.value);
        }}
      />
    </div>
  );
};

export default EmailTagInput;
