import React from 'react'
import { type SvgIconProp } from './types/SvgIcons'

const MenuIcon: React.FC<SvgIconProp> = ({
  fillColor = 'currentColor',
  className = '',
  width = 20,
  height = 17
}) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1.51392"
          width="18"
          height="4.99717"
          rx="1"
          stroke={fillColor}
          strokeWidth="2"
        />
        <rect
          x="1"
          y="10.4858"
          width="18"
          height="5"
          rx="1"
          stroke={fillColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default MenuIcon
