import { Textarea } from '@/components/ui/textarea';
import React, { ChangeEvent, useState } from 'react';

interface EditBoxProps {
  onCancel: () => void;
  content: string;
  onSave: (newContent: string) => void;
}

const EditBox = ({ onCancel, content, onSave }: EditBoxProps) => {
  const [message, setMessage] = useState(content);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSave = () => {
    if (message.trim() === '') {
      // 빈 메시지는 저장하지 않음
      return;
    }
    onSave(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift + Enter는 줄바꿈, Enter만 누르면 저장
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    // Esc 키 누르면 취소
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 px-3 py-2 bg-white border rounded-lg shadow-sm">
      <Textarea
        className="flex-grow h-auto px-0 border-none shadow-none resize-none focus-visible:ring-0"
        onChange={handleChange}
        value={message}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="flex items-center justify-end gap-2">
        <button
          className="px-2 py-[2px] border border-zinc-300 rounded-sm text-sm font-medium"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          className="px-2 py-[2px] border border-lime-500 rounded-sm text-sm bg-lime-500 text-white font-medium"
          onClick={handleSave}
          disabled={message.trim() === ''}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditBox;
