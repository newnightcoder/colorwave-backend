import React from "react";
import { LockFill } from "react-bootstrap-icons";
import paymentLogos from "../Assets/cards.png";

const PaymentBanner = () => {
  return (
    <div className="banner-container h-24 2xl:h-28 w-full flex items-center justify-center bg-white fixed top-16  md:top-auto md:bottom-0 z-50 shadow">
      <div className="banner h-full w-full max-w-8xl flex items-center justify-evenly text-gray-500">
        <div className="h-3/4 flex flex-col items-center justify-start gap-3 md:gap-2 pt-1 pb-2 2xl:mt-3">
          <div className="uppercase font-bold text-lg md:text-base underline flex items-center justify-center gap-1">
            <LockFill className="text-gray-500 transform -translate-y-px" /> <span>secured payment</span>
          </div>
          <div className="h-6">
            <img src={paymentLogos} alt="" className="object-fit h-full w-full" />
          </div>
        </div>
        <span className="hidden md:block w-px h-1/2 bg-gray-300"></span>
        <div className="h-3/4 hidden md:flex flex-col items-center justify-start gap-px pt-1 pb-2 2xl:mt-3">
          <div className="uppercase font-bold underline">free delivery</div>
          <div className="italic text-sm">
            All over the world <br />
            No matter where
          </div>
        </div>
        <span className="hidden md:block w-px h-1/2 bg-gray-300"></span>

        <div className="h-3/4 hidden md:flex flex-col items-center justify-start text-center gap-px pt-1 pb-2 2xl:mt-3">
          <div className="uppercase font-bold underline">customer service</div>
          <div className="italic text-sm">
            Send us an email <br />
            24/7
          </div>
        </div>
        <span className="hidden md:block w-px h-1/2 bg-gray-300"></span>
        <div className="h-3/4 hidden md:flex flex-col items-center justify-start gap-px pt-1 pb-2 2xl:mt-3">
          <div className="uppercase font-bold underline">best quality</div>
          <div className="text-center italic text-sm">
            We are clearly #1 <br />
            in this industry
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBanner;
