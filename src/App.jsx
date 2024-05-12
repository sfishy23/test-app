import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { FolderLayout } from "./components/FolderLayout";
import { convertObjectToArray } from "./utils";
import { useApi } from "./hooks/useApi";

export const DirectoryContext = React.createContext({});

export default function App() {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState("");

  const { error, manuallySetError } = useApi();

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

    fetchData(abortController.signal)
      .then((response) => {
        setFolders(response);
        setLoading(false);
      })
      .catch((error) => {
        manuallySetError(error);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header />
      <DirectoryContext.Provider
        value={{
          currentDirectory,
          setCurrentDirectory,
          setFolders,
          setLoading,
        }}
      >
        {/* TODO error handling here */}
        {error && (
          <div className="w-full flex flex-col justify-center items-center p-10">
            ERROR
          </div>
        )}

        <div className="w-full flex flex-col justify-center items-center p-10">
          {(loading || !folders) && <Loader />}

          {!loading && folders && (
            <FolderLayout data={convertObjectToArray(folders)} />
          )}
        </div>
      </DirectoryContext.Provider>
    </div>
  );
}
