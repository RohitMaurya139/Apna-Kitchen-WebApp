import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [showItem, setShowItem] = useState(false)
  const [isRotate, setIsRotate] = useState(false)
  function handelClick() {
   setShowItem(!showItem)
    setIsRotate(!isRotate)
  }

  return (
    <div className="mb-6 relative bg-gray-100 rounded-md border border-gray-300 shadow-2xl p-3 sm:p-4 cursor-pointer select-none w-[400px] sm:w-[600px] md:w-[800px]">
      <header className="flex flex-col gap-2  ">
        <div
          className="text-base sm:text-lg font-semibold text-gray-800 "
          onClick={handelClick}
        >
          {data.title} ({data.itemCards?.length || 0})
        </div>
        <div>{showItem && <ItemList items={data.itemCards || []} />}</div>
      </header>

      <div
        className={`absolute top-2 right-2 cursor-pointer sm:top-3 sm:right-3 text-base sm:text-lg text-gray-600 transition-transform duration-300 ${
          isRotate  ? "rotate-180" : ""
        }`}
        onClick={handelClick}
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default RestaurantCategory;
