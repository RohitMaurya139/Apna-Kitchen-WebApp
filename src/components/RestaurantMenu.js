import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurantInfo = useRestaurantMenu(resId);

  if (restaurantInfo === null) {
    return <Shimmer />;
  }

  // Destructure with fallback
  const {
    name = "Restaurant Name",
    avgRating = "N/A",
    cuisines = [],
    costForTwoMessage = "",
    totalRatingsString = "",
    sla = { slaString: "N/A" },
    areaName = "",
  } = restaurantInfo?.cards?.[2]?.card?.card?.info || {};

  // Defensive assignment for menu items
  const itemCard =
    restaurantInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
      ?.card?.card?.itemCards || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gray-50">
      <div className="max-w-2xl w-full">
        {/* Restaurant Name */}
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{name}</h1>

        {/* Restaurant Info Card */}
        <div className="rounded-lg bg-white shadow p-4 mb-8 flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-900">
              <span>⭐</span> {avgRating}
              <span className="text-gray-500 text-base font-normal">
                ({totalRatingsString})
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="font-medium text-green-700">
                {costForTwoMessage}
              </span>
            </h3>
            <div className="text-sm text-gray-600 mt-1">
              {cuisines.join(", ")}
            </div>
            <div className="text-xs text-gray-400 mt-1">Outlet: {areaName}</div>
            <div className="text-xs text-gray-500 mt-1">
              {sla.slaString} Deliver to home
            </div>
          </div>
        </div>

        {/* Menu section header */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-700 border-b border-yellow-300 pb-1">
            Menu
          </h3>
        </div>

        {/* Recommended Items */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <h2 className="font-semibold text-lg text-yellow-700 mb-4">
            Recommended Items
          </h2>
          {itemCard.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {itemCard.map((item) => (
                <div
                  className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow flex flex-col"
                  key={item.card.info.id}
                >
                  <h3 className="font-semibold text-gray-800 text-base mb-2">
                    {item.card.info.name}
                  </h3>
                  <h4 className="text-yellow-700 font-bold text-sm">
                    ₹
                    {item.card.info.price / 100 ||
                      item.card.info.defaultPrice / 100}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-6">
              <h4>No menu item available</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
