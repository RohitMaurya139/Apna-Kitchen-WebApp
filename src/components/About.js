// Import React (for using class components)
import React from "react";

// Import two custom user components (assuming these are in same folder)
import User from "./User"; // Functional component (likely)
import UserClass from "./UserClass"; // Class-based component

/**
 * About Component
 * -----------------
 * - Class-based React component (extends React.Component)
 * - Renders information about the app/author and two user components
 */
class About extends React.Component {
  // Constructor sets up initial state or binds methods (not used here, but required for super)
  constructor(props) {
    super(props); // Always call super(props) for class components using constructor
  }

  /**
   * Lifecycle Method: componentDidMount
   * ------------------------------------
   * - Called once after the component outputs to the DOM
   * - Typically used for data fetching or subscriptions
   * - Async allowed in case you want to fetch remote data
   */
  async componentDidMount() {
    // Currently empty: Add code if you want something to run when this component mounts
  }

  /**
   * Render Method
   * --------------
   * - Returns the JSX to be rendered to the UI
   * - Contains:
   *    - A heading "About"
   *    - <User /> and <UserClass /> components
   */
  render() {
    return (
      <div>
        <div>About</div>
        <User /> {/* Renders the functional User component */}
        <UserClass /> {/* Renders the class-based UserClass component */}
      </div>
    );
  }
}

// Export so <About /> can be imported and used elsewhere in app
export default About;
