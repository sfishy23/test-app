import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-accent" />
    </div>
  );
};
