// const BASE_URL_ONE = "http://192.168.99.141:8080/user"; //AYUSH
// const BASE_URL_TWO = "http://192.168.99.141:8088/user"; //AYUSH

// api urls -

// const BASE_URL_ONE = "http://192.168.99.143:8080"
// const BASE_URL_TWO = "http://192.168.99.143:8080"
const BASE_URL_ONE = "http://localhost:8080";
const BASE_URL_TWO = "http://localhost:8084";

// export const SOCKET_BASE_URL = "ws://192.168.99.141:8888";
// export const SOCKET_BASE_URL = "ws://localhost:8888";

export const URLS = {
  SIGN_UP: `${BASE_URL_ONE}/users/`,
  VERIFY_OTP: `${BASE_URL_ONE}/users/validateRegisterOtp`,
  ADD_PASSWORD: `${BASE_URL_ONE}/users/createPassword`,
  LOGIN: `${BASE_URL_ONE}/users/login`,
  LOGOUT: `${BASE_URL_ONE}/users/logout`,
  FORGOT_PASSWORD: `${BASE_URL_ONE}/users/forgotPassword`,
  OTP_FORGOT_PASS: `${BASE_URL_ONE}/users/validateOtp`,
  CHANGE_PASSOWRD: `${BASE_URL_ONE}/users/changePassword`,
  RESEND_OTP: `${BASE_URL_ONE}/user/resendotp`,
  DASHBOARD: `${BASE_URL_TWO}/user/dashboard`,
  PRODUCT_DETAILS: `${BASE_URL_TWO}/product/details`,
  PRODUCT_FILTER: `${BASE_URL_TWO}/product/filter`,
  CART: `${BASE_URL_TWO}/user/cart/view`,
  CART_INCREASE: `${BASE_URL_TWO}/user/add`,
  CART_DECREASE: `${BASE_URL_TWO}/user/decrease`,
  CART_REMOVE: `${BASE_URL_TWO}/user/cart/delete`
};

// common value contants
export const WEBSOCKET_PROTOCOL = "OSC-WebSocket-Protocol";
export const DEVICE_TYPE = "Web";

// Product Types
export const FEATURED = "Featured Products";
export const CATEGORIES = "Categories";
export const SIMILAR = "Similar Products";
export const RECENTLYVIEWED = "Recently Viewed Products";
export const CART = "Cart"