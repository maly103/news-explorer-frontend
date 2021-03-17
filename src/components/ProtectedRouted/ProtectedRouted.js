import React from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const history = useHistory();
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          history.push("/", { Logged: false })
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
