import React, { useEffect, useState, useContext } from "react";
import { AddFolderForm } from "../index";
import { useApi } from "hooks/useApi";
import { DirectoryContext } from "../../App";
import { removeAfterLastSlash } from "../../utils";
import { CloseIcon } from "../index";

export const Modal = ({ showModal, setShowModal }) => {
  const { setCurrentDirectory, currentDirectory, setFolders, setLoading } =
    useContext(DirectoryContext);
  const [folderFormName, setFolderFormName] = useState("");
  const { fetchAllFoldersInPath, createNewFolder } = useApi();

  const handleSubmitAddFolder = async () => {
    if (folderFormName === "") return;
    // set an error on form modal when no data present
    const append = !currentDirectory ? "" : currentDirectory + "/";
    const path = append + folderFormName;
    const body = {
      path: path,
    };
    try {
      setLoading(true);
      await createNewFolder(body);

      const currentPath =
        currentDirectory !== ""
          ? "/files?path=" + currentDirectory
          : "/files?path=";
      const data = await fetchAllFoldersInPath(currentPath);
      setFolders(data);
      setCurrentDirectory(currentDirectory !== "" ? currentDirectory : "");

      setLoading(false);
      setShowModal(false);
    } catch (error) {
      // todo surface error from here
    }
  };

  const handleRenameFolder = async () => {
    // const newName = "new";

    const oldPath = currentDirectory + nextDirTitle;
    const newPath = removeAfterLastSlash(oldPath) + folderFormName;

    const body = {
      oldPath: oldPath,
      newPath: newPath,
      isDirectory: true,
    };

    console.log(body);
    setLoading(true);
    // const data = await fetchAllFoldersInPath(newDirectoryPath);
    // await editFolderName();

    // const data = await fetchAllFoldersInPath("/files?path=");
    // setFolders(data);

    // setCurrentDirectory("");
    setLoading(false);
  };

  // reset form when newly opened
  useEffect(() => {
    if (showModal) {
      setFolderFormName("");
    }
  }, [showModal]);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">Add folder</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <div className="h-8">
                      <CloseIcon />
                    </div>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <AddFolderForm
                    value={folderFormName}
                    setValue={(e) => setFolderFormName(e)}
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary text-white active:bg-accent-light font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSubmitAddFolder()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
