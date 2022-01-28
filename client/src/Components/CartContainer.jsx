import React from "react";
import { ChevronDoubleLeft, Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const CartContainer = ({ handleRemoveOne, handleAddToCart, handleDeleteItem, handleDeleteCart, formOpen }) => {
  const { height, width } = useWindowSize();
  const items = useSelector((state) => state?.cart.items);

  return (
    <div
      className="cart-container w-full relative flex flex-col items-center justify-start gap-4 text-gray-900 bg-sound"
      style={{ height: width < 768 ? "calc(100vh - 64px)" : "calc(100vh - 96px)" }}
    >
      {items.length !== 0 && (
        <div className="h-max w-full flex flex-col items-start justify-center gap-2 pt-4 pl-4 md:pl-10 md:pt-6">
          <div className="w-max relative">
            <h2 className="text-center text-xl md:text-2xl font-bold uppercase px-3 md:px-6">Your cart</h2>
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
            className="w-max md:w-48 absolute right-5 flex items-center justify-center gap-2 text-sm uppercase text-white bg-black border border-black px-3 md:px-0 py-1 shadow"
            onClick={handleDeleteCart}
          >
            <span>delete cart</span>
            <Trash size={16} />
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="fixed z-50 inset-0 m-auto w-max flex flex-col items-center justify-center">
          <h1 className="text-lg md:text-xl">YOUR CART IS EMPTY</h1>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-1 text-blue-500 hover:underline hover:font-bold"
          >
            <ChevronDoubleLeft size={12} />
            <span className="capitalize text-lg">go back to the shop</span>
          </Link>
        </div>
      ) : (
        <div
          style={{
            height: width < 768 ? "calc(100vh - 315px)" : "calc(100vh - 220px)",
          }}
          className="items-container scrollbar-cart relative w-full md:w-11/12 xl:w-10/12 overflow-y-auto flex flex-col justify-start items-center gap-4 pb-8 md:pb-4 pt-4"
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                height: width < 500 ? "7rem" : width < 768 ? "12rem" : "14rem",
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
      )}
    </div>
  );
};

export default CartContainer;
