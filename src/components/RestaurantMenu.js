import React, { useState } from "react";
import Shimmer from "./Shimmer"; // Loading placeholder while data loads
import useRestaurantMenu from "../utils/useRestaurantMenu"; // Custom hook to fetch restaurant menu data by ID
import { useParams } from "react-router-dom"; // Hook to get URL parameters (resId)
import { CDN_URL } from "../utils/constant"; // Base URL for image CDN (not used here directly)
import RestaurantCategory from "./RestaurantCategory"; // Component to display each menu category

/**
 * RestaurantMenu Component
 * ------------------------
 * Shows detailed restaurant info and menu categorized by sections.
 * Fetches restaurant menu info based on URL param `resId`.
 * Renders restaurant header information and menu categories.
 */
const RestaurantMenu = () => {
  // Extract restaurant ID from route params (e.g., "/restaurant/:resId")
  const { resId } = useParams();

  // Custom hook to fetch detailed restaurant info/menu using the restaurant ID
  const restaurantInfo = useRestaurantMenu(resId);

  // State controlling which menu category is currently expanded (first open by default)
  const [showIndex, setShowIndex] = useState(0);

  // Show shimmer loader while restaurant info is still null/loading
  if (restaurantInfo === null) {
    return <Shimmer />;
  }

  // Destructure key restaurant info with fallback defaults if data missing
  const {
    name = "Restaurant Name",
    avgRating = "N/A",
    cuisines = [],
    costForTwoMessage = "",
    totalRatingsString = "",
    sla = { slaString: "N/A" },
    areaName = "",
  } = restaurantInfo?.cards?.[2]?.card?.card?.info || {};

  // Extract menu categories from nested restaurant data structure
  // Filtering to only keep cards of type 'ItemCategory'
  const categories =
    restaurantInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  // Extract recommended items example (optional, not used in returned JSX here)
  const itemCard =
    restaurantInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
      ?.card?.card?.itemCards || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50">
      <div className="max-w-2xl w-full">
        {/* Restaurant Name */}
        <h1 className="text-[38px] font-bold mb-2 text-red-600">{name}</h1>

        {/* Restaurant Info Card showing rating, cuisines, cost, outlet, delivery time */}
        <div className="rounded-lg bg-white shadow p-4 mb-8 flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 text-[25px] font-semibold text-yellow-900">
              <span>⭐</span> {avgRating}
              <span className="text-gray-500 text-base font-normal">
                ({totalRatingsString})
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="font-medium text-green-700">
                {costForTwoMessage}
              </span>
            </h3>
            <div className="text-[22px] text-gray-600 mt-1">
              {cuisines.join(", ")}
            </div>
            <div className="text-[15px] text-gray-400 mt-1">
              Outlet: {areaName}
            </div>
            <div className="text-[15px] text-gray-500 mt-1">
              {sla.slaString} Deliver to home
            </div>
          </div>
        </div>
      </div>

      {/* Menu section header */}
      <div className="mb-4">
        <h3 className="font-bold text-xl text-gray-700 border-b border-yellow-300 pb-1">
          Menu
        </h3>
      </div>

      {/* Render a list of RestaurantCategory components for each category */}
      {/* Pass showItem true only for currently active expanded category (controlled by showIndex) */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItem={index === showIndex} // Show items if this index matches showIndex
          setShowIndex={() => setShowIndex(index)} // Callback to set expanded category on click
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
