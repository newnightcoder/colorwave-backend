import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen w-screen bg-gray-300 text-gray-100 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-8xl text-bold">404 - page not found</h1>
      <Link to="/">
        <div className="py-2 px-3 bg-black text-white shadow-sm">back to ColorWave</div>
      </Link>
    </div>
  );
};

export default PageNotFound;
