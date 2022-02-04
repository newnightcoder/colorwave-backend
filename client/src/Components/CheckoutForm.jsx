import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { use100vh } from "react-div-100vh";
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
  const responsiveHeight = use100vh();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userOrder);
    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: "https://colorwave-shop.herokuapp.com/success",
          return_url: "http://localhost:4242/success",
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
        height: width < 768 ? responsiveHeight - 64 : "calc(100vh - 192px)",
      }}
      className="w-full md:w-11/12 md:px-2 flex flex-col md:flex-row items-start md:items-center justify-center"
    >
      <div className="relative w-full h-full md:w-3/5 flex flex-col items-center justify-start md:flex-row md:justify-end md:gap-8 md:overflow-y-auto md:scrollbar-cart overflow-x-hidden">
        <div
          style={{ height: width < 768 ? responsiveHeight - 64 : "83.33%" }}
          className="w-full md:max-w-xl relative flex flex-col items-center justify-start md:justify-center bg-white"
        >
          {formValidated && width < 768 && <PaymentBanner />}

          <CardInfo formValidated={formValidated} />
          <div
            style={{ height: width < 768 ? responsiveHeight - 306 : "100%" }}
            className="w-full overflow-hidden flex flex-col items-center justify-center"
          >
            <form
              action="post"
              className="h-max w-11/12 md:w-full flex flex-col items-center justify-start gap-4 overflow-x-hidden overflow-y-auto scrollbar-cart md:scrollbar-description mt-2 md:mt-0"
              onSubmit={handleSubmit}
            >
              <div className="h-min md:h-full w-full bg-white relative flex flex-col items-center justify-start gap-8 pt-2 md:pt-4 md:px-12">
                <PaymentElement className="w-full md:pt-2" />
                <button className="w-full md:w-10/12 py-2 md:py-3 uppercase md:text-lg text-gray-100 bg-blue-400 rounded-sm mb-2">
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
      <div className="hidden md:block md:w-2/5"> </div>
    </div>
  );
};

export default CheckoutForm;
