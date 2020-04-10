import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";
import axios from "axios";

import * as postsReducer from "./store/reducers/postsReducer";
import Routes from "./routes";

const ContextState = () => {
  /*
    Posts Reducer
  */
  const [statePostsReducer, dispatchPostsReducer] = useReducer(
    postsReducer.postsReducer,
    postsReducer.initialState
  );

  const handleFetchPosts = () => {
    axios
      .get("/api/get/allposts")
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchDbPostsFail(err));
      });
  };

  return (
    <div>
      <Context.Provider
        value={{
          postsState: statePostsReducer,
          handleFetchPosts: (posts) => handleFetchPosts(posts),
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
