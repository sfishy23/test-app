import React from "react";

export const RowLayout = ({ title, type, actions }) => {
  return (
    <div className="flex w-full">
      <div className="w-1/3">{title}</div>
      {/* <div className="w-1/3">{title}</div>
      <div className="w-1/3">{title}</div> */}
    </div>
  );
};
