import { combineReducers } from "redux";
import cartReducer from "./cart.reducer";
import shopReducer from "./shop.reducer";

const rootReducer = combineReducers({
  shop: shopReducer,
  cart: cartReducer,
});
export default rootReducer;
