import React, { useContext } from "react";
import { DirectoryContext } from "../../App";
import { useApi } from "../../hooks/useApi";
import { RowLayout, BackIcon, AddIcon, IconWrapper } from "../index";

export const FolderLayout = ({ data }) => {
  const { createNewFolder, fetchAllFoldersInPath } = useApi();
  const {
    currentDirectory,
    setCurrentDirectory,
    setLoading,
    setFolders,
    setShowModal,
  } = useContext(DirectoryContext);

  if (!data) return null;

  const handleNavigateBack = () => {
    console.log("back");
  };

  const handleAddNewFolder = async (newDirectoryName) => {
    const path = currentDirectory + "/" + newDirectoryName;
    const body = {
      path: path,
    };

    // room for improvement, instead of sending 2 api calls, it would be preferable
    // to store current data locally, and delete local reference when delete is succesful on the api
    // but as this is the first draft, 2 api calls is fine
    setLoading(true);
    await createNewFolder(body);

    const data = await fetchAllFoldersInPath("/files?path=");
    setFolders(data);

    setCurrentDirectory("");
    setLoading(false);
  };

  return (
    <div className="bg-white border-2 border-accent shadow-lg p-4 min-w-[720px]">
      <div className="flex justify-between p-4 bg-secondary mb-8">
        <h4 className="text-xl text-left text-primary">/{currentDirectory}</h4>
        <div className="flex h-8 space-x-4">
          <IconWrapper
            icon={<AddIcon fillColor={"#3730a3"} />}
            clickHandler={() => setShowModal(true)}
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
