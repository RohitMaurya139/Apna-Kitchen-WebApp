// Import createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

/**
 * cartSlice
 * ---------
 * Defines a Redux slice for managing the shopping cart state.
 * Contains initial state, reducers, and generates action creators automatically.
 */
const cartSlice = createSlice({
  // Name of this slice of state
  name: "cart",

  // Initial state: cart starts with empty items array
  initialState: {
    items: [],
  },

  // Reducers are the functions that specify how the state changes in response to actions
  reducers: {
    /**
     * addItem
     * --------
     * Adds a new item to the cart's items array.
     * `action.payload` contains the item to add.
     * Uses immer under the hood, so direct mutation is safe here.
     */
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    /**
     * removeItem
     * ----------
     * Removes the last item from the cart's items array.
     * This implementation always removes the item at the end.
     */
    removeItem: (state) => {
      state.items.pop();
    },

    /**
     * clearCart
     * ----------
     * Clears all items from the cart.
     * By setting the array length to 0, it empties the array.
     */
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

// Export the auto-generated action creators for use in dispatching actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer function for use in store configuration
export default cartSlice.reducer;
