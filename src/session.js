import Cookies from 'js-cookie';

const TOKEN_KEY = 'FASHION_FUSION';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  // Check if the token exists and is valid (e.g., not expired)
  const token = getToken();
  return !!token; // Returns true if a valid token exists; otherwise, false
};