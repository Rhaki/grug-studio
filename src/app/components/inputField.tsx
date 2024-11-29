import type { ChangeEvent, KeyboardEvent } from "react";

interface InputFieldProps {
  className?: string;
  placeholder?: string;
  value: string;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({
  className,
  placeholder,
  value,
  handleInputChange,
  handleKeyDown,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      {placeholder && <p className="p-desc">{placeholder}</p>}
      <input
        className={className}
        type="text"
        placeholder="Search contract"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
