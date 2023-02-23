import React from "react";
import { SvgIconProp } from "./types/SvgIcons";

const CityIcon: React.FC<SvgIconProp> = ({
  fillColor = "currentColor",
  className = "",
  width = 17,
  height = 20,
}) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8.5C16 11.3282 14.13 13.9545 12.0535 15.9699C11.036 16.9575 10.0146 17.754 9.24613 18.304C8.95504 18.5123 8.70155 18.6843 8.5 18.8171C8.29845 18.6843 8.04496 18.5123 7.75387 18.304C6.98537 17.754 5.96395 16.9575 4.94648 15.9699C2.86999 13.9545 1 11.3282 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z"
          stroke="#00093C"
          strokeWidth="2"
        />
        <circle cx="8.5" cy="7.5" r="2.5" fill={fillColor} />
      </svg>
    </div>
  );
};

export default CityIcon;
