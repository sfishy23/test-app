import { useState } from "react";

export const useApi = () => {
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_FOLDERS;

  const fetchAllFoldersInPath = async (path, signal) => {
    const url = baseUrl + path;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        setError("Network response error" + response.status);
        throw new Error("Network response was not ok " + response.status);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      setError(e);
    }
  };

  const deleteFolder = async (data = {}) => {
    try {
      const url = baseUrl + "/files";
      const response = await fetch(url, {
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
      if (!response.ok) {
        setError("Network response error" + response.status);
        throw new Error("Network response was not ok " + response.status);
      }
    } catch (e) {
      setError(e);
    }
  };

  const createNewFolder = async (data = {}) => {
    try {
      const url = baseUrl + "/files";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError("Network response error" + response.status);
        throw new Error("Network response was not ok " + response.status);
      }
    } catch (e) {
      setError(e);
    }
  };

  const editFolderName = async (data = {}) => {
    try {
      const url = baseUrl + "/files";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError("Network response error" + response.status);
        throw new Error("Network response was not ok " + response.status);
      }
    } catch (e) {
      setError(e);
    }
  };

  return {
    fetchAllFoldersInPath,
    setError,
    error,
    deleteFolder,
    createNewFolder,
    editFolderName,
  };
};
