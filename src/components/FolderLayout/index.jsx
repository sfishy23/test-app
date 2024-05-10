import React from "react";
import { RowLayout } from "../RowLayout";

export const FolderLayout = ({ data, currentDir }) => {
  if (!data) return null;

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4 min-w-[720px]">
      {/* HEADING */}
      <div className="p-4 bg-secondary mb-8">
        <h4 className="text-2xl text-left text-primary">
          {currentDir === "" ? "Home/" : currentDir}
        </h4>
      </div>
      {/* ROWS */}
      {data.map((row, index) => {
        return (
          <RowLayout
            key={index}
            title={row.name}
            type={row.type}
            currentDir={currentDir}
          />
        );
      })}
    </div>
  );
};
