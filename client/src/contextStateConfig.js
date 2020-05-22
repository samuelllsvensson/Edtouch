import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions";
import axios from "axios";
import history from "./utils/history";

import * as postsReducer from "./store/reducers/postsReducer";
import * as authReducer from "./store/reducers/authReducer";
import * as profileReducer from "./store/reducers/profileReducer";
import Routes from "./routes";

import Auth from "./utils/Auth";

const auth = new Auth();

// Acts as a middleware and will add status states for a reducer
const addStatus = (reducer) => {
  return (state, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
    let requestName;
    let requestState;
    if (matches) {
      [, requestName, requestState] = matches;
    }

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
  // Posts
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

  const handleAddPost = (data) => {
    axios
      .post("/api/post/post", {
        title: data.title,
        description: data.description,
        image_id: data.image_id,
        user_id: data.user_id,
        username: data.username,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.addPostSuccess());
        history.replace("/");
        console.log("HISTORY REPLACED ");
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.addPostFail(err));
        console.log(err);
      });
  };

  // Post comments
  const handleFetchPostComments = (postId) => {
    axios
      .get(`/api/get/post/${postId}/comments`)
      .then((res) => {
        //console.log(res);
        dispatchPostsReducer(ACTIONS.fetchDbPostCommentsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchDbPostCommentsFail(err));
      });
  };

  const handlePostComment = (data) => {
    dispatchPostsReducer(ACTIONS.submitPostCommentRequest());
    console.log(data);
    axios
      .post(`/api/post/${data.post_id}/postcomment`, {
        comment: data.comment,
        username: data.username,
        userId: data.user_id,
      })
      .then(() => {
        dispatchPostsReducer(ACTIONS.submitPostCommentSuccess());
        handleFetchPostComments(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.submitPostCommentFail());
        console.log(err);
      });
  };

  const setIsEdit = (id) => {
    dispatchPostsReducer(ACTIONS.setCommentEditable(id));
  };

  const handleUpdatePostComment = (data) => {
    dispatchPostsReducer(ACTIONS.updatePostCommentRequest());
    axios
      .put(`/api/put/${data.post_id}/postcomment`, {
        comment: data.comment,
        username: data.username,
        user_id: data.user_id,
        comment_id: data.comment_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.updatePostCommentSuccess());
        handleFetchPostComments(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.updatePostCommentFail());
        console.log(err);
      });
  };

  const handleDeleteComment = (data) => {
    dispatchPostsReducer(ACTIONS.deletePostCommentRequest());
    axios
      .delete(`/api/delete/${data.comment_id}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.deletePostCommentSuccess());
        handleFetchPostComments(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.deletePostCommentFail(err));
        console.log(err);
      });
  };

  // Edits
  const handleFetchEdit = (data) => {
    axios
      .get(`/api/get/${data.post_id}/edits/${data.edit_id}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbEditSuccess(res.data));
      })
      .catch((err) => dispatchPostsReducer(ACTIONS.fetchDbEditFail(err)));
  };

  const handleFetchEdits = (postId) => {
    dispatchPostsReducer(ACTIONS.fetchDbEditsRequest());
    axios
      .get(`/api/get/${postId}/edits`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchDbEditsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchDbEditsFail(err));
      });
  };

  const handleAddEdit = (data) => {
    axios
      .post("/api/post/edit", {
        post_id: data.post_id,
        description: data.description,
        image_id: data.image_id,
        user_id: data.user_id,
        username: data.username,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.addEditSuccess());
        handleFetchEdits(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.addEditFail(err));
        console.log(err);
      });
  };

  const handleDeleteEdit = (data) => {
    dispatchPostsReducer(ACTIONS.deleteEditRequest());
    axios
      .delete(`/api/delete/edit/${data.edit_id}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.deleteEditSuccess());
        handleFetchEdits(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.deleteEditFail(err));
        console.log(err);
      });
  };

  const handleUpdateEdit = (data) => {
    dispatchPostsReducer(ACTIONS.updateEditRequest());
    axios
      .put(`/api/put/${data.edit_id}/edit`, {
        description: data.description,
        user_id: data.user_id,
        image_id: data.image_id,
        post_id: data.post_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.updateEditSuccess());
        handleFetchEdits(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.updateEditFail());
        console.log(err);
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
    dispatchAuthReducer(ACTIONS.logoutSuccess());
  };

  const handleAddA0Profile = (profile) => {
    dispatchAuthReducer(ACTIONS.addA0Profile(profile));
  };

  const handleAddDBProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.addDBProfile(profile));
  };

  const handleRemoveA0Profile = () => {
    dispatchAuthReducer(ACTIONS.removeA0Profile());
  };

  const handleAuthentication = (props) => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  /*
    Profile reducer
  */
  const [stateProfileReducer, dispatchProfileReducer] = useReducer(
    addStatus(profileReducer.profileReducer),
    profileReducer.initialState
  );

  const handleFetchProfilePosts = (userId) => {
    dispatchProfileReducer(ACTIONS.fetchDbProfilePostsRequest());
    axios
      .get(`/api/get/user/${userId}/posts`)
      .then((res) => {
        dispatchProfileReducer(ACTIONS.fetchDbProfilePostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchProfileReducer(ACTIONS.fetchDbProfilePostsFail(err));
      });
  };

  const changeProfileAvatar = (data) => {
    dispatchProfileReducer(ACTIONS.changeProfileAvatarRequest());
    axios
      .put(`/api/put/user/${data.userId}/avatar`, {
        url: data.url,
      })
      .then((res) => {
        dispatchProfileReducer(ACTIONS.changeProfileAvatarSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchProfileReducer(ACTIONS.changeProfileAvatarFail(err));
      });
  };

  return (
    <div>
      <Context.Provider
        value={{
          // Posts
          postsState: statePostsReducer,
          handleFetchPost: (post) => handleFetchPost(post),
          handleFetchPosts: (posts) => handleFetchPosts(posts),

          // Post comments
          handleFetchPostComments: (comments) =>
            handleFetchPostComments(comments),
          handlePostComment: (comment) => handlePostComment(comment),
          setIsEdit: (id) => setIsEdit(id),
          handleUpdatePostComment: (comment) =>
            handleUpdatePostComment(comment),
          handleDeleteComment: (comment) => handleDeleteComment(comment),
          handleAddPost: (post) => handleAddPost(post),

          // Edits
          handleFetchEdit: (edit) => handleFetchEdit(edit),
          handleFetchEdits: (edits) => handleFetchEdits(edits),
          handleAddEdit: (edit) => handleAddEdit(edit),
          handleDeleteEdit: (edit) => handleDeleteEdit(edit),
          handleUpdateEdit: (edit) => handleUpdateEdit(edit),

          // Auth
          authState: stateAuthReducer,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleAddA0Profile: (profile) => handleAddA0Profile(profile),
          handleAddDBProfile: (profile) => handleAddDBProfile(profile),
          handleRemoveA0Profile: () => handleRemoveA0Profile(),

          //Profile
          profileState: stateProfileReducer,
          handleFetchProfilePosts: (posts) => handleFetchProfilePosts(posts),
          changeProfileAvatar: (userId) => changeProfileAvatar(userId),

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
