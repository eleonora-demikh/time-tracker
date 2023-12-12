import React, { useCallback, useEffect, useRef } from "react";
import { ArrowDown } from "../UI/ArrowDown";
import { Close } from "../UI/Close";

type Props = {
  value: string;
  placeholder: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  handleToggle: () => void;
  isOpen: boolean;
};

export const DropdownInput: React.FC<Props> = ({
  value,
  placeholder,
  handleChange,
  handleToggle,
  isOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isOpen]);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim();
    handleChange(newQuery);
  }, [handleChange]);

  return (
    <div className='flex space-x-5 relative w-320' onClick={handleToggle}>
      <input
        ref={inputRef}
        className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 pr-6 h-7 w-60 shrink-0 focus:outline-none'
        type='text'
        name='user'
        placeholder={placeholder}
        value={value}
        onChange={handleQueryChange}
      />
      {!isOpen ? <ArrowDown /> : <Close />}
    </div>
  );
};
