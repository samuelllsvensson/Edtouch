import React, { useEffect, useContext } from "react";
import queryString from "query-string";
import history from "./history";
import Context from "./context";

import axios from "axios";

/**
 * React component that checks if user is authenticated and saves user data to Context store
 */
const AuthCheck = (props) => {
  const context = useContext(Context);

  // The user will be redirected to this component with a search param ?to=DESTINATION
  // We store the destination url in locationParams.
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
            .then((res) => {
              context.handleFetchProfileLikes(res.data[0].user_id);
              context.handleAddDBProfile(res.data[0]);
            })
        )
        .then(() => {
          // Send user back to the URL they came from
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
