import React from "react";

export const CloseIcon = ({ fillColor }) => {
  const fill = fillColor || "#000000";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M8.002 9.416a1 1 0 111.414-1.414l2.59 2.59 2.584-2.584a1 1 0 111.414 1.414l-2.584 2.584 2.584 2.584a1 1 0 01-1.414 1.414l-2.584-2.584-2.584 2.584a1 1 0 01-1.414-1.414l2.584-2.584-2.59-2.59z"
      ></path>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M23 4a3 3 0 00-3-3H4a3 3 0 00-3 3v16a3 3 0 003 3h16a3 3 0 003-3V4zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
