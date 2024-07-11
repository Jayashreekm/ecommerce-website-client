import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsLoading: false,
  productsLoadingFailure: false,
  cartProducts: {},
  totalOrderValue: 0,
  totalCartItems: 0,
}

export const rootStateSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setProductsLoading: (state) => {
      state.productsLoading = true;
    },
    setProductsLoadingFailure: (state) => {
      state.productsLoadingFailure = true;
    },
    setProductsData: (state, action) => {
      state.products = action.payload.products;
    },
    updateCartProducts: (state, action) => {
      // calculating total itesm & total price and updating cart
      const cp = action.payload.cartProducts;
      const temp = Object.values(cp);
      const { totalAmt, totalQty } = temp.reduce((acc, p) => ({
        totalAmt: acc.totalAmt + (p.price * p.qty),
        totalQty: acc.totalQty + p.qty}
      ), { totalAmt: 0, totalQty: 0});

      state.cartProducts = action.payload.cartProducts;
      state.totalOrderValue = totalAmt;
      state.totalCartItems = totalQty;
    },
  },
});

export const {
  setProductsLoading,
  setProductsLoadingFailure,
  setProductsData,
  updateCartProducts,
} = rootStateSlice.actions;

export default rootStateSlice.reducer;
