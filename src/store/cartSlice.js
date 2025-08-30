import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // {id, name, price, image, color, size, quantity}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check by id + color + size
      const existing = state.cartItems.find(
        (i) =>
          i.id === item.id &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) =>
          !(
            i.id === id &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
          )
      );
    },

    increaseQty: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;
      const item = state.cartItems.find(
        (i) =>
          i.id === id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
      );
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;
      const item = state.cartItems.find(
        (i) =>
          i.id === id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) =>
              !(
                i.id === id &&
                i.selectedColor === selectedColor &&
                i.selectedSize === selectedSize
              )
          );
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
