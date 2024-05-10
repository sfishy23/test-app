import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { FolderLayout } from "./components/FolderLayout";
import { convertObjectToArray } from "./utils";

export const DirectoryContext = React.createContext();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState("");
  // TODO store error in this state to be surfaced in modal or banner
  // const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async (signal) => {
      const url =
        process.env.REACT_APP_API_KEY + "/files?path=" + currentDirectory;

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
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    return () => {
      // TODO there is an error being surfaced here, have tried a few changes but abort controller is still
      // firing. Assumption its react strict mode (rerenders twice on each render) that is causing the first call to fail
      abortController.abort();
    };
  }, [currentDirectory]);

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header />
      <DirectoryContext.Provider
        value={{ currentDirectory, setCurrentDirectory }}
      >
        <div className="w-full flex flex-col justify-center items-center p-10">
          {loading && <Loader />}

          {!loading && folders && (
            <FolderLayout data={convertObjectToArray(folders)} />
          )}
        </div>
      </DirectoryContext.Provider>
    </div>
  );
}
