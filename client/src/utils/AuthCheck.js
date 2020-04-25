import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./context";

import axios from "axios";

const AuthCheck = () => {
  const context = useContext(Context);

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
            .then((res) => context.handleAddDBProfile(res.data))
        )
        .then(history.replace("/"));
    } else {
      context.handleUserLogout();
      context.handleRemoveA0Profile();
      history.replace("/");
    }
  }, [context.authObj.userProfile, context]);

  return <div></div>;
};

export default AuthCheck;
