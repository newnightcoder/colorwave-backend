const initialState = {
  shop: [],
  searchModalOpen: false,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SHOP": {
      return {
        ...state,
        shop: action.payload,
      };
    }
    case "TOGGLE_SEARCH_MODAL": {
      const toggle = !state.searchModalOpen;
      return {
        ...state,
        searchModalOpen: toggle,
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
