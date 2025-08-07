import React from "react";
// Component to render a list of items, reused here to show cart items
import ItemList from "./ItemList";
// Redux hooks to access state and dispatch actions
import { useDispatch, useSelector } from "react-redux";
// Action creator to clear the cart items
import { clearCart } from "../utils/cartSlice";

/**
 * Cart Component
 * --------------
 * Displays the current shopping cart items and allows clearing the cart.
 *
 * Uses Redux to:
 * - Select cart items from global state
 * - Dispatch actions to clear the cart
 */
const Cart = () => {
  // Access cart items array from Redux store's 'cart' slice
  const cartItems = useSelector((store) => store.cart.items);

  // Get Redux dispatch function to send actions
  const dispatch = useDispatch();

  /**
   * Handler for "Clear Cart" button click:
   * Dispatches the `clearCart` action to remove all items from the cart in Redux state
   */
  const handelClearCart = () => {
    dispatch(clearCart());
  };

  return (
    // Container centered with padding and spacing
    <div className="m-3 p-5 text-center flex flex-col items-center">
      {/* Button to clear cart */}
      <button
        onClick={handelClearCart}
        className="bg-gray-800 text-white px-3 py-1 cursor-pointer"
      >
        Clear Cart
      </button>

      {/* Heading for the cart section */}
      <h1 className="text-2xl font-semibold">Cart Items</h1>

      {/* Content area with responsive width */}
      <div className="w-[400px] md:w-[600px] lg:w-[800px] ">
        {/* Conditional rendering:
            - If cart is empty, prompt user to add items
            - Otherwise, display the list of cart items */}
        {cartItems.length === 0 ? (
          <div>Add Item to cart</div>
        ) : (
          <ItemList items={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Cart;
