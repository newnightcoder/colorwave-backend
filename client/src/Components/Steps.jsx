import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useWindowSize from "../utils/useWindowSize";

const Steps = ({ formOpen, formValidated }) => {
  const { height, width } = useWindowSize();
  const paymentValidated = useSelector((state) => state.cart.paymentValidated);
  const items = useSelector((state) => state?.cart.items);

  return (
    <div className="hidden h-24 w-screen fixed top-0 md:flex items-center justify-center bg-black z-50 shadow border-b-8 border-yellow-300">
      <div className="h-full w-full max-w-6xl flex items-center justify-center -gap-1">
        {width > 500 && (
          <Link to="/" className="w-max group">
            <div className="relative">
              <span
                className="block absolute -inset-1 transform transition-all duration-300 -skew-y-6  bg-white group-hover:skew-y-3 group-hover:bg-yellow-300 "
                aria-hidden="true"
              ></span>
              <h1 className="relative text-lg transition-color duration-300 text-black px-1">COLORWAVE</h1>
            </div>
          </Link>
        )}
        <div className="w-1/3 relative flex items-center justify-center">
          <div
            style={{ backgroundColor: items.length !== 0 ? "rgb(253 224 71)" : "white" }}
            className="h-8 w-8 z-10 relative rounded-full flex items-center justify-center text-black text-xl"
          >
            1
            <span className="block absolute -bottom-1 transform translate-y-full text-xs md:text-sm uppercase text-white whitespace-nowrap">
              my cart
            </span>
          </div>
          <div
            style={{ backgroundColor: formOpen ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform translate-x-2/4 ml-1"
          ></div>
        </div>

        <div className="w-1/3 relative flex items-center justify-center">
          <div
            style={{ backgroundColor: formOpen ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform -translate-x-2/4"
          ></div>
          <div
            style={{ backgroundColor: formOpen ? "rgb(253 224 71)" : "white" }}
            className="h-8 w-8 z-10 relative rounded-full flex items-center justify-center text-black text-xl"
          >
            2
            <span className="block absolute -bottom-1 transform translate-y-full text-xs md:text-sm uppercase text-white whitespace-nowrap">
              delivery
            </span>
          </div>
          <div
            style={{ backgroundColor: formValidated ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform translate-x-2/4 ml-1"
          ></div>
        </div>

        <div className="w-1/3 relative flex items-center justify-center">
          <div
            style={{ backgroundColor: formValidated ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform -translate-x-2/4"
          ></div>
          <div
            style={{ backgroundColor: formValidated ? "rgb(253 224 71)" : "white" }}
            className="h-8 w-8 z-10 rounded-full relative flex items-center justify-center text-black text-xl"
          >
            3
            <span className="block absolute -bottom-1 transform translate-y-full text-xs md:text-sm uppercase text-white whitespace-nowrap">
              payment
            </span>
          </div>
          <div
            style={{ backgroundColor: paymentValidated ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform translate-x-2/4 ml-1"
          ></div>
        </div>
        <div className="w-1/3 relative flex items-center justify-center">
          <div
            style={{ backgroundColor: paymentValidated ? "rgb(253 224 71)" : "white" }}
            className="h-px w-1/2 absolute my-auto mx-auto transform -translate-x-2/4"
          ></div>
          <div
            style={{ backgroundColor: paymentValidated ? "rgb(253 224 71)" : "white" }}
            className="h-8 w-8 z-10 rounded-full relative flex items-center justify-center text-black text-xl"
          >
            4
            <span className="block absolute -bottom-1 transform translate-y-full text-xs md:text-sm uppercase text-white whitespace-nowrap">
              ready!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
