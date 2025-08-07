import { useRouteError } from "react-router-dom";

/**
 * Error Component
 * ---------------
 * - This component is used as the error boundary for routes.
 * - It displays an error message if navigation fails or an unknown route is accessed.
 */
const Error = () => {
  // Get the error object from the router using the hook.
  // This object includes useful fields like status and statusText.
  const error = useRouteError();

  // JSX to render a simple UI showing the error details
  return (
    <div className="error">
      <h1>Oops!</h1>
      <h2>Something went wrong</h2>
      {/* Show the HTTP status and the status text from the error object */}
      <h3>
        {error.status}:{error.statusText}
      </h3>
    </div>
  );
};

// Export the Error component for routing and use elsewhere in the app
export default Error;
