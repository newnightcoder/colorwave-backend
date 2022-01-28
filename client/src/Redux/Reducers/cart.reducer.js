import { actionTypes } from "../Types/types";

const initialState = {
  items: [],
  cartDrawerOpen: false,
  stripeClientSecret: "",
  userOrder: {},
  paymentValidated: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      let item = action.payload;
      // 1. check if the item is already in the cart and add it to itself
      const isInCart = state.items.find((x) => x.product.id === item.product.id);
      console.log(isInCart);
      if (isInCart) {
        let cartCopy = [...state.items];
        let updatedCart = cartCopy.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
        return { ...state, items: updatedCart };
        // 2. if not, add to cart
      } else {
        const updatedCart = [...state.items, item];
        return {
          ...state,
          items: updatedCart,
        };
      }
    }

    case actionTypes.REMOVE_ONE_FROM_CART: {
      let item = action.payload;
      // 1. find the item in the state (cart)
      const targetItem = state.items.find((x) => x.product.id === item.product.id);
      const cartCopy = [...state.items];
      const updatedCart = cartCopy.map((x) =>
        x.product.id === targetItem.product.id
          ? {
              ...x,
              quantity: x.quantity > 0 && x.quantity - 1,
            }
          : x
      );
      return {
        ...state,
        items: updatedCart,
      };
    }

    case actionTypes.DELETE_ITEM: {
      let item = action.payload;
      const cartCopy = [...state.items];
      const updatedCart = cartCopy.filter((x) => x.product.id !== item.product.id);
      return {
        ...state,
        items: updatedCart,
      };
    }

    case actionTypes.DELETE_CART: {
      return {
        ...state,
        items: [],
        paymentValidated: !state.paymentValidated,
      };
    }

    case actionTypes.OPEN_CART: {
      const toggled = !state.cartDrawerOpen;
      return {
        ...state,
        cartDrawerOpen: toggled,
      };
    }

    case actionTypes.SAVE_ORDER: {
      return {
        ...state,
        userOrder: action.payload,
      };
    }
    case actionTypes.VALIDATE_PAYMENT: {
      return {
        ...state,
        paymentValidated: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
