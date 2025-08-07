import React from "react";
// CDN base URL for images
import { CDN_URL } from "../utils/constant";
// Redux hook to dispatch actions
import { useDispatch } from "react-redux";
// Redux action creator to add an item to the cart
import { addItem } from "../utils/cartSlice";

/**
 * ItemList Component
 * -------------------
 * Displays a list of items (e.g., food menu items).
 * Each item shows the name, price, description, image, and an "Add" button.
 * Clicking "Add" dispatches a Redux action to add the item to the shopping cart.
 *
 * Props:
 * - items: Array of item objects to render. Default is empty array ([]).
 */
const ItemList = ({ items = [] }) => {
  // Get dispatch function from Redux store
  const dispatch = useDispatch();

  /**
   * handleAddItem:
   * Dispatches the addItem action with the given item when "Add" button is clicked.
   * This updates the Redux store's cart state.
   */
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    // Container wrapping all items with vertical spacing
    <div className="space-y-6">
      {items.map((item) => (
        // Each item container: key is unique item ID for React list rendering
        <div
          key={item.card.info.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center m-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          {/* Left section: item name, price, and description */}
          <div className="flex flex-col gap-2.5 sm:max-w-[70%] w-full">
            <h1 className="text-lg font-semibold text-gray-900">
              {item.card.info.name}
            </h1>
            <h3 className="text-yellow-700 font-bold text-base">
              {/* Price is divided by 100 because it's stored in paise/lowest currency unit*/}
              ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {item.card.info.description}
            </p>
          </div>

          {/* Right section: item image with overlay "Add" button */}
          <div className="flex-shrink-0 mt-4 sm:mt-0 relative">
            {/* Item image composed from CDN base URL + image ID */}
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover shadow-md"
            />
            {/* Button fixed at bottom right of image, with accessible label */}
            <button
              aria-label={`Add ${item.card.info.name} to cart`}
              className="px-3 bg-gray-100 shadow-lg text-green-500 rounded-lg w-fit absolute bottom-1 right-1 font-semibold hover:bg-green-500 hover:text-gray-100 cursor-pointer"
              style={{ transform: "translate(-15%, 50%)" }}
              // On click, call dispatch function to add the item to cart
              onClick={() => handleAddItem(item)}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
