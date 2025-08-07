// Import createContext function from React to create a new context object
import { createContext } from "react";

/**
 * UserContext
 * -----------
 * Creates a React Context for sharing user-related data globally across components.
 *
 * The default value is an object with a single property:
 *  - loggedInUser: set to "Default User" initially
 *
 * This context allows components anywhere in the app tree to access and update
 * the logged-in user's information without passing props down manually at every level.
 */
const UserContext = createContext({
  loggedInUser: "Default User",
});

// Export the UserContext so that other components can import and consume/use it
export default UserContext;
