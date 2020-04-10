import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";

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

  const handleFetchPosts = (posts) => {
    dispatchPostsReducer(ACTIONS.fetchDbPosts(posts));
  };

  return (
    <div>
      <Context.Provider
        value={{
          postsState: statePostsReducer.posts,
          handleFetchPosts: (posts) => handleFetchPosts(posts),
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
