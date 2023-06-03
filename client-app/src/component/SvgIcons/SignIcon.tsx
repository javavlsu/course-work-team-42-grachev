import React from 'react'
import { type SvgIconProp } from './types/SvgIcons'

const SignIcon: React.FC<SvgIconProp> = ({
  fillColor = 'currentColor',
  className = '',
  width = 10,
  height = 7
}) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke={fillColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default SignIcon
