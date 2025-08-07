// CDN base URL for images
import { CDN_URL } from "../utils/constant";

/**
 * RestaurantCard Component
 * ------------------------
 * Renders a card displaying restaurant details like:
 * - Image
 * - Name
 * - Cuisines
 * - Average rating (with colored background based on rating)
 * - Area name
 * - Cost for two
 * - Delivery time (from SLA object)
 *
 * Props:
 * - resData: an object containing restaurant info properties
 */
const RestaurantCard = ({ resData }) => {
  // Destructure properties from the restaurant data object
  const {
    cloudinaryImageId,
    name,
    areaName,
    cuisines,
    avgRating,
    sla,
    costForTwo,
  } = resData;

  return (
    // Card container with white background, rounded corners, shadow & hover effects
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Restaurant image: composed with CDN base URL + image ID */}
      <img
        className="w-full h-40 object-cover"
        src={`${CDN_URL}${cloudinaryImageId}`}
        alt="Restaurant Logo"
      />

      {/* Card content area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Header: restaurant name and rating badge */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg truncate">{name}</h3>

          {/* Rating badge with color based on avgRating value */}
          <div
            className={`text-sm font-semibold rounded px-2 py-1 ${
              avgRating >= 4
                ? "bg-green-100 text-green-700"
                : avgRating >= 3
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {avgRating} <span className="ml-1">⭐</span>
          </div>
        </div>

        {/* List cuisines as a comma-separated string */}
        <div className="text-gray-500 text-xs mb-1 truncate">
          {cuisines.join(", ")}
        </div>

        {/* Show the area/region name */}
        <div className="text-gray-400 text-xs mb-3">{areaName}</div>

        {/* Footer: cost for two and delivery time */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-gray-700 text-sm font-semibold">
            {costForTwo}
          </span>
          <span className="text-gray-600 text-xs font-medium bg-gray-100 px-2 py-1 rounded">
            {sla.deliveryTime} MINS
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * withPromotedLabel HOC (Higher Order Component)
 * ----------------------------------------------
 * A wrapper component that adds a "Promoted" label to the original RestaurantCard.
 * Used to highlight certain restaurant cards visually.
 *
 * Usage: Wrap RestaurantCard component and it returns a new component
 * that renders the label plus the original card.
 *
 * @param {Component} RestaurantCard - The component to wrap
 * @returns {Component} - New component with Promoted label overlay
 */
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <>
        {/* Promoted label positioned absolutely with gradient background */}
        <label className="absolute bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 text-white text-sm px-2 py-1 rounded-lg shadow-lg transition z-20">
          Promoted
        </label>

        {/* Render the wrapped RestaurantCard component passing all props */}
        <RestaurantCard {...props} />
      </>
    );
  };
};

export default RestaurantCard;
