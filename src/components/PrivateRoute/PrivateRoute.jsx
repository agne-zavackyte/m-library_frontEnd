import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { object, string } from "prop-types";

const PrivateRoute = ({ component, path }) => {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.token ? (
        <Route exact path={path} component={component} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
};

PrivateRoute.propTypes = {
  component: object.isRequired,
  path: string.isRequired,
};

export default PrivateRoute;
