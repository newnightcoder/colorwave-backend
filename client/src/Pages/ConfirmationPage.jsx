import React, { useEffect } from "react";
import { Check2Circle, HouseFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Footer, Steps } from "../Components";
import { deleteCart, validatePayment } from "../Redux/Actions/cart.action";

const ConfirmationPage = () => {
  const userOrder = useSelector((state) => state?.cart.userOrder);
  const orderId = useSelector((state) => state?.cart.userOrder.orderId);
  const paymentValidated = useSelector((state) => state?.cart.paymentValidated);
  const confirmationSuccess = useSelector((state) => state?.cart.confirmSuccess);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(validatePayment(userOrder));
    dispatch(deleteCart());
  }, []);

  return (
    <>
      <Steps />
      <div className="pt-16 h-screen w-screen relative flex flex-col gap-8 items-center justify-center bg-gray-300 border-red-500 ">
        <span className="text-center">
          Congratulations <span className="capitalize">{userOrder?.userFirstName}</span>! <br /> Your order n&deg;&nbsp;
          {orderId?.toUpperCase()} was successful. <br />
          Thank you for your purchase. <br />
        </span>
        <Check2Circle className="text-9xl text-green-500" />
        <Link
          to={"/"}
          className="w-48 flex items-center justify-center gap-2 text-base uppercase text-black bg-yellow-300 transition duration-300 hover:text-white hover:bg-blue-500 shadow-md hover:shadow-none py-2 mt-4 group"
        >
          <HouseFill size={24} className="text-black transition-color duration-300 group-hover:text-white" />
          <span>go back home</span>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationPage;
