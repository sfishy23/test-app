import React from "react";

export const IconWrapper = ({ icon, clickHandler }) => {
  return (
    <div
      className="cursor-pointer hover:scale-125 cursor-pointer transition-all duration-300"
      onClick={() => clickHandler()}
    >
      {icon}
    </div>
  );
};
