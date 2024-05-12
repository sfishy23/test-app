import React from "react";

export const EditIcon = ({ fillColor }) => {
  const fill = fillColor || "#3730a3";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.378 8.45l-6.914 6.915a2 2 0 01-1.022.547L7.5 16.5l.588-2.942a2 2 0 01.547-1.022l6.915-6.915m2.828 2.829l1.415-1.414a1 1 0 000-1.415l-1.415-1.414a1 1 0 00-1.414 0L15.55 5.621m2.828 2.829L15.55 5.62M5 20h14"
      ></path>
    </svg>
  );
};
