import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import API from "./API";
import NotAuth from "../Pages/NotAuth"

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const [loggedIn, setLoggedIn] = useState({
      loggedIn: false,
      redirect: false
  });

  useEffect(() => {
    API.authUser().then(function (res) {
        // console.log("logged in, t/f???", res.data)
      setLoggedIn(res.data);
    });
  }, [loggedIn]);
  
  return (
    // Show the component and its props only when the user is logged in
    // Otherwise, send user to NotAuth Page
    <Route {...rest} render={(props) => loggedIn ? <Component {...props} /> : <NotAuth />} />
  );
};

export default PrivateRoute;
