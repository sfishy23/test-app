import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { FolderLayout } from "./components/FolderLayout";
import { convertObjectToArray } from "./utils";

function App() {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState("");
  // TODO store error in this state to be surfaced in modal or banner
  // const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

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
  }, []);

  const fetchData = async (signal) => {
    const url = process.env.REACT_APP_API_KEY + "/files?path=";

    const response = await fetch(url, { signal });
    const data = await response.json();
    return data;
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Header />
      <div className="w-full flex flex-col justify-center items-center p-10">
        <div>
          {loading && <Loader />}
          <div>
            <button
              onClick={() => console.log(folders)}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded text-xl"
            >
              list data
            </button>
          </div>
          <div>
            {!loading && folders && (
              <FolderLayout
                data={convertObjectToArray(folders)}
                currentDir={currentDirectory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
