import React, { useContext } from "react";
import { DirectoryContext } from "../../App";
import { useApi } from "../../hooks/useApi";
import { stringContainsSlash, trimStringAfterSlash } from "../../utils";
import { RowLayout, BackIcon, AddIcon, IconWrapper } from "../index";

export const FolderLayout = ({ data }) => {
  const { fetchAllFoldersInPath } = useApi();
  const {
    currentDirectory,
    setCurrentDirectory,
    setLoading,
    setFolders,
    setShowModal,
    setError,
  } = useContext(DirectoryContext);

  if (!data) return null;

  const handleNavigateBack = async () => {
    const hasSlash = stringContainsSlash(currentDirectory);

    const newDirectory = hasSlash ? trimStringAfterSlash(currentDirectory) : "";
    const newPath = "/files?path=" + newDirectory;
    try {
      setLoading(true);
      const data = await fetchAllFoldersInPath(newPath);
      setFolders(data);
      setCurrentDirectory(newDirectory !== "" ? newDirectory : "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleAddFolderModal = () => {
    setShowModal(true);
  };

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4 min-w-[720px]">
      <div className="flex justify-between p-4 bg-secondary mb-8">
        <h4 className="text-xl text-left text-primary">/{currentDirectory}</h4>
        <div className="flex h-8 space-x-4">
          <IconWrapper
            icon={<AddIcon fillColor={"#3730a3"} />}
            clickHandler={() => handleAddFolderModal()}
          />
          {currentDirectory !== "" && (
            <IconWrapper
              icon={<BackIcon fillColor={"#4f46e5"} />}
              clickHandler={() => handleNavigateBack()}
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
