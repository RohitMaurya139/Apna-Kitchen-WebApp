import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <img
        className="w-full h-40 object-cover"
        src={`${CDN_URL}${cloudinaryImageId}`}
        alt="Restaurant Logo"
      />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg truncate">{name}</h3>
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
        <div className="text-gray-500 text-xs mb-1 truncate">
          {cuisines.join(", ")}
        </div>
        <div className="text-gray-400 text-xs mb-3">{areaName}</div>
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

export default RestaurantCard;
