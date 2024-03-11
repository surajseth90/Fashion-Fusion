import { createStore } from "redux";

const initialState = {
  isLoading: false,
  loginedUser: null,
  isOverlay: false,
  isOverflow: true,
  selectedNavAction: "",
  dimension: {},
  snakeBarContent: "",
  productsArray: [],
  productTypes: [],
  cartDrawer: false,
  wishlistDrawer: false,
  userData: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_LOGINED_USER":
      return {
        ...state,
        loginedUser: action.payload,
      };

    case "SET_IS_OVERLAY":
      return {
        ...state,
        isOverlay: action.payload,
      };

    case "SET_IS_OVERFLOW":
      return {
        ...state,
        isOverflow: action.payload,
      };

    case "SET_SELECTED_NAV_ACTION":
      return {
        ...state,
        selectedNavAction: action.payload,
      };

    case "SET_DIMENSION":
      return {
        ...state,
        dimension: action.payload,
      };

    case "SET_SNAKE_BAR_CONTENT":
      return {
        ...state,
        snakeBarContent: action.payload,
      };

    case "SET_PRODUCTS_ARRAY":
      return {
        ...state,
        productsArray: action.payload,
      };

    case "SET_PRODUCT_TYPES":
      return {
        ...state,
        productTypes: action.payload,
      };
    case "SET_CART_DRAWER":
      return {
        ...state,
        cartDrawer: action.payload,
      };
    case "SET_WISHLIST_DRAWER":
      return {
        ...state,
        wishlistDrawer: action.payload,
      };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
