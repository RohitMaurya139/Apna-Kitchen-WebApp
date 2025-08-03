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
      <div className="container mx-5 flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img className="w-24" src={LOGO_URL} alt="logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6 text-gray-700 text-sm font-medium ">
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

            <li>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 text-[15px]"
                aria-label="Shopping Cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>

            <li className="mr-4 px-4">
              <button
                className="bg-yellow-500 w-22 hover:bg-yellow-600 text-white font-semibold text-[15px] rounded transition-colors duration-200 px-2 py-2 text-center"
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
