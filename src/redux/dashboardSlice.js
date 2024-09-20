import { createSlice } from "@reduxjs/toolkit";
import {
  CATEGORIES,
  FEATURED,
  SIMILAR,
  RECENTLYVIEWED,
  CART,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  isSocketConnected: false,
  featuredProducts: null,
  categories: null,
  similarProducts: null,
  recentlyViewedProducts: null,
  productDetails: null,
  productCategories: null,
  cart: [],
  cartCount: 0,
};

const deleteCartItem = (state, productId) => {
  state.cart = state.cart.filter((item) => item.prodId !== productId);
};

const handleDashboardDataUpdate = (state, item) => {
  switch (item.type) {
    case FEATURED:
      state.featuredProducts = item[FEATURED]?.length ? item[FEATURED] : null;
      break;
    case CATEGORIES:
      state.categories = item[CATEGORIES]?.length ? item[CATEGORIES] : null;
      break;
    case RECENTLYVIEWED:
      state.recentlyViewedProducts = item[RECENTLYVIEWED]?.length
        ? item[RECENTLYVIEWED]
        : null;
      break;
    case SIMILAR:
      state.similarProducts = item[SIMILAR]?.length ? item[SIMILAR] : null;
      break;
    case CART:
      state.cart = item[CART]?.length ? item[CART] : [];
      break;
    default:
      state.featuredProducts = null;
      state.categories = null;
      state.recentlyViewedProducts = null;
      state.similarProducts = null;
      state.cart = [];
      break;
  }
};

export const dashboardSlice = createSlice({
  name: "dasboard",
  initialState,
  reducers: {
    fetchDashboardData: (state, action) => {
      action?.payload?.length &&
        action.payload.forEach((item) => {
          handleDashboardDataUpdate(state, item);
        });
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    addToCart: (state, action) => {
      const prodIndex = state?.cart?.findIndex(
        (item) => item.prodId === action.payload.productId
      );
      if (prodIndex >= 0) {
        state.cart[prodIndex].cartQty += 1;
      } else {
        const newCartItem = { ...action.payload, cartQty: 1 };
        state.cart = [...state.cart, newCartItem];
      }
    },
    setCartData: (state, action) => {
      state.cart = action.payload;
    },
    handleProdQuantityUpdate: (state, action) => {
      const { prodId, shouldIncrease } = action.payload;
      state.cart = state.cart.map((item) => {
        if (item?.prodId === prodId) {
          if (item.cartQty < 1) {
            return item;
          } else {
            return {
              ...item,
              cartQty: shouldIncrease ? item.cartQty + 1 : item.cartQty - 1,
            };
          }
        }
        return item;
      });
    },
    handleDeleteCartItem: (state, action) => {
      deleteCartItem(state, action.payload);
    },
    handleCartCountChange: (state, action) => {
      state.cartCount = state?.cart?.length
    },
    handleIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    handleIsSocketConnected: (state, action) => {
      state.isSocketConnected = action.payload
      // console.log("action",action)
    }
  },
});

export const {
  fetchDashboardData,
  setProductDetails,
  setCategories,
  addToCart,
  handleProdQuantityUpdate,
  handleDeleteCartItem,
  handleCartCountChange,
  handleIsLoggedIn,
  handleIsSocketConnected,
  setCartData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
