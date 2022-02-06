import { actionTypes } from "../Types/types";

export const addToCart = (product, quantity) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product,
      quantity,
    },
  });
};

export const removeOne = (product, quantity) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_ONE_FROM_CART,
    payload: {
      product,
      quantity,
    },
  });
};

export const deleteItem = (product) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_ITEM,
    payload: {
      product,
    },
  });
};

export const deleteCart = () => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_CART });
};

export const toggleCartDrawer = () => (dispatch) => {
  dispatch({ type: actionTypes.OPEN_CART });
};

export const saveOrder = (order) => (dispatch) => {
  dispatch({ type: actionTypes.SAVE_ORDER, payload: order });
};

export const validatePayment = (order) => async (dispatch) => {
  try {
    const url = "/user-order";
    const request = {
      headers: {
        "Content-type": "Application/json",
      },
      method: "post",
      body: JSON.stringify(order),
    };
    const confirmation = await fetch(url, request).then((res) => res.json());
    dispatch({ type: actionTypes.VALIDATE_PAYMENT, payload: confirmation });
  } catch (error) {
    console.log(error);
  }
};

export const confirmSuccess = () => (dispatch) => {
  dispatch({ type: actionTypes.CONFIRM_SUCCESS });
};
