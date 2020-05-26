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
        dispatchPostsReducer(ACTIONS.fetchPostSuccess(res.data));
      })
      .catch((err) => dispatchPostsReducer(ACTIONS.fetchPostFail(err)));
  };

  const handleFetchPosts = () => {
    dispatchPostsReducer(ACTIONS.fetchPostsRequest());
    axios
      .get("/api/get/posts")
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchPostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchPostsFail(err));
      });
  };

  const handleAddPost = (data) => {
    axios
      .post("/api/post/add_post", {
        title: data.title,
        description: data.description,
        image_id: data.image_id,
        user_id: data.user_id,
        username: data.username,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.addPostSuccess());
        history.replace("/");
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.addPostFail(err));
        console.log(err);
      });
  };

  const handleUpdatePost = (data) => {
    dispatchPostsReducer(ACTIONS.updatePostRequest());
    axios
      .put(`/api/put/post/${data.post_id}`, {
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        image_id: data.image_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.updatePostSuccess());
        handleFetchPost(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.updatePostFail());
        console.log(err);
      });
  };

  const handleDeletePost = (data) => {
    dispatchPostsReducer(ACTIONS.deletePostRequest());
    axios
      .delete(`/api/delete/post/${data.post_id}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.deletePostSuccess());
        handleFetchPosts(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.deletePostFail(err));
        console.log(err);
      });
  };

  // Post comments
  const handleFetchPostComments = (postId) => {
    axios
      .get(`/api/get/post/${postId}/postcomments`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchPostCommentsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchPostCommentsFail(err));
      });
  };

  const handlePostComment = (data) => {
    dispatchPostsReducer(ACTIONS.submitPostCommentRequest());
    axios
      .post(`/api/post/post/${data.post_id}/postcomment`, {
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

  const handleUpdatePostComment = (data) => {
    dispatchPostsReducer(ACTIONS.updatePostCommentRequest());
    axios
      .put(`/api/put/post/${data.post_id}/postcomment`, {
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

  const handleDeletePostComment = (data) => {
    dispatchPostsReducer(ACTIONS.deletePostCommentRequest());
    axios
      .delete(`/api/delete/post/${data.comment_id}/postcomment`)
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
  const handleFetchEdits = (postId) => {
    dispatchPostsReducer(ACTIONS.fetchEditsRequest());
    axios
      .get(`/api/get/edits/${postId}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchEditsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchEditsFail(err));
      });
  };

  const handleFetchEdit = (data) => {
    axios
      .get(`/api/get/edits/${data.post_id}/${data.edit_id}`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchEditSuccess(res.data));
      })
      .catch((err) => dispatchPostsReducer(ACTIONS.fetchEditFail(err)));
  };

  const handleAddEdit = (data) => {
    axios
      .post("/api/post/add_edit", {
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

  const handleUpdateEdit = (data) => {
    dispatchPostsReducer(ACTIONS.updateEditRequest());
    axios
      .put(`/api/put/edit/${data.edit_id}`, {
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

  const handleLikeEdit = (data) => {
    dispatchPostsReducer(ACTIONS.likeEditRequest());
    axios
      .put(`/api/put/edit/${data.edit_id}/like`, {
        userId: data.user_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.likeEditSuccess());
        handleFetchEdits(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.likeEditFail());
        console.log(err);
      });
  };

  const handleUnlikeEdit = (data) => {
    dispatchPostsReducer(ACTIONS.unlikeEditRequest());
    axios
      .put(`/api/put/edit/${data.edit_id}/unlike`, {
        userId: data.user_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.unlikeEditSuccess());
        handleFetchEdits(data.post_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.unlikeEditFail());
        console.log(err);
      });
  };

  // Edit comments
  const handleFetchEditComments = (edit_id) => {
    axios
      .get(`/api/get/edit/${edit_id}/editcomments`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.fetchEditCommentsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchPostsReducer(ACTIONS.fetchEditCommentsFail(err));
      });
  };

  const handleEditComment = (data) => {
    dispatchPostsReducer(ACTIONS.submitEditCommentRequest());
    axios
      .post(`/api/post/edit/${data.edit_id}/editcomment`, {
        comment: data.comment,
        username: data.username,
        userId: data.user_id,
      })
      .then(() => {
        dispatchPostsReducer(ACTIONS.submitEditCommentSuccess());
        handleFetchEditComments(data.edit_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.submitEditCommentFail());
        console.log(err);
      });
  };

  const handleUpdateEditComment = (data) => {
    dispatchPostsReducer(ACTIONS.updateEditCommentRequest());
    axios
      .put(`/api/put/edit/${data.edit_id}/editcomment`, {
        comment: data.comment,
        username: data.username,
        user_id: data.user_id,
        edit_comment_id: data.comment_id,
      })
      .then((res) => {
        dispatchPostsReducer(ACTIONS.updateEditCommentSuccess());
        handleFetchEditComments(data.edit_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.updateEditCommentFail());
        console.log(err);
      });
  };

  const handleDeleteEditComment = (data) => {
    dispatchPostsReducer(ACTIONS.deleteEditCommentRequest());
    axios
      .delete(`/api/delete/edit/${data.edit_comment_id}/editcomment`)
      .then((res) => {
        dispatchPostsReducer(ACTIONS.deleteEditCommentSuccess());
        handleFetchEditComments(data.edit_id);
      })
      .catch((err) => {
        dispatchPostsReducer(ACTIONS.deleteEditCommentFail(err));
        console.log(err);
      });
  };

  // Utilites
  const setEditablePost = (id) => {
    dispatchPostsReducer(ACTIONS.setPostEditable(id));
  };
  const setEditablePostComment = (id) => {
    dispatchPostsReducer(ACTIONS.setPostCommentEditable(id));
  };
  const setEditableEdit = (id) => {
    dispatchPostsReducer(ACTIONS.setEditEditable(id));
  };
  const setEditableEditComment = (id) => {
    dispatchPostsReducer(ACTIONS.setEditCommentEditable(id));
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
    dispatchProfileReducer(ACTIONS.fetchProfilePostsRequest());
    axios
      .get(`/api/get/profile/posts/${userId}`)
      .then((res) => {
        dispatchProfileReducer(ACTIONS.fetchProfilePostsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchProfileReducer(ACTIONS.fetchProfilePostsFail(err));
      });
  };

  const handleFetchProfileEdits = (userId) => {
    dispatchProfileReducer(ACTIONS.fetchProfileEditsRequest());
    axios
      .get(`/api/get/user/${userId}/edits`)
      .then((res) => {
        dispatchProfileReducer(ACTIONS.fetchProfileEditsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatchProfileReducer(ACTIONS.fetchProfileEditsFail(err));
      });
  };

  const changeProfileAvatar = (data) => {
    dispatchProfileReducer(ACTIONS.changeProfileAvatarRequest());
    axios
      .put(`/api/put/profile/avatar/${data.userId}`, {
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

  const handleFetchProfileLikes = (user_id) => {
    dispatchProfileReducer(ACTIONS.fetchProfileLikesRequest());
    axios
      .get(`/api/get/profile/likes_count/${user_id}`)
      .then((res) => {
        dispatchProfileReducer(
          ACTIONS.fetchProfileLikesSuccess(res.data[0].sum)
        );
      })
      .catch((err) => {
        dispatchProfileReducer(ACTIONS.fetchProfileLikesFail(err));
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
          handleUpdatePostComment: (comment) =>
            handleUpdatePostComment(comment),
          handleDeletePostComment: (comment) =>
            handleDeletePostComment(comment),
          handleAddPost: (post) => handleAddPost(post),
          handleUpdatePost: (post) => handleUpdatePost(post),
          handleDeletePost: (post) => handleDeletePost(post),

          // Edits
          handleFetchEdit: (edit) => handleFetchEdit(edit),
          handleFetchEdits: (edits) => handleFetchEdits(edits),
          handleAddEdit: (edit) => handleAddEdit(edit),
          handleDeleteEdit: (edit) => handleDeleteEdit(edit),
          handleUpdateEdit: (edit) => handleUpdateEdit(edit),
          handleLikeEdit: (edit) => handleLikeEdit(edit),
          handleUnlikeEdit: (edit) => handleUnlikeEdit(edit),

          // Edit comments
          handleFetchEditComments: (comments) =>
            handleFetchEditComments(comments),
          handleEditComment: (comment) => handleEditComment(comment),
          handleUpdateEditComment: (comment) =>
            handleUpdateEditComment(comment),
          handleDeleteEditComment: (comment) =>
            handleDeleteEditComment(comment),

          // Utilities
          setEditablePost: (id) => setEditablePost(id),
          setEditablePostComment: (id) => setEditablePostComment(id),
          setEditableEdit: (id) => setEditableEdit(id),
          setEditableEditComment: (id) => setEditableEditComment(id),

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
          handleFetchProfileEdits: (edits) => handleFetchProfileEdits(edits),
          changeProfileAvatar: (userId) => changeProfileAvatar(userId),
          handleFetchProfileLikes: (user_id) =>
            handleFetchProfileLikes(user_id),

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
