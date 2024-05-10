import React, { useContext } from "react";
import { BinIcon } from "../BinIcon";
import { DirectoryContext } from "../../App";

export const ActionsLayout = ({ title }) => {
  const { currentDirectory } = useContext(DirectoryContext);

  return (
    <div className="flex w-full h-6">
      <div
        className="hover:bg-gray-200 cursor-pointer"
        onClick={() => console.log("delete ", currentDirectory + title)}
      >
        <BinIcon fillColor={"#ff0000"} />
      </div>
    </div>
  );
};
