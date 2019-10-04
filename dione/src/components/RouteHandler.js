import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { AuthContext } from './Context';

const RouteHandler = ({ RouteComponent, FallbackComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <FallbackComponent {...routeProps} />
        )
      }
    />
  );
};

export default RouteHandler;