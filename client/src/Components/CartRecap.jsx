import React from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../utils/useWindowSize";

const CartRecap = ({ formValidated, formOpen, toggleForm, handleForm, totalPrice }) => {
  const items = useSelector((state) => state?.cart.items);
  const { height, width } = useWindowSize();
  const totalItems =
    items.length !== 0 &&
    items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);

  return (
    <div
      style={{ height: width > 768 ? "calc(100% - 64px)" : "5rem", display: formValidated && "none" }}
      className="recap w-full md:w-5/6 lg:w-2/3 absolute bottom-0 md:top-0 md:my-auto md:left-10 z-30 flex flex-col items-center justify-center gap-4 md:gap-0 md:justify-evenly bg-black md:bg-white text-white md:text-gray-900 p-16 md:p-8 md:shadow"
    >
      <div className="hidden md:block w-max relative">
        <h2 className="text-lg uppercase px-3">Your order</h2>
        <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
      </div>

      <div className=" hidden w-full px-2 md:flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between py-2 border-b border-gray-200">
          <span>Total items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="w-full flex items-center justify-between py-2 border-b border-gray-200">
          <span>Delivery fees:</span>
          <span className="italic">free</span>
        </div>
      </div>

      <div className="w-10/12 md:w-full flex items-center justify-between md:px-4 md:pt-2 border-b md:border-b-0 md:border-t md:border-gray-900">
        <span className="uppercase whitespace-nowrap">
          TOTAL&nbsp;
          <span className="lowercase">
            &#40;<span className="uppercase">VAT</span> included&#41;
          </span>
          &nbsp;&#58;
        </span>
        <span className="">{totalPrice}&nbsp;€</span>
      </div>
      <button
        type="submit"
        className="w-48 flex items-center justify-center gap-2 text-sm md:text-base uppercase text-black bg-yellow-300 shadow-md py-1 md:mt-4"
        onClick={!formOpen ? toggleForm : handleForm}
      >
        {!formOpen ? <span>checkout</span> : <span>next</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52.4 29.75"
          alt="Shopping Cart"
          fill="currentColor"
          width="1.75rem"
          height=".75rem"
          className="transition-color duration-300 group-hover:text-blue-500"
        >
          <path
            d="M158.92,284H127.83V267a1.5,1.5,0,0,0-1.5-1.5h-6.57a1.5,1.5,0,1,0,0,3h5.07v16.91a1.5,1.5,0,0,0,1.5,1.5h32.59a1.5,1.5,0,1,0,0-3Z"
            transform="translate(-118.26 -265.51)"
          ></path>
          <path
            d="M162.34,277.81h-30a1.5,1.5,0,1,0,0,3h30a1.5,1.5,0,0,0,0-3Z"
            transform="translate(-118.26 -265.51)"
          ></path>
          <path
            d="M165.75,271.66H132.33a1.5,1.5,0,1,0,0,3h33.42a1.5,1.5,0,0,0,0-3Z"
            transform="translate(-118.26 -265.51)"
          ></path>
          <path
            d="M169.16,265.51H132.33a1.5,1.5,0,0,0,0,3h36.83a1.5,1.5,0,0,0,0-3Z"
            transform="translate(-118.26 -265.51)"
          ></path>
          <path
            d="M127.83,288.7a3.29,3.29,0,1,0,3.29,3.28A3.29,3.29,0,0,0,127.83,288.7Z"
            transform="translate(-118.26 -265.51)"
          ></path>
          <path
            d="M151.66,288.7A3.29,3.29,0,1,0,155,292,3.28,3.28,0,0,0,151.66,288.7Z"
            transform="translate(-118.26 -265.51)"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default CartRecap;
