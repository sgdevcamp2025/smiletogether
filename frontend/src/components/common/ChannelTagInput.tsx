import React, { useEffect, useState } from 'react';

interface Channel {
  channelId: string;
  name: string;
  isPrivate: boolean;
}

interface ChannelTagInputProps {
  selectedChannels: string[];
  availableChannels: Channel[];
  setSelectedChannels: (channels: string[]) => void;
  className?: string;
}

const ChannelTagInput = ({
  selectedChannels,
  availableChannels,
  setSelectedChannels,
  className,
}: ChannelTagInputProps) => {
  const [channelInput, setChannelInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);

  const handleBackspaceDelete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && channelInput === '') {
      if (!isDeleting) {
        setIsDeleting(true);
        return;
      }
      setSelectedChannels(selectedChannels.slice(0, -1));
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setIsSuggestionVisible(channelInput.length > 0);
  }, [channelInput]);

  const handleRemoveTag = (tag: string) => {
    setSelectedChannels(selectedChannels.filter(item => item !== tag));
  };

  const filteredChannels = availableChannels.filter(
    channel =>
      channelInput.trim() === '' ||
      channel.name.toLowerCase().includes(channelInput.toLowerCase())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
        break;

      case 'ArrowDown':
        setHighlightedIndex(
          Math.min(highlightedIndex + 1, filteredChannels.length - 1)
        );
        break;

      case 'Enter':
        if (highlightedIndex < filteredChannels.length) {
          if (highlightedIndex === 0 && filteredChannels.length > 0) {
            setHighlightedIndex(0);
          }
          const selectedChannel = filteredChannels[highlightedIndex].name;
          if (selectedChannels.includes(selectedChannel)) {
            alert('이미 선택하신 채널입니다.');
            return;
          }
          setSelectedChannels([...selectedChannels, selectedChannel]);
          setChannelInput('');
          setHighlightedIndex(-1);
        } else {
          alert('존재하지 않는 채널입니다.');
          return;
        }
        break;

      case 'Escape':
        setIsSuggestionVisible(false);
        break;

      default:
        setHighlightedIndex(0);
        break;
    }
  };
  return (
    <div className="relative">
      <div
        className={`flex flex-wrap items-center gap-2 p-4 border rounded-md ${className}`}
      >
        {selectedChannels.map(channel => (
          <div
            key={channel}
            className="flex items-center px-2 bg-blue-100 rounded-md text-sm"
          >
            <span className="px-2 py-1">{channel}</span>
            <span
              onClick={() => handleRemoveTag(channel)}
              className="ml-2 cursor-pointer text-lg"
            >
              ×
            </span>
          </div>
        ))}
        <input
          className="flex-1 border-none outline-none focus:ring-0"
          onKeyDown={e => {
            handleBackspaceDelete(e);
            handleKeyDown(e);
          }}
          placeholder={selectedChannels.length > 0 ? '' : '채널명을 입력하세요'}
          value={channelInput}
          onChange={e => setChannelInput(e.target.value)}
        />
      </div>

      {isSuggestionVisible && filteredChannels.length > 0 && (
        <div className="absolute left-0 w-full bg-white border rounded-md mt-1 shadow-md">
          {filteredChannels.map((channel, index) => (
            <div
              key={channel.channelId}
              className={`p-2 cursor-pointer ${
                highlightedIndex === index ? 'bg-blue-200' : 'hover:bg-gray-100'
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                if (!selectedChannels.includes(channel.name)) {
                  setSelectedChannels([...selectedChannels, channel.name]);
                  setChannelInput('');
                  setIsSuggestionVisible(false);
                } else {
                  alert('이미 선택하신 채널입니다.');
                }
              }}
            >
              {channel.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelTagInput;
