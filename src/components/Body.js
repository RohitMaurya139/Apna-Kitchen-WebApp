import { useState, useEffect } from "react";
import RestaurantCard ,{withPromotedLabel} from "./RestaurantCard";
import { restaurantList } from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import SearchFilter from "./SearchFilter";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const onlineStatus = useOnlineStatus();

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    setListOfRestaurants(restaurantList);
    setFilteredRestaurants(restaurantList);
  }, []);

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

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

  return (
    <div className="body max-w-6xl mx-auto px-4 py-6">
      {/* Use SearchFilter component */}
      <SearchFilter
        listOfRestaurants={listOfRestaurants}
        onFilter={setFilteredRestaurants}
      />

      {/* 🧾 Restaurant Cards */}
      <div className="res-container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {filteredRestaurants.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-20">
            <h3>No restaurants match your filter/search.</h3>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
              className="w-full max-w-sm"
            >
              {(restaurant.info.promoted)?
              (<RestaurantCardPromoted resData={restaurant.info} />):
              (<RestaurantCard resData={restaurant.info} />)}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
