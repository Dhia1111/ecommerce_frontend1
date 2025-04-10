import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle known route errors (e.g., 404, 401, 500)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error {error.status}</h1>
        <p className="text-xl">{error.statusText || "Something went wrong."}</p>
        {error.data?.message && (
          <p className="text-md mt-2 text-gray-500">{error.data.message}</p>
        )}
      </div>
    );
  }

  // Handle unexpected errors
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unexpected Error</h1>
      <p className="text-xl text-gray-800">{(error)?.message || "Unknown error"}</p>
    </div>
  );
};

export default ErrorElement;
