"use client";
import React, { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  [key: string]: unknown;
};

const Button: FC<ButtonProps> = ({ children, handleClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} justify-center items-center px-8 py-4 mt8 max-w-full text-base font-normal text-center text-white whitespace-nowrap bg-green-600 rounded-xl w-full max-md:px-5 hover:opacity-85 transition-all focus:outline-none focus:ring-0  shadow-[0px_4px_16px_rgba(0,165,81,0.39)]`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
