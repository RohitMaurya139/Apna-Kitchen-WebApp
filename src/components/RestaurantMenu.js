import React from "react";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurantInfo = useRestaurantMenu(resId);

  if (restaurantInfo === null) {
    return <Shimmer />;
  }

  // Destructure restaurant info with fallback defaults
  const {
    name = "Restaurant Name",
    avgRating = "N/A",
    cuisines = [],
    costForTwoMessage = "",
    totalRatingsString = "",
    sla = { slaString: "N/A" },
    areaName = "",
  } = restaurantInfo?.cards?.[2]?.card?.card?.info || {};

  // Extract categories for menu items
  const categories =
    restaurantInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  // Extract recommended items (example uses cards index 2, adjust if needed)
  const itemCard =
    restaurantInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
      ?.card?.card?.itemCards || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50">
      <div className="max-w-2xl w-full">
        {/* Restaurant Name */}
        <h1 className="text-[38px] font-bold mb-2 text-red-600">{name}</h1>

        {/* Restaurant Info Card */}
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

      {/* Render categories */}
      {categories.map((category,index) => (
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card?.title}
          showItem={index===0 && true}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
