import React from "react";
import { BinIcon } from "../BinIcon";

export const ActionsLayout = ({ title, currentDir }) => {
  return (
    <div className="flex w-full h-6">
      <div
        className="hover:bg-gray-200 cursor-pointer"
        onClick={() => console.log("delete ", currentDir + title)}
      >
        <BinIcon fillColor={"#ff0000"} />
      </div>
    </div>
  );
};
