import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { CartContainer, CartRecap, CheckoutForm, Form, Navbar, PaymentBanner, Steps } from "../Components";
import { addToCart, confirmSuccess, deleteCart, deleteItem, removeOne, saveOrder } from "../Redux/Actions/cart.action";
import "../Styles/_variables.css";
import useWindowSize from "../utils/useWindowSize";

let stripePromise;

(async () => {
  const { key } = await fetch("/stripe").then((res) => res.json());
  if (key !== undefined) {
    return (stripePromise = await loadStripe(key, { locale: "en" }));
  }
})();

const CartPage = () => {
  const dispatch = useDispatch();
  const { height, width } = useWindowSize();
  const items = useSelector((state) => state?.cart.items);
  const form = document.querySelector("#userInfo-form");
  const [formOpen, setFormOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const confirmationSuccess = useSelector((state) => state?.cart.confirmationSuccess);

  // FORM VALIDATION variables
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputZip, setInputZip] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputCheckbox, setInputCheckbox] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorZip, setErrorZip] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorCheckbox, setErrorCheckbox] = useState("");
  const [formChecked, setFormChecked] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const zipRegex = /^[0-9]{5}$/;
  const phoneRegex = /^[0-9]{10}$/;
  let errorFirstNameRef = "";
  let errorLastNameRef = "";
  let errorEmailRef = "";
  let errorEmailRegexRef = "";
  let errorPhoneRef = "";
  let errorPhoneRegexRef = "";
  let errorAddressRef = "";
  let errorCityRef = "";
  let errorZipRef = "";
  let errorCheckboxRef = "";

  const totalPrice =
    items.length !== 0 &&
    items.reduce((acc, curr) => {
      return acc + curr.product.price.raw * curr.quantity;
    }, 0);

  const fetchPaymentIntentSecret = async () => {
    const request = {
      method: "post",
    };
    const paymentIntentUrl = "/payment-intent-secret";
    const response = await fetch(paymentIntentUrl, request);
    const data = await response.json();
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    fetchPaymentIntentSecret();
    if (confirmationSuccess) dispatch(confirmSuccess());
  }, []);

  const createOrder = () => {
    let order = {
      userFirstName: inputFirstName,
      userLastName: inputLastName,
      userEmail: inputEmail,
      items,
      totalPrice,
    };
    dispatch(saveOrder(order));
  };

  useEffect(() => {
    if (formValidated) {
      createOrder();
    }
  }, [formValidated]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  const handleAddToCart = (id) => {
    items.forEach((item) => {
      if (item.product.id === id) {
        dispatch(addToCart(item.product, item.quantity));
      }
    });
  };

  const handleRemoveOne = (id) => {
    items.forEach((item) => {
      if (item.product.id === id) {
        dispatch(removeOne(item.product, item.quantity));
      }
    });
  };

  const handleDeleteItem = (id) => {
    items.forEach((item) => {
      if (item.product.id === id) {
        dispatch(deleteItem(item.product));
      }
    });
  };
  const handleDeleteCart = () => {
    dispatch(deleteCart());
  };
  const toggleForm = () => {
    setFormOpen((formOpen) => !formOpen);
  };

  const handleInput = (e) => {
    if (e.target === form.querySelector("#firstName")) return setInputFirstName(e.currentTarget.value);
    if (e.target === form.querySelector("#lastName")) return setInputLastName(e.currentTarget.value);
    if (e.target === form.querySelector("#email")) return setInputEmail(e.currentTarget.value);
    if (e.target === form.querySelector("#address")) return setInputAddress(e.currentTarget.value);
    if (e.target === form.querySelector("#city")) return setInputCity(e.currentTarget.value);
    if (e.target === form.querySelector("#zip")) return setInputZip(e.currentTarget.value);
    if (e.target === form.querySelector("#phone")) return setInputPhone(e.currentTarget.value);
    if (e.target === form.querySelector("#checkbox")) return setInputCheckbox(e.currentTarget.checked);
  };

  const checkFormErrors = () => {
    const errorMsg = {
      firstName: "Please enter your first name",
      lastName: "Please enter your last name",
      email: "Please enter your email",
      emailRegex: "Please enter a valid email",
      address: "Please enter your address",
      city: "Please enter your city",
      zip: "Please enter your zip code",
      phoneNumber: "Please enter your phone number",
      phoneNumberRegex: "Please enter a valid phone number",
      checkbox: "You need to accept our Terms and Services to confirm your order.",
    };

    if (inputFirstName.length === 0) {
      setErrorFirstName(errorMsg.firstName);
      errorFirstNameRef = errorMsg.firstName;
    } else {
      setErrorFirstName("");
      errorFirstNameRef = "";
    }
    if (inputLastName.length === 0) {
      setErrorLastName(errorMsg.lastName);
      errorLastNameRef = errorMsg.lastName;
    } else {
      setErrorLastName("");
      errorLastNameRef = "";
    }
    if (inputEmail.length === 0) {
      setErrorEmail(errorMsg.email);
      errorEmailRef = errorMsg.email;
    } else {
      setErrorEmail("");
      errorEmailRef = "";
    }
    if (!inputEmail.match(emailRegex)) {
      setErrorEmail(errorMsg.emailRegex);
      errorEmailRegexRef = errorMsg.emailRegex;
    } else {
      setErrorEmail("");
      errorEmailRegexRef = "";
    }
    if (inputAddress.length === 0) {
      setErrorAddress(errorMsg.address);
      errorAddressRef = errorMsg.address;
    } else {
      setErrorAddress("");
      errorAddressRef = "";
    }
    if (inputCity.length === 0) {
      setErrorCity(errorMsg.city);
      errorCityRef = errorMsg.city;
    } else {
      setErrorCity("");
      errorCityRef = "";
    }
    if (inputZip.length === 0) {
      setErrorZip(errorMsg.zip);
      errorZipRef = errorMsg.zip;
    } else {
      setErrorZip("");
      errorZipRef = "";
    }
    if (inputPhone.length === 0) {
      setErrorPhone(errorMsg.phoneNumber);
      errorPhoneRef = errorMsg.phoneNumber;
    } else {
      setErrorPhone("");
      errorPhoneRef = "";
    }
    if (!inputPhone.match(phoneRegex)) {
      setErrorPhone(errorMsg.phoneNumberRegex);
      errorPhoneRegexRef = errorMsg.phoneNumberRegex;
    } else {
      setErrorPhone("");
      errorPhoneRegexRef = "";
    }
    if (inputCheckbox === false) {
      setErrorCheckbox(errorMsg.checkbox);
      errorCheckboxRef = errorMsg.checkbox;
    } else {
      setInputCheckbox(true);
      errorCheckboxRef = "";
    }
    return setFormChecked(true);
  };

  const validateForm = () => {
    if (
      errorFirstNameRef.length === 0 &&
      errorLastNameRef.length === 0 &&
      errorAddressRef.length === 0 &&
      errorCityRef.length === 0 &&
      errorZipRef.length === 0 &&
      errorEmailRef.length === 0 &&
      errorPhoneRef.length === 0 &&
      errorPhoneRegexRef.length === 0 &&
      errorCheckboxRef.length === 0
    )
      setFormValidated(true);
  };

  const handleForm = (e) => {
    e.preventDefault();
    checkFormErrors();
    validateForm();
  };

  const transition = () => {
    if (formValidated && width < 768) {
      return { transform: "translateY(-200%)" };
    } else if (formValidated && width > 768) {
      return { transform: "translateY(-200%)" };
    } else if (formOpen && width < 768) {
      return { transform: `translateY(-100%)` };
    } else if (formOpen && width > 768) {
      return { transform: `translateY(-100%)` };
    }
  };

  return !clientSecret ? (
    <Div100vh className="bg-black flex items-center justify-center ">
      <span className="text-white text-lg uppercase">loading cart...</span>
    </Div100vh>
  ) : (
    <Elements stripe={stripePromise} options={options}>
      {width < 768 ? <Navbar /> : <Steps formOpen={formOpen} formValidated={formValidated} />}
      <Div100vh className="overflow-y-hidden bg-sound">
        <Div100vh
          style={transition()}
          className="page transition-transform duration-700 pt-16 md:pt-24 relative w-screen font-cabin flex flex-col items-center justify-center bg-sound overflow-y-hidden"
        >
          <div
            style={{ contain: "content" }}
            className="page-container h-full w-full relative flex flex-col items-start justify-start bg-sound"
          >
            <div className="h-full w-full flex flex-col md:flex-row">
              <div className="h-max w-full md:w-3/5">
                <CartContainer
                  handleRemoveOne={handleRemoveOne}
                  handleAddToCart={handleAddToCart}
                  handleDeleteItem={handleDeleteItem}
                  handleDeleteCart={handleDeleteCart}
                  formOpen={formOpen}
                />
              </div>
              <div className="h-max w-full md:h-full md:w-2/5 fixed bottom-0 md:relative flex items-center justify-center"></div>
            </div>
          </div>
        </Div100vh>

        <Div100vh
          className="w-full overflow-y-auto md:flex md:items-center md:justify-center transition-transform duration-700 bg-sound pt-16 md:pt-24"
          style={transition()}
        >
          <Form
            formOpen={formOpen}
            inputFirstName={inputFirstName}
            inputLastName={inputLastName}
            inputEmail={inputEmail}
            inputPhone={inputPhone}
            inputAddress={inputAddress}
            inputZip={inputZip}
            inputCity={inputCity}
            inputCheckbox={inputCheckbox}
            totalPrice={totalPrice}
            errorAddress={errorAddress}
            errorCity={errorCity}
            errorZip={errorZip}
            errorCheckbox={errorCheckbox}
            errorEmail={errorEmail}
            errorFirstName={errorFirstName}
            errorLastName={errorLastName}
            errorPhone={errorPhone}
            handleInput={handleInput}
          />
          <div className="hidden md:flex h-full w-2/5"></div>
        </Div100vh>

        <Div100vh
          style={transition()}
          className="relative transition-transform duration-700 bg-sound flex items-start justify-center pt-16 md:pt-24"
        >
          <CheckoutForm formValidated={formValidated} clientSecret={clientSecret} />
          {formValidated && width > 768 && <PaymentBanner />}
        </Div100vh>
      </Div100vh>
      <div
        style={{
          height:
            width > 768 && !formValidated
              ? "calc(100vh - 96px)"
              : width > 768 && formValidated && "calc(100vh - 192px)",
          top: formValidated && width > 768 && 0,
        }}
        className="h-max w-full md:w-2/5 fixed bottom-0 md:my-auto md:right-0 flex items-center justify-center"
      >
        {items.length !== 0 && (
          <CartRecap
            totalPrice={totalPrice}
            handleDeleteItem={handleDeleteItem}
            handleDeleteCart={handleDeleteCart}
            handleForm={handleForm}
            toggleForm={toggleForm}
            formOpen={formOpen}
            formValidated={formValidated}
          />
        )}
      </div>
    </Elements>
  );
};

export default withRouter(CartPage);
