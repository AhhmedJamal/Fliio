import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link: string;
  styles?: string;
  children: React.ReactNode;
  is_dark?: boolean;
}

const ButtonLink = ({
  children,
  link,
  styles,
  is_dark = true,
}: ButtonProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={`${
        is_dark ? "bg-primary text-white" : "bg-white text-primary"
      } rounded-full btn-border  ${
        styles || ""
      }  transition hover:scale-95 whitespace-nowrap`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
