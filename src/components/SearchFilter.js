import React, { useState } from "react";

const SearchFilter = ({
  listOfRestaurants,
  onFilter,
  initialSearchText = "",
}) => {
  const [searchText, setSearchText] = useState(initialSearchText);

  // Handler for Search button click
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    onFilter(filtered);
  };

  // Filter button handlers
  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.0
    );
    onFilter(filtered);
  };

  const handleBudget = () => {
    const filtered = listOfRestaurants.filter((res) => {
      const cost = parseInt(res.info.costForTwo.replace(/[^\d]/g, ""));
      return cost <= 300;
    });
    onFilter(filtered);
  };

  const handleFastDelivery = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info.sla.deliveryTime <= 35
    );
    onFilter(filtered);
  };

  const handleReset = () => {
    onFilter(listOfRestaurants);
    setSearchText("");
  };

  return (
    <div className="search-container mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      {/* Search Box */}
      <div className="search-box flex items-center gap-3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="search-input border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-56 sm:w-72 transition"
        />
        <button
          className="search-btn bg-yellow-500 hover:bg-yellow-600 text-white rounded px-5 py-2 w-fit text-sm font-semibold transition-colors whitespace-nowrap"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-container flex flex-wrap justify-center sm:justify-start gap-3">
        <button
          className="filter-btn bg-green-500 hover:bg-green-600 text-white px-2 py-1 w-fit text-sm rounded font-medium shadow transition-colors whitespace-nowrap"
          onClick={handleTopRated}
        >
          Top Rated
        </button>

        <button
          className="filter-btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded w-fit text-sm font-medium shadow transition-colors whitespace-nowrap"
          onClick={handleBudget}
        >
          Less than ₹300
        </button>

        <button
          className="filter-btn bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded w-fit text-sm font-medium shadow transition-colors whitespace-nowrap"
          onClick={handleFastDelivery}
        >
          Fast Delivery
        </button>

        <button
          className="Reset-btn w-fit text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded font-medium hover:bg-gray-300 transition whitespace-nowrap"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
