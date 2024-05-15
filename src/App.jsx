import React, { useEffect, useState } from "react";
import "./App.css";
import { Header, Loader, FolderLayout, Modal, ErrorModal } from "./components";
import { useApi } from "./hooks/useApi";

export const DirectoryContext = React.createContext({});

export default function App() {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(null);
  const [currentFolderName, setCurrentFolderName] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { error, setError } = useApi();

  useEffect(() => {
    // fetch data on first load here, not very elegant because is not sharing error state
    const abortController = new AbortController();

    const fetchData = async (signal) => {
      const url = process.env.REACT_APP_API_FOLDERS + "/files?path=";

      const response = await fetch(url, { signal });
      const data = await response.json();
      return data;
    };

    setLoading(true);

    // catch error manually here due to this being in an effect, so calling the function from the hook is problematic
    fetchData(abortController.signal)
      .then((response) => {
        setFolders(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    } else {
      setShowErrorModal(false);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {((!loading && showModal) || showErrorModal) && (
        <div className="w-full h-screen absolute top-0 left-0 opacity-90 bg-compliment z-10" />
      )}
      {error && (
        <ErrorModal
          showModal={showErrorModal}
          setShowModal={setShowErrorModal}
          errorDetails={error}
          setError={setError}
        />
      )}
      <Header />
      <DirectoryContext.Provider
        value={{
          currentDirectory,
          setCurrentDirectory,
          setFolders,
          setLoading,
          showModal,
          setShowModal,
          setShowErrorModal,
          error,
          setError,
          currentFolderName,
          setCurrentFolderName,
        }}
      >
        {!loading && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}

        <div className="w-full flex flex-col justify-center items-center p-10">
          {(loading || !folders) && <Loader />}

          {!loading && folders && <FolderLayout data={folders} />}
        </div>
      </DirectoryContext.Provider>
    </div>
  );
}
