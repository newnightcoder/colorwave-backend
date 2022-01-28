import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardInfo, PaymentBanner } from ".";
import { validatePayment } from "../Redux/Actions/cart.action";
import useWindowSize from "../utils/useWindowSize";

const CheckoutForm = ({ formValidated }) => {
  const elements = useElements();
  const stripe = useStripe();
  const userOrder = useSelector((state) => state?.cart.userOrder);
  const dispatch = useDispatch();
  const { height, width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userOrder);
    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3001/success",
        },
      });
      if (error) return setIsLoading(false);
      setIsLoading(false);
      dispatch(validatePayment());
    } catch (err) {
      throw err;
    }
  };

  return (
    <div
      style={{
        opacity: formValidated ? "1" : "0",
        zIndex: formValidated ? 9999 : -1,
      }}
      className="h-full w-full bg-black text-gray-100 fixed inset-0 flex flex-col items-center justify-start md:gap-2 transition duration-300"
    >
      <div
        style={{
          height: width < 768 ? "calc(100vh - 160px)" : "calc(100vh - 190px)",
        }}
        className="h-full w-full md:w-11/12 md:px-2 relative flex flex-col md:flex-row items-start md:items-center justify-center "
      >
        {/* <div className="hidden md:inline-block w-1/5 px-3 border-2 border-white justify-start">
          <div className="w-max relative">
            <h2 className="font-bold text-xl md:text-2xl">PAYMENT</h2>
            <span className="h-px w-full absolute inset-x-0 mx-auto left-0 bottom-0.5 md:bottom-1 bg-black"></span>
          </div>
        </div> */}
        <div className="w-full h-full md:w-max flex flex-col items-center justify-start md:flex-row md:justify-center md:gap-8 overflow-y-auto scrollbar-cart overflow-x-hidden">
          <CardInfo formValidated={formValidated} />
          <div className="h-full md:h-max flex flex-col items-center justify-center">
            <form
              action="post"
              className="h-max w-max flex flex-col items-center justify-center gap-4"
              onSubmit={handleSubmit}
            >
              <div className="h-max w-full bg-white relative flex flex-col items-center justify-center pt-8 pb-24 md:pb-32 px-12 rounded-sm">
                <PaymentElement />
                <button className="w-9/12 absolute bottom-5 py-2 md:py-3 uppercase md:text-lg text-gray-100 bg-blue-400 rounded-sm mb-2 md:mb-4">
                  <>
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="text-white">processing...</span>
                      </span>
                    ) : (
                      <span>pay now</span>
                    )}
                  </>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PaymentBanner />
    </div>
  );
};

export default CheckoutForm;
