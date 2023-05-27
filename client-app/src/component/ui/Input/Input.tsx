import React from "react";
import style from "./Input.module.scss";
import clsx from "clsx";

type InputTypes = {
  placeholder?: string;
  width?: number;
  className?: string;
};

const Input: React.FC<InputTypes> = ({
  placeholder,
  width = 210,
  className,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{ width: width }}
      className={clsx(style.input, className)}
    />
  );
};

export default Input;
