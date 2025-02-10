import { Textarea } from '../ui/textarea';
import { ChangeEvent, useState } from 'react';

interface EditBoxProps {
  onCancel: () => void;
  content: string;
}

const EditBox = ({ onCancel, content }: EditBoxProps) => {
  const [message, setMessage] = useState(content);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 bg-white border px-3 py-2 rounded-lg shadow-sm w-full">
      <Textarea
        className="flex-grow h-auto resize-none border-none shadow-none focus-visible:ring-0 px-0"
        onChange={handleChange}
        value={message}
      />
      <div className="flex justify-end items-center gap-2">
        <button
          className="px-2 py-[2px] border border-zinc-300 rounded-sm text-sm font-medium"
          onClick={onCancel}
        >
          취소
        </button>
        <button className="px-2 py-[2px] border border-lime-500 rounded-sm text-sm bg-lime-500 text-white font-medium">
          저장
        </button>
      </div>
    </div>
  );
};

export default EditBox;
