import React from "react";
import { use100vh } from "react-div-100vh";
import { useSelector } from "react-redux";
import "../Styles/form.css";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

const Form = ({
  inputFirstName,
  inputLastName,
  inputEmail,
  inputPhone,
  inputAddress,
  inputCheckbox,
  handleInput,
  errorAddress,
  errorCheckbox,
  errorEmail,
  errorFirstName,
  errorPhone,
  errorLastName,
  formOpen,
}) => {
  const items = useSelector((state) => state?.cart.items);
  const { height, width } = useWindowSize();
  const responsiveHeight = use100vh();

  return (
    <div
      id="userInfo-form"
      // style={{ height: width < 768 ? responsiveHeight - 190 : "calc(100vh - 6rem)" }}
      className="mt-16 border-4 border-blue-500 form-container h-full w-full z-30 relative flex flex-col items-center justify-start md:justify-center gap-2 md:gap-4 2xl:gap-8 md:justify-start transition duration-300 text-gray-900"
    >
      <div className="h-max w-max relative self-start pt-4 ml-3 md:ml-10">
        <h2 className="w-full text-center md:text-left uppercase text-xl md:text-2xl font-bold px-3">
          Your delivery information
        </h2>
        <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 bg-black"></span>
      </div>
      <div
        style={{ height: width < 768 ? responsiveHeight - 308 : "calc(100vh - 250px)" }}
        className="border-4 border-yellow-500 w-full overflow-hidden max-w-3xl flex flex-col items-center justify-start self-end"
      >
        <div className="border-2 border-black h-max w-11/12 flex flex-col items-center justify-start overflow-y-auto">
          <form
            // style={{ height: width < 768 ? "calc(100vh - 300px)" : "calc(100vh - 128px)" }}
            className="form-solid h-max w-10/12 flex flex-col items-center justify-start gap-2 text-gray-900 md:pb-12"
          >
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="hidden md:block w-max text-left px-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="form-input w-full flex items-left justify-left px-4 py-2"
                  placeholder="Your first name"
                  value={inputFirstName}
                  onChange={handleInput}
                />
                <span className="input-error w-max text-sm text-left text-black font-bold pl-1">{errorFirstName}</span>
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="hidden md:block w- text-left px-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-input w-full flex items-left justify-left px-4 py-2"
                  placeholder="Your last name"
                  value={inputLastName}
                  onChange={handleInput}
                />
                <span className="input-error w-max text-sm text-left text-black font-bold pl-1">{errorLastName}</span>
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <label className="hidden md:block w-full text-left px-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input w-full flex items-left justify-left px-4 py-2"
                placeholder="abc@gmail.com"
                value={inputEmail}
                onChange={handleInput}
              />
              <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorEmail}</span>
            </div>
            <div className="w-full flex flex-col ">
              <label className="hidden md:block w-full text-left px-1" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="form-input w-full px-4 py-2"
                placeholder="Your address"
                value={inputAddress}
                onChange={handleInput}
              />
              <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorAddress}</span>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="flex flex-col w-full md:w-2/3 ">
                <label className="hidden md:block w-full text-left px-1" htmlFor="address">
                  City
                </label>
                <input
                  id="address"
                  type="text"
                  className="form-input w-full px-4 py-2"
                  placeholder="Your city"
                  value={inputAddress}
                  onChange={handleInput}
                />
                {/* ❗️ create errorCity */}
                <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorAddress}</span>
              </div>
              <div className="flex flex-col w-full md:w-1/3 ">
                <label className="hidden md:block w-full text-left px-1" htmlFor="address">
                  Zip Code
                </label>
                <input
                  id="address"
                  type="text"
                  className="form-input w-full px-4 py-2"
                  placeholder="Your Zip Code"
                  value={inputAddress}
                  onChange={handleInput}
                />
                {/* ❗️ create errorZipCode */}
                <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorAddress}</span>
              </div>
            </div>
            <div className="w-full flex flex-col ">
              <label className="hidden md:block w-full text-left px-1" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                className="form-input w-full flex items-left justify-left px-4 py-2"
                placeholder="+33623456789"
                value={inputPhone}
                onChange={handleInput}
              />
              <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorPhone}</span>
            </div>
            <div className="flex flex-col items-start justify-center self-start pt-1">
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  className="rounded-sm ring-0 outline-0 focus:outline-0 checked:outline-0 focus:border-0 checked:ring-0 checked:border-0 focus:ring-0"
                  onChange={handleInput}
                />
                <p>
                  I have read and I accept all <span className="capitalize underline">terms and services</span>
                </p>
              </div>
              <span className="input-error w-full text-sm text-left text-black font-bold pl-1">{errorCheckbox}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
