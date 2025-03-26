import React from 'react';

const RadioButton = ({
  id,
  name,
  value,
  children,
  defaultChecked = false,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default RadioButton;
