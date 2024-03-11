export const setIsLoading = (data) => {
  return { type: "SET_IS_LOADING", payload: data };
};

export const setIsOverlay = (data) => {
  return { type: "SET_IS_OVERLAY", payload: data };
};

export const setIsOverflow = (data) => {
  return { type: "SET_IS_OVERFLOW", payload: data };
};

export const setSelectedNavAction = (data) => {
  return { type: "SET_SELECTED_NAV_ACTION", payload: data };
};

export const setDimension = (data) => {
  return { type: "SET_DIMENSION", payload: data };
};

export const setSnakeBarContent = (data) => {
  return { type: "SET_SNAKE_BAR_CONTENT", payload: data };
};

export const setProductsArray = (data) => {
  return { type: "SET_PRODUCTS_ARRAY", payload: data };
};

export const setProductTypes = (data) => {
  return { type: "SET_PRODUCT_TYPES", payload: data };
};

export const setCartDrawer = (data) => {
  return { type: "SET_CART_DRAWER", payload: data };
};

export const setWishlistDrawer = (data) => {
  return { type: "SET_WISHLIST_DRAWER", payload: data };
};

export const setLoginedUser = (data) => {
  return { type: "SET_LOGINED_USER", payload: data };
};

export const setUserData = (data) => {
  return { type: "SET_USER_DATA", payload: data };
};
