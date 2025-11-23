import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  click: () => void;
  styles?: string;
  children: React.ReactNode;
  is_dark?: boolean;
}

const Button = ({ children, click, styles, is_dark = true }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className={`${
        is_dark ? "bg-primary text-white" : "bg-white text-primary "
      } px-4 py-2 rounded-full w-full btn-border ${
        styles || ""
      }  transition hover:scale-95`}
    >
      {children}
    </button>
  );
};

export default Button;
