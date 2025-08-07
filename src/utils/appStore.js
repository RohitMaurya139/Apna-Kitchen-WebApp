// Import configureStore from Redux Toolkit to set up the Redux store more easily
import { configureStore } from "@reduxjs/toolkit";

// Import the cart slice reducer which manages the cart state
import cartReducer from "./cartSlice";

/**
 * appStore
 * --------
 * Configures and creates the Redux store for the application.
 *
 * The store holds the global state and manages updates using reducers.
 *
 * Here, the store is configured with a single reducer called "cart":
 * - cartReducer: responsible for handling cart-related state changes (adding/removing items, etc.)
 *
 * Using configureStore provides good defaults including Redux DevTools enabled,
 * thunk middleware for async, and simplifies setup compared to plain Redux.
 */
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export the configured Redux store so it can be provided to React app
export default appStore;
