import { useState,useEffect } from "react";

const useRestaurantMenu = (resId)=> {
    const [restaurantInfo, setRestaurantInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, [])
    
    const fetchMenu = async () => {
        const data = await fetch(
          `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7085176&lng=77.1760415&restaurantId=${resId}&submitAction=ENTER`
        );
        const json = await data.json();
        setRestaurantInfo(json.data);
    }
    return restaurantInfo
}

export default useRestaurantMenu