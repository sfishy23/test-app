import React, { useEffect, useState, useContext, useRef } from "react";
import { AddFolderForm } from "../index";
import { useApi } from "hooks/useApi";
import { DirectoryContext } from "../../App";
import { removeAfterLastSlash } from "../../utils";
import { CloseIcon } from "../index";

export const Modal = ({ showModal, setShowModal }) => {
  const {
    setCurrentDirectory,
    currentDirectory,
    setFolders,
    setLoading,
    currentFolderName,
    setCurrentFolderName,
  } = useContext(DirectoryContext);
  const [folderFormName, setFolderFormName] = useState("");
  const { fetchAllFoldersInPath, createNewFolder, editFolderName } = useApi();
  const modalInputRef = useRef(null);

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
    const oldPath = currentDirectory + "/" + currentFolderName;
    const newPath = removeAfterLastSlash(oldPath) + folderFormName;

    const body = {
      oldPath: oldPath,
      newPath: newPath,
      isDirectory: true,
    };

    setLoading(true);
    await editFolderName(body);

    const currentPath =
      currentDirectory !== ""
        ? "/files?path=" + currentDirectory
        : "/files?path=";

    const data = await fetchAllFoldersInPath(currentPath);

    setFolders(data);

    setCurrentDirectory(currentDirectory !== "" ? currentDirectory : "");
    setLoading(false);
    setShowModal(false);
  };

  // reset form when newly opened
  useEffect(() => {
    if (showModal) {
      setFolderFormName("");
      if (modalInputRef) {
        modalInputRef.current.focus();
      }
    }
    if (!showModal) {
      setCurrentFolderName(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleSubmitModal = async () => {
    // bit of a dirty solution here, but ran out of time. Modal was going to be fully configurable from a modal config
    // object in the context, but since I needed to speed it up, its just using this currentFolderName value to toggle the form
    if (!currentFolderName) {
      await handleSubmitAddFolder();
    } else {
      await handleRenameFolder();
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {!currentFolderName ? "Add Directory" : "Rename Directory"}
                  </h3>
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
                    inputFieldRef={modalInputRef}
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
                    onClick={() => handleSubmitModal()}
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
