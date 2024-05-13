import React from "react";

export const AddFolderForm = ({ value, setValue }) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-4">
        <label>Folder Name</label>
        <input
          type="text"
          id="folderName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="appearance-none border-2 border-accent rounded"
        />
      </div>
    </div>
  );
};
