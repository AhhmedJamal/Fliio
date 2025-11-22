import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  click: () => void;
  children: React.ReactNode;
}

const Button = ({ children, click, className, ...props }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className={`bg-primary text-white px-4 py-2 rounded-full w-full ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
