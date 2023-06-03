import React from 'react'
import { type SvgIconProp } from './types/SvgIcons'

const ProfileIcon: React.FC<SvgIconProp> = ({
  fillColor = 'currentColor',
  className = '',
  width = 18,
  height = 19
}) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5.18024"
          y="1"
          width="6.63833"
          height="8.41108"
          rx="3.31917"
          stroke={fillColor}
          strokeWidth="2"
        />
        <path
          d="M1 15.4111C1 13.7543 2.34315 12.4111 4 12.4111H13.2795C14.9364 12.4111 16.2795 13.7543 16.2795 15.4111V16.3229C16.2795 16.8752 15.8318 17.3229 15.2795 17.3229H2C1.44772 17.3229 1 16.8752 1 16.3229V15.4111Z"
          stroke={fillColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default ProfileIcon
