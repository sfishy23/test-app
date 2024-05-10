import React, { useContext } from "react";
import { ActionsLayout } from "../ActionsLayout";
import { DirectoryContext } from "../../App";

export const RowLayout = ({ title, type }) => {
  const { currentDirectory, setCurrentDirectory } =
    useContext(DirectoryContext);

  const newDirectory = currentDirectory + title + "/";

  return (
    <div className="flex w-full border-t-2 border-accent p-4 even:bg-neutral">
      <div
        className="w-1/3 text-lg font-semibold cursor-pointer hover:text-accent hover:font-bold"
        onClick={() => setCurrentDirectory(newDirectory)}
      >
        {title}
      </div>
      <div className="w-1/3">{type}</div>
      <div className="w-1/3">
        <ActionsLayout title={title} />
      </div>
    </div>
  );
};
