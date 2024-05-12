import React, { useContext } from "react";
import { RowLayout } from "../RowLayout";
import { BackIcon } from "../BackIcon";
import { DirectoryContext } from "../../App";
import { AddIcon } from "../AddIcon";
import { IconWrapper } from "../IconWrapper";

export const FolderLayout = ({ data }) => {
  const { currentDirectory, setCurrentDirectory } =
    useContext(DirectoryContext);

  if (!data) return null;

  const handleNavigateBack = () => {
    console.log("back");
  };

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4 min-w-[720px]">
      <div className="flex justify-between p-4 bg-secondary mb-8">
        <h4 className="text-xl text-left text-primary">/{currentDirectory}</h4>
        <div className="flex h-8 space-x-4">
          <IconWrapper
            icon={<AddIcon fillColor={"#3730a3"} />}
            clickHandler={() => console.log("add")}
          />
          {currentDirectory !== "" && (
            <IconWrapper
              icon={<BackIcon fillColor={"#4f46e5"} />}
              clickHandler={() => handleNavigateBack}
            />
          )}
        </div>
      </div>
      {data.map((row, index) => {
        return <RowLayout key={index} title={row.name} type={row.type} />;
      })}
    </div>
  );
};
