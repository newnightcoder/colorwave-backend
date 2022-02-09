import React from "react";
import { ChevronDoubleLeft, ChevronDoubleRight, XCircle, XLg } from "react-bootstrap-icons";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { deleteItem, toggleCartDrawer } from "../../Redux/Actions/cart.action";
import "../../Styles/_variables.css";

const CartDrawer = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const cartDrawerOpen = useSelector((state) => state?.cart.cartDrawerOpen);

  // const handleAddToCart = (e) => {
  //   items.forEach((item) => {
  //     if (item.product.name === e.target.parentElement.parentElement.firstChild.innerText) {
  //       dispatch(addToCart(item.product, item.quantity));
  //     }
  //   });
  // };

  // const handleRemoveOne = (e) => {
  //   items.forEach((item) => {
  //     if (item.quantity === 1) dispatch(deleteItem(item.product));
  //     if (item.product.name === e.target.parentElement.parentElement.firstChild.innerText) {
  //       dispatch(removeOne(item.product, item.quantity));
  //     }
  //   });
  // };

  // const handleDeleteCart = () => {
  //   dispatch(deleteItem(items));
  // };

  const handleDeleteItem = (id) => {
    items.forEach((item) => {
      if (item.product.id === id) {
        dispatch(deleteItem(item.product));
      }
    });
  };

  const totalPrice =
    items?.length !== 0 &&
    items?.reduce((acc, curr) => {
      return acc + curr.product.price.raw * curr.quantity;
    }, 0);

  return (
    <Div100vh
      style={{
        transform: cartDrawerOpen && !location.pathname.includes("cart") ? "translateY(0)" : "translateY(-101%)",
        zIndex: 4000,
      }}
      className="w-full fixed md:w-2/3 lg:w-1/2 2xl:w-1/3 font-cabin flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto transition-transform duration-300 text-gray-900 right-0 top-0 bg-sound pt-6 pb-12 px-5 md:px-10"
    >
      <button onClick={() => dispatch(toggleCartDrawer())} className="h-max w-max">
        <XLg size={24} className="absolute top-8 right-10 z-50" />
      </button>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-6">
        <div
          style={{ animation: cartDrawerOpen && items.length !== 0 && "750ms fadeIn 100ms forwards" }}
          className="opacity-0 w-max h-min relative"
        >
          <h1 className="text-xl md:text-3xl px-4 text-center">Your Cart</h1>
          <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
        </div>

        <div className="h-2/3 w-full overflow-y-auto scrollbar-cart overflow-x-hidden flex flex-col items-center justify-start space-y-2 pt-6 pb-12">
          {items?.length !== 0 ? (
            items.map((item, i) => (
              <div
                key={i}
                style={{
                  animation: cartDrawerOpen && items.length !== 0 && `750ms fadeIn ${200 + i * 100}ms forwards`,
                }}
                className="opacity-0 h-max w-11/12 flex flex items-center justify-left border-b border-gray-300 only:border-b-0 last:border-b-0 bg-white md:pr-3"
              >
                <div
                  style={{
                    backgroundColor: item.product.categories.find((x) => x.name === "limited") ? "black" : "white",
                  }}
                  className="h-24"
                >
                  <img src={item.product.media.source} alt="" className="object-cover h-full w-full" />
                </div>
                <div className="w-1/3 text-left text-sm pl-2 md:pl-5 whitespace-nowrap truncate">
                  {item.product.name}
                </div>
                <div className="w-1/3 text-right text-sm pr-2">{item.product.price.formatted}&nbsp;€</div>
                <button
                  onClick={() => handleDeleteItem(item.product.id)}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-transparent transition-color duration-300 hover:bg-gray-300"
                >
                  <XCircle className="pointer-events-none" size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="h-screen w-screen text-lg flex flex-col items-center justify-center">
              YOUR CART IS EMPTY
            </div>
          )}
        </div>
        <div
          style={{ animation: cartDrawerOpen && items.length !== 0 && "750ms fadeIn 400ms forwards" }}
          className="opacity-0 h-max flex flex-col md:flex-row items-center justify-center md:space-x-8 "
        >
          <button
            onClick={() => dispatch(toggleCartDrawer())}
            className="w-48 md:w-56 flex items-center justify-center space-x-2 text-sm md:text-base text-gray-900 py-2 md:py-3 shadow-md transition-shadow duration-100 hover:shadow-none bg-yellow-300 mt-4 uppercase outline-none"
          >
            <ChevronDoubleLeft size={16} /> <span>Continue shopping</span>
          </button>
          <button
            style={{ display: items.length === 0 ? "none" : "flex" }}
            className="w-48 md:w-56 items-center justify-center space-x-2 text-sm md:text-base text-gray-900 py-2 md:py-3 shadow-md transition-shadow duration-100 hover:shadow-none bg-yellow-300 mt-4 uppercase outline-none"
            onClick={() => {
              history.push("/cart");
              dispatch(toggleCartDrawer());
            }}
          >
            <span>go to cart</span> <ChevronDoubleRight size={16} />
          </button>
        </div>
      </div>
    </Div100vh>
  );
};

export default CartDrawer;
