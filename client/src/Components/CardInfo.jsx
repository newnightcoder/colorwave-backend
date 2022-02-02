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
        height: width > 768 ? "min-content" : "9rem",
        animation: formValidated && "500ms fadeInLeft 300ms forwards ease-out",
      }}
      className="w-full opacity-0 absolute bottom-0 md:static text-sm md:text-base text-black bg-yellow-300 md:border md:border-gray-100 flex flex-col items-center justify-center md:items-start md:justify-start gap-2 md:gap-6 z-40 px-2 py-4"
    >
      <h3 className="uppercase underline font-bold text-center">Please choose a credit card below:</h3>
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
