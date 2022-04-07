import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({loggedIn, children}) => {
    return (
      <Route>
        {
          loggedIn ? children : <Redirect to="/sign-in" />
        }
      </Route>
    );
  };
  
  export default ProtectedRoute; 