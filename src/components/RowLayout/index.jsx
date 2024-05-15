import React, { useContext } from "react";
import { DirectoryContext } from "../../App";
import { useApi } from "../../hooks/useApi";
import { BinIcon, EditIcon, IconWrapper } from "../index";

export const RowLayout = ({ title, type }) => {
  const {
    currentDirectory,
    setCurrentDirectory,
    setFolders,
    setLoading,
    setShowModal,
    setCurrentFolderName,
  } = useContext(DirectoryContext);

  const { fetchAllFoldersInPath, deleteFolder } = useApi();

  const nextDirTitle = currentDirectory === "" ? title : "/" + title;

  const newDirectoryPath = "/files?path=" + currentDirectory + nextDirTitle;

  const handleNavigateIntoFolder = async () => {
    // dont need try catch here, as the errors are caught in the hook
    setLoading(true);
    const data = await fetchAllFoldersInPath(newDirectoryPath);
    setFolders(data);
    setCurrentDirectory(currentDirectory + nextDirTitle);
    setLoading(false);
  };

  const handleDeleteFolder = async () => {
    // TODO add a confirmation step in the modal when deleting folder to ask if user is sure they want to delete
    const path = currentDirectory + nextDirTitle;
    const body = {
      path: path,
      isDirectory: true,
    };

    // room for improvement, instead of sending 2 api calls, it would be preferable
    // to store current data locally, and delete local reference when delete is succesful on the api
    // but as this is the first draft, 2 api calls is fine
    setLoading(true);
    await deleteFolder(body);

    const currentPath =
      currentDirectory !== ""
        ? "/files?path=" + currentDirectory
        : "/files?path=";
    const data = await fetchAllFoldersInPath(currentPath);
    setFolders(data);

    setCurrentDirectory(currentDirectory !== "" ? currentDirectory : "");
    setLoading(false);
  };

  const handleRenameFolder = () => {
    setCurrentFolderName(title);
    setShowModal(true);
  };

  return (
    <div className="flex w-full border-t-2 border-accent p-4 even:bg-neutral">
      <div
        className="flex-grow text-lg font-semibold cursor-pointer hover:text-accent hover:font-bold"
        onClick={() => handleNavigateIntoFolder()}
      >
        {title}
      </div>
      <div className="w-1/3">{type}</div>
      <div className="w-24">
        <div className="flex w-full h-6 justify-around">
          <IconWrapper
            icon={<BinIcon fillColor={"#ff0000"} />}
            clickHandler={() => handleDeleteFolder()}
          />
          <IconWrapper
            icon={<EditIcon />}
            clickHandler={() => handleRenameFolder()}
          />
        </div>
      </div>
    </div>
  );
};
