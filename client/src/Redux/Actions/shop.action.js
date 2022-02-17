import listing from "../../API";
import { actionTypes } from "../Types/types";

export const getShopData = () => async (dispatch) => {
  const data = await listing();
  if (data !== undefined) {
    return dispatch({
      type: actionTypes.GET_SHOP,
      payload: data,
    });
  }
};

export const toggleSearchModal = () => (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_SEARCH_MODAL });
};
