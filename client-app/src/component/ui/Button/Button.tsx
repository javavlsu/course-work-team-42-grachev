import React from "react";
import style from "./Button.module.scss";
import clsx from "clsx";

type ButtonTypes = {
  text: string;
  backgroundColor: string;
  color: string;
  width?: number;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
};

const Button: React.FC<ButtonTypes> = ({
  text,
  backgroundColor,
  color,
  width = 210,
  type,
  className,
}) => {
  return (
    <button
      className={clsx(style.button, className)}
      type={type}
      style={{
        width: width,
        background: backgroundColor,
        color: color,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
