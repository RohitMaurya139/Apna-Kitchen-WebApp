import { LOGO_URL } from "../utils/constant";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("header changed");

  useEffect(() => {
    console.log("useEffect called");
  }, [btnName]);

  const onlineStatus = useOnlineStatus();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between py-4">
          {/* Logo */}
          <div className="logo-container flex-shrink-0">
            <Link to="/">
              <img className="w-20 sm:w-24" src={LOGO_URL} alt="logo" />
            </Link>
          </div>

          {/* Responsive Menu Toggle (optional) */}
          {/* You may add a hamburger menu icon here for real mobile toggling */}

          {/* Navigation and Online Status */}
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-700 text-xs sm:text-sm font-medium">
            <li className="flex items-center whitespace-nowrap">
              {onlineStatus ? (
                <span className="text-green-600 flex items-center gap-1 text-[13px] sm:text-sm">
                  <span className="text-lg">🟢</span> Online
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-1 text-[13px] sm:text-sm">
                  <span className="text-lg">🔴</span> Offline
                </span>
              )}
            </li>

            <li>
              <Link
                to="/"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Grocery"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-500 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-lg"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>

            {/* Login Button */}
            <li className="ml-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm sm:text-[15px] rounded px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 whitespace-nowrap"
                onClick={() =>
                  btnName === "Login"
                    ? setBtnName("Logout")
                    : setBtnName("Login")
                }
              >
                {btnName}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
