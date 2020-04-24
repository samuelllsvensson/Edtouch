import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";
import axios from "axios";

import * as postsReducer from "./store/reducers/postsReducer";
import * as authReducer from "./store/reducers/authReducer";
import Routes from "./routes";

import Auth from "./utils/Auth";

const auth = new Auth();

// Acts as a middleware and will add status states for a reducer
const addStatus = (reducer) => {
  return (state, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
    const [, requestName, requestState] = matches;

    let error;
    let loading;

    if (requestState === "REQUEST") {
      loading = { [requestName]: true };
      error = { [requestName]: null };
    } else if (requestState === "FAIL") {
      loading = { [requestName]: false };
      error = { [requestName]: action.payload };
    } else if (requestState === "SUCCESS") {
      loading = { [requestName]: false };
      error = { [requestName]: null };
    }

    const reduce = (reducedObj) => {
      return {
        ...reducedObj,
        errors: { ...state.errors, ...error },
        loadings: { ...state.loadings, ...loading },
      };
    };

    return reduce(reducer(state, action));
  };
};

const ContextState = () => {
  /*
    Posts Reducer
  */
  const [statePostsReducer, dispatchPostsReducer] = useReducer(
    addStatus(postsReducer.postsReducer),
    postsReducer.initialState
  );

  const handleFetchPost = (postId) => {
    axios
      .get(`/api/get/post/${postId}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbPostSuccess(res.data));
      })
      .catch((err) => dispatchPostsReducer(ACTIONS.fetchDbPostFail(err)));
  };

  const handleFetchPosts = () => {
    dispatchPostsReducer(ACTIONS.fetchDbPostsRequest());
    axios
      .get("/api/get/posts")
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchDbPostsFail(err));
      });
  };

  const handleFetchPostComments = (postId) => {
    axios
      .get(`/api/get/post/${postId}/comments`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbPostCommentsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchDbPostCommentsFail(err));
      });
  };

  /*
      Auth Reducer
    */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    authReducer.authReducer,
    authReducer.initialState
  );

  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.loginSuccess());
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.loginFail());
  };

  const handleAddProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.addProfile(profile));
  };

  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.removeProfile());
  };

  const handleAuthentication = (props) => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          //Posts
          postsState: statePostsReducer,
          handleFetchPost: (post) => handleFetchPost(post),
          handleFetchPosts: (posts) => handleFetchPosts(posts),
          handleFetchPostComments: (comments) =>
            handleFetchPostComments(comments),

          //Auth
          authState: stateAuthReducer.authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: (profile) => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          authObj: auth,
          handleAuth: (props) => handleAuthentication(props),
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
