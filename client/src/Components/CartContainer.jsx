import React, { useEffect } from "react";
import { ChevronDoubleLeft, Trash } from "react-bootstrap-icons";
import { use100vh } from "react-div-100vh";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const CartContainer = ({ handleRemoveOne, handleAddToCart, handleDeleteItem, handleDeleteCart, formOpen }) => {
  const { height, width } = useWindowSize();
  const responsiveHeight = use100vh();
  const items = useSelector((state) => state?.cart.items);
  const itemsContainer = items.length !== 0 && document.querySelector(".items");

  useEffect(() => {
    window.addEventListener("DOMContentloaded", () => {
      itemsContainer.classList.add("scrollbar-cart");
    });
    return () => {
      window.removeEventListener("DOMContentloaded");
    };
  }, []);

  return (
    <div className="cart-container h-full w-full relative flex flex-col items-center justify-start md:items-end gap-4 md:gap-0 text-gray-900 bg-sound">
      {items.length !== 0 && (
        <div
          style={{ height: width > 768 ? "8.33%" : "max-content" }}
          className="w-full flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between gap-2 md:gap-0 pt-4 md:pt-0 pl-4 md:pl-10"
        >
          <div className="w-max relative md:hidden">
            <h2 className="text-center text-xl md:text-2xl uppercase px-3 md:px-6">Your cart</h2>
            <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
          </div>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-1 text-gray-900 hover:underline hover:font-bold group md:pl-6"
          >
            <ChevronDoubleLeft size={12} />
            <span>Continue shopping</span>
          </Link>
          <button
            className="md:hidden w-max absolute right-5 flex items-center justify-center gap-2 text-sm uppercase text-white bg-black px-3 py-1 shadow"
            onClick={handleDeleteCart}
          >
            <span>delete cart</span>
            <Trash size={16} />
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="fixed z-50 inset-0 m-auto w-max flex flex-col items-center justify-center gap-1">
          <h1 className="text-lg md:text-xl uppercase">YOUR CART IS EMPTY...</h1>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-1 text-blue-500 hover:underline hover:font-bold"
          >
            <ChevronDoubleLeft size={12} />
            <span className="text-base uppercase">go back to the shop</span>
          </Link>
        </div>
      ) : (
        <div
          style={{
            height: width > 768 ? "83.33%" : responsiveHeight - 308,
          }}
          className="items-container relative w-11/12 xl:w-10/12 flex flex-col justify-center items-center  pb-8 md:pb-4 pt-4 md:pt-0"
        >
          <div className="items overflow-y-auto  h-max flex flex-col items-center justify-start gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  height: width < 500 ? "7rem" : "12rem",
                  animation: `750ms fadeIn ${100 + i * 50}ms forwards`,
                }}
                className="item opacity-0 w-11/12 flex items-center justify-start gap-1 md:gap-6 pr-1 md:px-0 bg-white shadow"
              >
                <div
                  className="h-full w-full md:w-80 border-r border-gray-100"
                  style={{
                    backgroundColor: item.product.categories.find((x) => x.name === "limited") ? "black" : "white",
                  }}
                >
                  <img src={item.product.media.source} alt={item.product.name} className="object-cover h-full w-full" />
                </div>
                <div className="details h-full w-full md:w-1/3 flex items-center justify-center gap-2">
                  <div className="h-full w-full flex flex-col items-start justify-center gap-1 md:gap-2 pl-1 xl:pl-4">
                    <div className="capitalize w-32 whitespace-nowrap truncate">{item.product.name}</div>
                    <div>{item.product.price.formatted} €</div>
                    <div className="w-max flex items-center justify-center gap-1">
                      <div className=" w-max flex items-center justify-between gap-1">
                        <button
                          className="h-6 w-6 rounded-full flex items-center justify-center bg-yellow-300 text-black outline-none shadow-sm"
                          onClick={() => handleRemoveOne(item.product.id)}
                        >
                          <span className="text-lg">-</span>
                        </button>
                        <div className="w-6 text-center">{item.quantity}</div>
                        <button
                          className="h-6 w-6 rounded-full flex items-center justify-center bg-yellow-300 text-black outline-none shadow-sm"
                          onClick={() => handleAddToCart(item.product.id)}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full flex flex-col items-center justify-end md:justify-center">
                  <button
                    onClick={() => handleDeleteItem(item.product.id)}
                    className="h-10 w-10 rounded-full flex items-center justify-center bg-transparent transition-color duration-300 hover:bg-gray-300"
                  >
                    <Trash className="pointer-events-none" size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
