"use client"
import React, { FC } from "react";
import { Input, InputProps } from "rizzui";

type TextInputProps = {
  label: string;
  placeholder: string;
  icon?: string;
  type?: InputProps["type"];
  inputStyle?: string;
  containerStyle?: string;
  suffix?: string;
};

const TextInput: FC<TextInputProps> = ({
  type = "text",
  label,
  placeholder,
  inputStyle,
  containerStyle,
  suffix,
}) => {
  return (
    <div className={containerStyle}>
      <div className="font-medium tracking-normal leading-6 text-gray-900">
        {label}
      </div>

      <div className="flex items-center justify-between ">
        <Input
          type={type}
          placeholder={placeholder}
          inputClassName={`${inputStyle} bg-transparent text-sm outline-none p-4 ring-gray-300 ring-0 mt-1 max-w-full tracking-normal text-gray-400 bg-white rounded-md border border-gray-300 border-solid w-[375px] h-[56px] focus:ring-gray-500 focus:border-gray-500 focus:ring-0 transition-all`}
          suffix={suffix}
        />
      </div>
    </div>
  );
};

export default TextInput;
