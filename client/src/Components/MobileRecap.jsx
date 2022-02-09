import React from "react";
import { XCircle } from "react-bootstrap-icons";
import Div100vh from "react-div-100vh";
import { useSelector } from "react-redux";
import "../Styles/_variables.css";

const MobileRecap = ({ openMobileRecap, toggleMobileRecap }) => {
  const items = useSelector((state) => state?.cart.items);

  return (
    <Div100vh
      style={{
        transform: openMobileRecap ? "translateY(0)" : "translateY(100%)",
        zIndex: 4000,
      }}
      className="md:hidden fixed inset-0 font-cabin flex flex-col items-center justify-center gap-6 rounded-sm overflow-x-hidden overflow-y-auto transition-transform duration-300 text-white bg-black pt-6 pb-12 px-2"
    >
      <div
        style={{ animation: openMobileRecap && items.length !== 0 && "750ms fadeIn 100ms forwards" }}
        className="opacity-0 w-max h-min relative"
      >
        <h1 className="text-xl md:text-3xl px-4 text-center">Your Order</h1>
        <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-white"></span>
      </div>

      <div className="h-2/3 w-11/12 overflow-y-auto scrollbar-description text-gray-900 overflow-x-hidden flex flex-col items-center justify-start gap-3 pt-6 pb-12 pr-2">
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              animation: openMobileRecap && items.length !== 0 && `750ms fadeIn ${200 + i * 100}ms forwards`,
            }}
            className="opacity-0 w-full flex flex items-center justify-left border border-gray-300 only:border-b-0 last:border-b-0 bg-white md:pr-3"
          >
            <div
              style={{
                backgroundColor: item.product.categories.find((x) => x.name === "limited") ? "black" : "white",
              }}
            >
              <img src={item.product.media.source} alt="" className="object-cover h-24 w-full" />
            </div>
            <div className="w-1/3 text-left text-sm pl-2 md:pl-5 whitespace-nowrap truncate">{item.product.name}</div>
            <div className="w-1/3 text-right text-sm pr-2">{item.product.price.formatted}&nbsp;€</div>
          </div>
        ))}
      </div>
      <button
        onClick={toggleMobileRecap}
        className="h-max w-max flex items-center justify-center gap-1 absolute bottom-8"
      >
        <XCircle size={16} className="text-white" /> <span className="uppercase text-sm">close</span>
      </button>
    </Div100vh>
  );
};

export default MobileRecap;
