import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { toggleCartDrawer } from "../../Redux/Actions/cart.action";
import { toggleSearchModal } from "../../Redux/Actions/shop.action";
import useWindowSize from "../../utils/useWindowSize";

const Navbar = () => {
  const items = useSelector((state) => state?.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { height, width } = useWindowSize();

  const toggleMenu = () => {
    return setMenuOpen((menuOpen) => !menuOpen);
  };

  const totalItems =
    items.length !== 0 &&
    items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);

  return (
    <>
      <div
        style={{ zIndex: 3000 }}
        className="h-16 md:h-20 w-screen bg-black shadow-lg fixed top-0 font-cabin border-b-8 border-yellow-300 shadow-lg shadow-yellow-300"
      >
        <div className="nav-container h-full w-full mx-auto px-4 2xl:px-8">
          {/* 
                /////////////////////////
                ///      PART 1       ///
                //////////////////////// */}
          <div className="h-full relative flex items-center justify-between md:pl-4">
            {/* HAMBURGER ICON. Heroicon name: outline/menu   Menu open: "hidden", Menu closed: "block" */}
            <div className="flex items-center">
              <button
                type="button"
                className=" md:hidden inline-flex items-center justify-center p-2 text-white hover:text-blue-500 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-9 w-9"
                  style={{ display: menuOpen ? "none" : "block" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* X CLOSE ICON. Heroicon name: outline/x    Menu open: "block", Menu closed: "hidden" */}
                <svg
                  style={{ display: menuOpen ? "block" : "none" }}
                  className="h-9 w-9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <NavLink to="/" className="w-max group absolute inset-x-0 m-auto md:static">
                <div className="relative">
                  <span
                    className="block absolute -inset-1 transform transition-all duration-300 -skew-y-6 bg-yellow-300 group-hover:skew-y-3 group-hover:bg-blue-500"
                    aria-hidden="true"
                  ></span>
                  <h1 className="relative text-lg transition-color duration-300 text-black group-hover:text-white px-1">
                    COLORWAVE
                  </h1>
                </div>
              </NavLink>
            </div>
            {/* <!-- END MOBILE MENU BUTTON--> */}

            {/* 
                /////////////////////////
                ///      PART 2       ///
                //////////////////////// */}
            <div className="w-full flex items-center justify-between px-8 2xl:pl-12 2xl:pr-8">
              {/* <!-- END DESKTOP NAVLINKS CONTAINER --> */}
              <nav className="hidden md:flex items-center justify-center lg:space-x-4">
                <NavLink
                  to="/shop"
                  className="relative text-gray-300 hover:text-white text-base font-medium whitespace-nowrap group px-3 py-2"
                >
                  <span className="absolute inline-block inset-x-0 bottom-2 mx-auto h-0.5 w-full bg-yellow-300 transform scale-x-0 transition-scale origin-center duration-100 group-hover:scale-x-100"></span>
                  <span className="capitalize">Products</span>
                </NavLink>
                <NavLink
                  to="/categories/limited"
                  className="relative text-gray-300 hover:text-white text-base font-medium whitespace-nowrap group px-3 py-2"
                >
                  <span className="absolute inline-block inset-x-0 bottom-2 mx-auto h-0.5 w-full bg-yellow-300 transform scale-x-0 transition-scale origin-center duration-100 group-hover:scale-x-100"></span>

                  <span className="capitalize">limited</span>
                </NavLink>
                <NavLink
                  to="/promotional"
                  className="relative text-gray-300 hover:text-white text-base font-medium whitespace-nowrap group px-3 py-2"
                >
                  <span className="absolute inline-block inset-x-0 bottom-2 mx-auto h-0.5 w-full bg-yellow-300 transform scale-x-0 transition-scale origin-center duration-100 group-hover:scale-x-100"></span>
                  <span>Promotional</span>
                </NavLink>
              </nav>
              {/* <!-- END DESKTOP NAVLINKS CONTAINER --> */}

              {/* 
                  ///////////////////////////////////////////////////
                  ///      SEARCH + CHECKOUT BTNS CONTAINER      ///
                  ////////////////////////////////////////////////// */}

              <div className="w-max h-full absolute md:static right-4 flex items-center justify-center space-x-4 lg:space-x-8">
                {/* search btn*/}
                <button
                  onClick={() => {
                    dispatch(toggleSearchModal());
                  }}
                  className="h-10/12 w-max relative group flex items-center justify-center space-x-2 text-gray-300"
                >
                  <span className="absolute inline-block inset-x-0 bottom-0 mx-auto h-0.5 w-full bg-blue-500 transform scale-x-0 transition-scale origin-left duration-100 group-hover:scale-x-100"></span>
                  <span className="hidden md:inline-block group-hover:text-white">Search</span>
                  <Search size={18} className="text-white transition-color duration-300 group-hover:text-blue-500" />
                </button>
                {/* Checkout btn*/}
                {location.pathname !== "/cart" && (
                  <button
                    onClick={() => dispatch(toggleCartDrawer())}
                    className="w-max h-max relative flex items-center justify-center space-x-1 z-10 text-gray-300 text-base group"
                  >
                    <span className="hidden md:block text-gray-300 group-hover:text-white">Checkout</span>
                    <span className="absolute inline-block inset-x-0 bottom-0 mx-auto h-0.5 w-full bg-blue-500 transform scale-x-0 transition-scale origin-left duration-100 group-hover:scale-x-100"></span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52.4 29.75"
                      alt="Shopping Cart"
                      fill="currentColor"
                      width="2rem"
                      height="1rem"
                      className="transition-color duration-300 group-hover:text-blue-500 z-50"
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
                    <>
                      {totalItems > 0 && (
                        <div className="h-5 w-5 rounded-full flex items-center justify-center absolute -top-3 -right-3 text-sm text-black font-bold transition duration-300 bg-yellow-300 group-hover:bg-white">
                          {totalItems}
                        </div>
                      )}
                    </>
                  </button>
                )}
              </div>
              {/* <!-- SEARCH + CHECKOUT BTNS CONTAINER --> */}
            </div>
            {/* <!-- END PART 2  --> */}
          </div>
          {/* <!-- END PART 1  --> */}
        </div>
        {/* <!-- END NAVBAR CONTAINER  --> */}

        {/* 
            /////////////////////////////////////////////////////////
            ///   MOBILE MENU  - SHOW/HIDE BASED ON MENU STATE   ///
            /////////////////////////////////////////////////////// */}
        <div
          style={{ transform: menuOpen ? "scale(1, 1)" : "scale(0, 1)" }}
          className="w-max pl-2 pr-10 flex flex-col bg-black origin-left transition-scale duration-100"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              onClick={toggleMenu}
              to="/"
              className="text-gray-300 hover:text-blue-500 hover:font-bold block px-3 py-2 rounded-md text-base font-medium capitalize"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              onClick={toggleMenu}
              to="/shop"
              className="text-gray-300 hover:text-blue-500 hover:font-bold block px-3 py-2 rounded-md text-base font-medium capitalize"
              aria-current="page"
            >
              Products
            </Link>

            <Link
              onClick={toggleMenu}
              to="/categories/limited"
              className="text-gray-300 hover:text-blue-500 hover:font-bold block px-3 py-2 rounded-md text-base font-medium capitalize"
            >
              limited
            </Link>

            <Link
              onClick={toggleMenu}
              to="/promotional"
              className="text-gray-300 hover:text-blue-500 hover:font-bold block px-3 py-2 rounded-md text-base font-medium capitalize"
            >
              Promotional
            </Link>
            {location.pathname !== "/cart" && (
              <Link
                onClick={toggleMenu}
                to="/cart"
                className="text-gray-300 hover:text-blue-500 hover:font-bold block px-3 py-2 rounded-md text-base font-medium capitalize"
              >
                Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
