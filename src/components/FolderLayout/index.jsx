import React, { useContext } from "react";
import { RowLayout } from "../RowLayout";
import { BackIcon } from "../BackIcon";

import { DirectoryContext } from "../../App";

export const FolderLayout = ({ data }) => {
  const { currentDirectory, setCurrentDirectory } =
    useContext(DirectoryContext);

  if (!data) return null;

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4 min-w-[720px]">
      {/* HEADING */}
      <div className="flex justify-between p-4 bg-secondary mb-8">
        <h4 className="text-xl text-left text-primary">
          {currentDirectory === "" ? "Home/" : currentDirectory}
        </h4>
        {currentDirectory !== "" && (
          <div
            className="h-8 cursor-pointer"
            onClick={() => setCurrentDirectory("")}
          >
            <BackIcon fillColor={"#4f46e5"} />
          </div>
        )}
      </div>
      {/* ROWS */}
      {data.map((row, index) => {
        return <RowLayout key={index} title={row.name} type={row.type} />;
      })}
    </div>
  );
};
