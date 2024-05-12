import React, { useContext } from "react";
import { DirectoryContext } from "../../App";
import { useApi } from "../../hooks/useApi";
import { BinIcon } from "../BinIcon";
import { EditIcon } from "../EditIcon";

export const RowLayout = ({ title, type }) => {
  const { currentDirectory, setCurrentDirectory, setFolders, setLoading } =
    useContext(DirectoryContext);

  const { fetchAllFoldersInPath, deleteFolder } = useApi();

  const newDirectoryPath = "/files?path=" + currentDirectory + title + "/";

  const handleNavigateIntoFolder = async () => {
    setLoading(true);
    const data = await fetchAllFoldersInPath(newDirectoryPath);
    setFolders(data);

    setCurrentDirectory(newDirectoryPath);
    setLoading(false);
  };

  const handleDeleteFolder = async () => {
    const path = currentDirectory + title;
    const body = {
      path: path,
      isDirectory: true,
    };
    console.log(body);
    setLoading(true);
    // scope for improvement, instead of sending 2 api calls, it would be preferable
    // to store current data locally, and delete local reference when delete is succesful on the api
    // but as this is the first draft, 2 api calls is fine
    // const res = await deleteFolder(body);

    const data = await fetchAllFoldersInPath("/files?path=");
    setFolders(data);

    setCurrentDirectory("");
    setLoading(false);
  };

  const handleRenameFolder = async () => {
    setLoading(true);
    // const data = await fetchAllFoldersInPath(newDirectoryPath);

    const data = await fetchAllFoldersInPath("/files?path=");
    setFolders(data);

    setCurrentDirectory("");
    setLoading(false);
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
        <div className="flex w-full h-6">
          <div
            className="cursor-pointer hover:scale-125 cursor-pointer transition-all duration-300"
            onClick={() => handleDeleteFolder()}
          >
            <BinIcon fillColor={"#ff0000"} />
          </div>
          <div
            className="cursor-pointer hover:scale-125 cursor-pointer transition-all duration-300"
            onClick={() => handleDeleteFolder()}
          >
            <EditIcon fillColor={"#ff0000"} />
          </div>
        </div>
      </div>
    </div>
  );
};
