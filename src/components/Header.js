// Import assets, icons, hooks, router utilities and context
import { LOGO_URL } from "../utils/constant"; // Logo image URL
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome icons

import { useEffect, useState, useContext } from "react"; // React hooks
import { Link } from "react-router-dom"; // SPA navigation
import useOnlineStatus from "../utils/useOnlineStatus"; // Custom online status hook
import UserContext from "../utils/UserContext"; // App's user context
import { useSelector } from "react-redux"; // Get redux state (cart items)

/**
 * Header Component
 * ----------------
 * Renders the top navigation bar
 * - Shows logo (clickable)
 * - Navigation links to main routes
 * - Shows online/offline status
 * - Uses context to show logged in user
 * - Shows login/logout toggle button
 * - Shows cart icon and current cart item count
 */
const Header = () => {
  // Local state for Login/Logout button text
  const [btnName, setBtnName] = useState("Login");

  // Access user info from context
  const { loggedInUser } = useContext(UserContext);

  // Access Redux store to show current number of items in the shopping cart
  const cartItems = useSelector((store) => store.cart.items);

  // Debug: Log when the button changes (or when this effect reruns due to btnName dependency)
  useEffect(() => {
 console.log(btnName)
  }, [btnName]);

  // Get live online/offline status from a custom hook
  const onlineStatus = useOnlineStatus();

  // Main UI
  return (
    <header className="bg-white shadow-md overflow-x-hidden ">
      <div className="container mx-5 flex justify-between items-center py-4 px-6 ">
        {/* Logo (clicks take you to homepage) */}
        <div className="logo-container">
          <Link to="/">
            <img className="w-24" src={LOGO_URL} alt="logo" />
          </Link>
        </div>

        {/* Navigation Area */}
        <nav>
          <ul className="flex items-center gap-4 text-gray-700 text-sm font-medium ">
            {/* Online Status */}
            <li className="flex items-center">
              {onlineStatus ? (
                <span className="text-green-600 flex items-center gap-1">
                  <span className="text-lg">🟢</span> Online
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-1">
                  <span className="text-lg">🔴</span> Offline
                </span>
              )}
            </li>

            {/* Navigation Links */}
            <li>
              <Link
                to="/"
                className="hover:text-yellow-500 text-[15px] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Grocery"
                className="hover:text-yellow-500 text-[15px] transition-colors duration-200"
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-500  text-[15px] transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-500 text-[15px] transition-colors duration-200"
              >
                Contact
              </Link>
            </li>

            {/* Cart Section: with icon, item count (Redux) */}
            <li>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-[15px]"
                aria-label="Shopping Cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="text-red-500 font-semibold">
                  ({cartItems.length})
                </span>
              </Link>
            </li>

            {/* Login/Logout Toggle */}
            <li className="px-1">
              <button
                className="hover:text-yellow-500 w-10 text-gray-600 font-semibold text-[15px]"
                onClick={() =>
                  btnName === "Login"
                    ? setBtnName("Logout")
                    : setBtnName("Login")
                }
              >
                {btnName}
              </button>
            </li>

            {/* Username from Context */}
            <li className="px-2 font-bold">{loggedInUser}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
