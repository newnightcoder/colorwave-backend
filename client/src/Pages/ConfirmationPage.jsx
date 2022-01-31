import React, { useEffect, useState } from "react";
import { Check2Circle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../Components";
import { deleteCart } from "../Redux/Actions/cart.action";

const ConfirmationPage = () => {
  const userOrder = useSelector((state) => state?.cart.userOrder);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);

  const getConfirmation = async () => {
    const url = "/user-order";
    const request = {
      headers: {
        "Content-type": "Application/json",
      },
      method: "post",
      body: JSON.stringify(userOrder),
    };
    const confirmation = await fetch(url, request).then((res) => res.json());
    setOrderId(confirmation.orderId);
  };

  useEffect(() => {
    getConfirmation();
    dispatch(deleteCart());
  }, [userOrder]);

  return (
    <>
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
