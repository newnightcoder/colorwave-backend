import React from "react";
import { Facebook, Github, Linkedin, Twitter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../../Styles/_variables.css";

const Footer = () => {
  return (
    <div className="h-max w-screen bg-black text-gray-300 flex flex-col items-center justify-center px-5 md:px-16 py-6 font-cabin border-t-8 border-yellow-300">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-2 pl-1 py-5">
        <div className="w-full flex flex-col pt-12 md:pt-0 md:flex-row items-center justify-center md:items-start space-y-4 md:space-x-16 md:space-y-0">
          <div className="w-full">
            <div className="w-full md:w-max relative">
              <h4 className="text-lg md:text-xl text-blue-500 font-bold pl-0 pr-3 md:pl-3">Shop</h4>
              <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-gray-600"></span>
            </div>
            <ul className="flex flex-row space-x-2 md:space-x-0 md:space-y-2 justify-start items-start md:flex-col pl-2 md:pl-3 pt-1 whitespace-nowrap">
              <li>Products</li>
              <span className="md:hidden">|</span>
              <li>Skins</li>
              <span className="md:hidden">|</span>
              <li>My Cart</li>
              <span className="md:hidden">|</span>
              <li className="truncate">Your brand</li>
            </ul>
          </div>

          <div className="w-full">
            <div className="w-full md:w-max relative">
              <h4 className="text-lg md:text-xl text-blue-500 font-bold pl-0 pr-3 md:pl-3">Support</h4>
              <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-gray-600"></span>
            </div>
            <ul className="flex flex-row justify-start items-start md:flex-col space-x-2 md:space-x-0 md:space-y-2 pl-2 md:pl-3 pt-1 whitespace-nowrap">
              <li>My Account</li>
              <span className="md:hidden">|</span>
              <li>Shipping</li>
              <span className="md:hidden">|</span>
              <li>Legal</li>
              <span className="md:hidden">|</span>
              <li className="truncate">Contact Us</li>
            </ul>
          </div>

          <div className="w-full">
            <div className="w-full md:w-max relative">
              <h4 className="text-lg md:text-xl text-blue-500 font-bold pl-0 pr-3 md:pl-3">Resources</h4>
              <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-gray-600"></span>
            </div>
            <ul className="flex flex-row justify-start items-start md:flex-col space-x-2 md:space-x-0 md:space-y-2 md:pl-0 pl-2 md:pl-3 pt-1 whitespace-nowrap">
              <li>Gallery</li>
              <span className="md:hidden">|</span>
              <li>Press</li>
              <span className="md:hidden">|</span>
              <li>Partners</li>
              <span className="md:hidden">|</span>
              <li className="truncate">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="w-11/12 md:w-max flex flex-col items-center space-y-2">
          <Link
            to="/"
            className="w-max absolute inset-0 top-7 mx-auto md:static transform md:-translate-x-5 -translate-y-2 group"
          >
            <div className="relative">
              <span
                className="block absolute -inset-1 transform transition-all duration-300 -skew-y-6 bg-blue-500 group-hover:skew-y-3 group-hover:bg-yellow-300"
                aria-hidden="true"
              ></span>
              <h1 className="relative text-lg transition-color duration-300 text-white group-hover:text-black px-1 uppercase">
                COLORWAVE
              </h1>
            </div>
          </Link>
          <p className="w-full text-center border-t border-gray-600 md:border-transparent pt-5 md:pt-0">
            <span className="block">Bringing swag to your life</span>
            <span className="block">with creative customizations !</span>
            <span className="md:hidden block">Visit us here :</span>
          </p>
          <ul className="w-max flex items-center justify-center space-x-8 px-4 pt-1 md:pt-0">
            <li>
              <Facebook className="text-2xl" />
            </li>
            <li>
              <Twitter className="text-2xl" />
            </li>
            <li>
              <Github className="text-2xl" />
            </li>
            <li>
              <Linkedin className="text-2xl" />
            </li>
          </ul>
        </div>
      </div>

      <div className="w-11/12 flex items-center justify-center text-center border-t border-gray-600 py-5">
        &copy; ColorWare, Inc. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
