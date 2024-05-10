import React from "react";
import { RowLayout } from "../RowLayout";

export const FolderLayout = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4">
      {/* HEADING */}
      <div className="h-20 p-4 text-info">Home/source/</div>
      {/* ROWS */}
      {data.map((row, index) => {
        return (
          <RowLayout
            key={index}
            title={row.name}
            type={"folder"}
            actions={"xyz"}
          />
        );
      })}
    </div>
  );
};
