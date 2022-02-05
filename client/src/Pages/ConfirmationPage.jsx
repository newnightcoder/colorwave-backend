import React, { useEffect } from "react";
import { Check2Circle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Steps } from "../Components";
import { deleteCart, validatePayment } from "../Redux/Actions/cart.action";

const ConfirmationPage = () => {
  const userOrder = useSelector((state) => state?.cart.userOrder);
  const orderId = useSelector((state) => state?.cart.userOrder.orderId);
  const dispatch = useDispatch();

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
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationPage;
