import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { PlayFill, Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { MobileRecap } from ".";
import useWindowSize from "../utils/useWindowSize";

const CartRecap = ({ formValidated, formOpen, toggleForm, handleForm, totalPrice, handleDeleteCart }) => {
  const items = useSelector((state) => state?.cart.items);
  const { height, width } = useWindowSize();
  const [itemsDivHeight, setItemsDivHeight] = useState(0);
  const [btnContent, setBtnContent] = useState("View");
  const [openMobileRecap, setOpenMobileRecap] = useState(false);

  const toggleCartInRecap = () => {
    setItemsDivHeight(itemsDivHeight === 0 ? "auto" : 0);
    setTimeout(() => {
      setBtnContent(btnContent === "View" ? "Hide" : "View");
    }, 250);
  };

  const toggleMobileRecap = () => {
    setOpenMobileRecap((prevState) => !prevState);
  };

  const totalItems =
    items.length !== 0 &&
    items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);

  return (
    <div
      style={{
        display: formValidated && width < 768 && "none",
        minWidth: width > 768 && "300px",
        maxWidth: width > 768 && "500px",
      }}
      className="recap relative h-20 w-full md:h-5/6 md:w-2/3 z-10 flex flex-col items-center justify-center md:justify-start gap-4 bg-black md:bg-white text-white md:text-gray-900 p-16 md:p-8 overflow-x-hidden overflow-y-hidden md:overflow-y-auto scrollbar-cart font-cabin"
    >
      <div className="hidden md:block w-max relative">
        <h2 className="text-lg uppercase px-3">Your order</h2>
        <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
      </div>
      {formOpen && (
        <>
          <button
            className="inline-block text-sm flex items-center justify-center gap-1 md:py-2"
            onClick={width < 768 ? toggleMobileRecap : toggleCartInRecap}
          >
            <span className="uppercase italic underline">{btnContent} items in the cart</span>
            <PlayFill
              size={16}
              className="transition-transform duration-300"
              style={{
                color: width < 768 ? "white" : "rgb(17 24 39)",
                transform: itemsDivHeight !== 0 && "rotate(90deg)",
              }}
            />
          </button>
          <AnimateHeight duration={500} height={itemsDivHeight}>
            <div className="h-56 2xl:h-44 flex flex-col items-center justify-start overflow-y-auto scrollbar-cart pr-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex flex items-center justify-left border-b border-gray-300 only:border-b-0 last:border-b-0 bg-white"
                >
                  <div
                    style={{
                      backgroundColor: item.product.categories.find((x) => x.name === "limited") ? "black" : "white",
                    }}
                  >
                    <img src={item.product.media.source} alt="" className="object-cover h-20 w-full" />
                  </div>
                  <div className="w-1/3 text-left text-sm pl-2 whitespace-nowrap truncate">{item.product.name}</div>
                  <div className="w-1/3 text-right text-sm pr-2">{item.product.price.formatted}&nbsp;€</div>
                </div>
              ))}
            </div>
          </AnimateHeight>
        </>
      )}

      <div className="h-full w-full flex flex-col items-center justify-evenly gap-4">
        <div className="hidden w-full px-2 md:flex flex-col items-center 2xl:gap-4 justify-center">
          <div className="w-full flex items-center justify-between py-2 border-b border-gray-200">
            <span>Total items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="w-full flex items-center justify-between py-2 border-b border-gray-200">
            <span>Delivery fees:</span>
            <span className="italic">free</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-between md:pt-2 border-b md:border-b-0 md:border-t md:border-yellow-300 px-2">
          <span className="uppercase w-4/5 whitespace-nowrap">
            TOTAL&nbsp;
            <span className="lowercase italic">
              &#40;<span className="uppercase">VAT</span> included&#41;
            </span>
            &nbsp;&#58;
          </span>
          <span className="w-1/5 text-right whitespace-nowrap">{totalPrice}&nbsp;€</span>
        </div>
      </div>

      {!formValidated && (
        <>
          <button
            className="w-max md:w-48 flex items-center justify-center gap-2 text-sm uppercase text-black underline px-3 md:px-0 py-1"
            onClick={handleDeleteCart}
          >
            <span>delete cart</span>
            <Trash size={16} />
          </button>
          <button
            type="submit"
            className="w-48 flex items-center justify-center gap-2 text-sm md:text-base uppercase text-black bg-yellow-300 shadow-md py-2 md:mt-12"
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
        </>
      )}
      <MobileRecap openMobileRecap={openMobileRecap} toggleMobileRecap={toggleMobileRecap} />
    </div>
  );
};

export default CartRecap;
