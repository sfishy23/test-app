import { useState } from "react";

export const useApi = () => {
  const [error, setError] = useState(null);

  const baseUrl = process.env.REACT_APP_API_FOLDERS;

  const fetchAllFoldersInPath = async (path, signal) => {
    const url = baseUrl + path;

    try {
      const response = await fetch(url, { signal });
      // sanitize data
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
    }
  };

  const deleteFolder = async (data = {}) => {
    try {
      const url = baseUrl + "/files";
      await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
    } catch (error) {
      setError(error);
    }
  };

  const clearAllErrors = () => {
    setError(null);
  };

  const manuallySetError = (error) => {
    setError(error);
  };

  return {
    fetchAllFoldersInPath,
    clearAllErrors,
    manuallySetError,
    error,
    deleteFolder,
  };
};
