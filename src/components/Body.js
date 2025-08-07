// Import React hooks and required child components/utilities
import { useState, useEffect } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard"; // Card & HOC for promoted cards
import { restaurantList } from "../utils/mockData"; // Mock restaurant data
import Shimmer from "./Shimmer"; // Loading placeholder UI
import { Link } from "react-router-dom"; // To enable SPA navigation
import useOnlineStatus from "../utils/useOnlineStatus"; // Custom hook for online/offline detection
import SearchFilter from "./SearchFilter"; // Component for search/filter bar

/**
 * Body Component
 * --------------
 * The main content area displaying restaurant cards.
 * Handles online status, shimmer loading, filtering, and displaying restaurant lists.
 */
const Body = () => {
  // State to store the full and filtered list of restaurants
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Custom hook to check if the user is online or offline
  const onlineStatus = useOnlineStatus();

  // Higher Order Component: Used to display a "Promoted" label on promoted restaurant cards
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  /**
   * On mount:
   * - Initialize restaurant data from mockData into component state
   * - Both full list and filtered list start as all restaurants
   */
  useEffect(() => {
    setListOfRestaurants(restaurantList);
    setFilteredRestaurants(restaurantList);
  }, []);

  /**
   * If no data (the lists are still empty), show shimmering loader
   */
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  /**
   * If user is offline: Show an offline warning message and the shimmer loader
   */
  if (!onlineStatus) {
    return (
      <>
        <div className="bg-red-500 text-white p-4 text-center">
          <h3 className="font-bold text-lg">
            You are offline. Some features may not be available.
          </h3>
          <h4>Please check your internet Connection</h4>
        </div>
        <Shimmer />
      </>
    );
  }

  /**
   * Main Render:
   * - Shows search/filter box
   * - Shows a grid of filtered restaurant cards
   * - Shows friendly message if nothing matches
   */
  return (
    <div className="body max-w-6xl mx-auto px-4 py-6">
      {/* Search and filtering bar */}
      <SearchFilter
        listOfRestaurants={listOfRestaurants} // All restaurants (for search base)
        onFilter={setFilteredRestaurants} // Callback to update filtered list
      />

      {/* Restaurant Cards Grid */}
      <div className="res-container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {filteredRestaurants.length === 0 ? (
          // Display "no results" message if filter finds nothing
          <div className="col-span-full text-center text-gray-500 text-lg py-20">
            <h3>No restaurants match your filter/search.</h3>
          </div>
        ) : (
          // Map over filtered array and render a `Link` (for navigation) around each card
          filteredRestaurants.map((restaurant) => (
            <Link
              to={"/restaurant/" + restaurant.info.id} // Navigates to details page for that restaurant
              key={restaurant.info.id} // Unique key for React list rendering
              className="w-full max-w-sm"
            >
              {/* If promoted, wrap in promo HOC - else show normal card */}
              {restaurant.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant.info} />
              ) : (
                <RestaurantCard resData={restaurant.info} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
