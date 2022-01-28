import React from "react";
import amex from "../Assets/cards/amex.png";
import mastercard from "../Assets/cards/mastercard.png";
import visa from "../Assets/cards/visa.png";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const CardInfo = ({ formValidated }) => {
  const { height, width } = useWindowSize();

  return (
    <div
      style={{
        height: width > 768 ? "23.5rem" : "8rem",
        animation: formValidated && "500ms fadeInLeft 300ms forwards ease-out",
      }}
      className="w-full md:w-60 opacity-0 text-sm md:text-base text-white bg-gray-900 md:border md:border-gray-100 flex flex-col items-center md:items-start justify-center gap-3 md:gap-6 z-40 py-2 md:py-4 rounded-sm"
    >
      <h3 className="uppercase underline font-bold text-center">Please use one of the following credit cards</h3>
      <div className="h-max w-full flex md:flex-col items-center justify-evenly md:gap-4">
        <div className="h-max w-max md:w-full flex flex-col items-start justify-center gap-1 md:pl-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-6 w-9 rounded overflow-hidden">
              <img src={visa} alt="" className="object-cover h-full w-full overflow-hidden" />
            </div>
            <span>4242 4242 4242 4242</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-6 w-9 rounded overflow-hidden">
              <img src={mastercard} alt="" className="object-cover h-full w-full" />
            </div>
            <span>5555 5555 5555 4444</span>
          </div>
          <div className="flex items-center justify-center gap-2 transform -translate-x-px">
            <div className="h-6 w-10 rounded overflow-hidden">
              <img src={amex} alt="" className="object-cover h-full w-full" />
            </div>
            <span>3782 822463 10005</span>
          </div>
        </div>
        <div className="w-max md:w-full flex flex-col items-start md:pl-7">
          <div className="flex gap-2">
            <span>DATE&nbsp;:</span>
            <span>any future date</span>
          </div>
          <div className="flex gap-2">
            <span>CVC&nbsp;:</span>
            <span>any 3 numbers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
