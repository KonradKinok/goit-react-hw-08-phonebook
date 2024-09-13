import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./Loader.scss";

export const Loader: React.FC = () => {
  return (
    <>
      <div className="container">
        <RotatingLines
          visible={true}
          width="96"
          strokeColor="#0000ff"
          strokeWidth="5"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </>
  );
};
