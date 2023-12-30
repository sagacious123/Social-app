import React from "react";
import { Audio, TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white">
      <TailSpin
        visible={true}
        height="60"
        width="60"
        color="#5b4fc8"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
