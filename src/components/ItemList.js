import React from "react";
import { CDN_URL } from "../utils/constant";

const ItemList = ({ items = [] }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center m-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col gap-2.5 sm:max-w-[70%] w-full">
            <h1 className="text-lg font-semibold text-gray-900">
              {item.card.info.name}
            </h1>
            <h3 className="text-yellow-700 font-bold text-base">
              ₹{item.card.info.price / 100}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {item.card.info.description}
            </p>
          </div>

          <div className="flex-shrink-0 mt-4 sm:mt-0 relative">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover shadow-md"
            />
            <button
              aria-label={`Add ${item.card.info.name} to cart`}
              className="px-3 bg-gray-100 shadow-lg text-green-500 rounded-lg w-fit absolute bottom-1 right-1 font-semibold hover:bg-green-500 hover:text-gray-100"
              style={{ transform: "translate(-15%, 50%)" }}
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
