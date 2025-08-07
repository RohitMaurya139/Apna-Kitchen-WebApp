import React, { useState } from "react";
// FontAwesome icons for chevron arrow
import "@fortawesome/fontawesome-free/css/all.min.css";
// ItemList component to show list of food/menu items
import ItemList from "./ItemList";

/**
 * RestaurantCategory Component
 * ----------------------------
 * Displays a category of restaurant menu items with:
 * - A clickable header showing category title and count
 * - A toggleable list of items for that category
 * - A chevron icon that rotates on toggle indicating expanded/collapsed state
 *
 * Props:
 * - data: Object containing category info and itemCards array
 * - showItem: Boolean indicating if items should be visible (expanded)
 * - setShowIndex: Function to update the parent component's expanded category index
 */
const RestaurantCategory = ({ data, showItem, setShowIndex }) => {
  // Local state controlling rotation of chevron icon (true means rotated 180 degrees)
  const [isRotate, setIsRotate] = useState(false);

  /**
   * handelClick:
   * - Toggles the icon rotation state
   * - Calls setShowIndex (assumed to toggle which category is expanded in parent)
   */
  function handelClick() {
    setIsRotate(!isRotate);
    setShowIndex();
  }

  return (
    <div
      className="mb-6 relative bg-gray-100 rounded-md border border-gray-300 shadow-2xl p-3 sm:p-4 
                 cursor-pointer select-none w-[400px] sm:w-[600px] md:w-[800px]"
    >
      <header className="flex flex-col gap-2">
        {/* Category title with item count; clicking toggles expanded state */}
        <div
          className="text-base sm:text-lg font-semibold text-gray-800"
          onClick={handelClick}
        >
          {data.title} ({data.itemCards?.length || 0})
        </div>

        {/* Conditionally render list of items belonging to this category */}
        <div>{showItem && <ItemList items={data.itemCards || []} />}</div>
      </header>

      {/* Chevron icon positioned absolutely; rotates on toggle */}
      <div
        className={`absolute top-2 right-2 cursor-pointer sm:top-3 sm:right-3 text-base sm:text-lg 
                    text-gray-600 transition-transform duration-300 ${
                      isRotate ? "rotate-180" : ""
                    }`}
        onClick={handelClick}
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default RestaurantCategory;
