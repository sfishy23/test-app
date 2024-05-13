import React from "react";
import { CloseIcon } from "../index";

export const ErrorModal = ({
  showModal,
  setShowModal,
  errorDetails,
  setError,
}) => {
  const handleHideModal = () => {
    setError(null);
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex text-center items-center p-5 border-b border-solid border-accent rounded-t">
                  <h3 className="text-3xl font-semibold ">ERROR</h3>
                  <button
                    className="p-1 ml-auto border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleHideModal()}
                  >
                    <div className="h-8">
                      <CloseIcon />
                    </div>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  {errorDetails ?? "Something went wrong"}
                </div>

                <div className="flex items-center justify-center p-6 border-t border-solid border-accent rounded-b">
                  <button
                    className="text-primary background-transparent font-bold uppercase px-6 py-2 border-primary border-2 rounded shadow hover:shadow-lg outline-accent mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleHideModal()}
                  >
                    Dismiss
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
