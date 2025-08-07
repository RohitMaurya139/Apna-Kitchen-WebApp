// Core React imports for component creation, code splitting, and hooks
import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom/client";

// Main layout and UI components
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import "./index.css"; // App-wide styles

// React Router DOM imports for SPA navigation & routing
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Route-specific page components
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Error from "./components/Error.js";
import Shimmer from "./components/Shimmer.js"; // Loading placeholder

// Context and Redux imports
import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./components/Cart.js";

// Code splitting: Lazy load Grocery component (only loaded when needed)
const Grocery = lazy(() => import("./components/Grocery.js"));

/**
 * The Global App Layout Component
 * - Wraps app in Redux Provider & user context
 * - Renders header, footer, and routed views (Outlet)
 */
const AppLayout = () => {
  // Get user info from context (to allow child components to use/update)
  const { loggedInUser } = useContext(UserContext);

  // Local state to hold the username
  const [UserName, setUserName] = useState();

  // Set the user name on mount (simulates fetching user data)
  useEffect(() => {
    const data = { name: "Rohit Maurya" }; // hardcoded user
    setUserName(data.name);
  }, []);

  return (
    // Redux provider for global state (cart, etc.)
    <Provider store={appStore}>
      {/* Custom user context for logged in user info */}
      <UserContext.Provider value={{ loggedInUser: UserName, setUserName }}>
        <Header />
        {/* Renders matched route-child (see routing config below) */}
        <Outlet />
        <Footer />
      </UserContext.Provider>
    </Provider>
  );
};

/**
 * Routing Configuration
 * - Declares all available routes for the app and links them to components
 * - Error boundary handled by Error component
 */
const appRouter = createBrowserRouter([
  {
    path: "/", // base path
    element: <AppLayout />, // main layout for all routes
    children: [
      {
        path: "/", // home/main page
        element: (
          <Suspense fallback={<Shimmer />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/grocery", // code-split, lazy loaded
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        // Dynamic route parameter for restaurant menu
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />, // catch-all error route
  },
]);

/**
 * Bootstrapping React: Find #root in DOM and mount RouterProvider (which renders the whole app)
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

/**
 * High-level architecture, in order:
 * 1. Provides Redux store for global state management (`appStore`)
 * 2. Provides a custom React Context (`UserContext`) for user authentication/info
 * 3. Renders <Header /> and <Footer /> persistently on every page
 * 4. Renders the active route (using <Outlet />) between Header and Footer
 * 5. Uses React Router for declarative routing, with suspense-based lazy-loading for some routes
 * 6. Shimmer is the loading placeholder shown while lazy components load
 * 7. Error component is a global error boundary for routes that fail to load or are not found
 */
