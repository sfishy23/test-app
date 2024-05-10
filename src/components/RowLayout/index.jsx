import React from "react";
import { ActionsLayout } from "../ActionsLayout";

export const RowLayout = ({ title, type, currentDir }) => {
  return (
    <div className="flex w-full border-t-2 border-accent p-4 even:bg-neutral">
      <div className="w-1/3 text-lg font-semibold">{title}</div>
      <div className="w-1/3">{type}</div>
      <div className="w-1/3">
        <ActionsLayout title={title} currentDir={currentDir} />
      </div>
    </div>
  );
};
