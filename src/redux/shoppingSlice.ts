import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../type";

interface StoreState {
  productData: Products[];
  userInfo: null | string;
  orderData: [];
}

const initialState: StoreState = {
  productData: [],
  userInfo: null,
  orderData: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingProduct = state.productData.find(
        (item: Products) => item.id === id
      );
      if (existingProduct) {
        // Increment quantity by 1 if product already exists in the cart
        existingProduct.quantity += 1;
      } else {
        // Add the new product with a quantity of 1
        state.productData.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: Products) => item.id === action.payload.id
      );
      existingProduct && existingProduct.quantity++;
    },

    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: Products) => item.id === action.payload.id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },

    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },

    resetCart: (state) => {
      state.productData = [];
    },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },

    deleteUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  addUser,
  deleteUser,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
