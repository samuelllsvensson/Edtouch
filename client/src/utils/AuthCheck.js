import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import history from "./history";
import Context from "./context";

import axios from "axios";

const AuthCheck = (props) => {
  const context = useContext(Context);

  const locationParams = queryString.parse(props.location.search);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      const profile = context.authObj.userProfile;
      context.handleUserLogin();
      context.handleAddA0Profile(profile);
      axios
        .post("/api/post/user", profile)
        .then(
          axios
            .get("/api/get/user", {
              params: { email: profile.profile.email },
            })
            .then((res) => context.handleAddDBProfile(res.data[0]))
        )
        .then(() => {
          return locationParams.to
            ? history.replace(`/${locationParams.to}`)
            : history.replace("/");
        });
    } else {
      context.handleUserLogout();
      context.handleRemoveA0Profile();
      history.replace("/");
    }
  }, [context.authObj.userProfile, context]);

  return <div></div>;
};

export default AuthCheck;
