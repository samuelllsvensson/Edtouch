import * as ACTION_TYPES from "./actionTypes";

export const fetchDbPostSuccess = (post) => {
  return {
    type: ACTION_TYPES.FETCH_POST_SUCCESS,
    payload: post,
  };
};

export const fetchDbPostFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_POST_FAIL,
    payload: err,
  };
};

export const fetchDbPostsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_REQUEST,
  };
};

export const fetchDbPostsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchDbPostsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_FAIL,
    payload: err,
  };
};

export const fetchDbPostCommentsSuccess = (comments) => {
  return {
    type: ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const fetchDbPostCommentsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_POST_COMMENTS_FAIL,
    payload: err,
  };
};

export const deletePostCommentRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_POST_COMMENT_REQUEST,
  };
};

export const deletePostCommentSuccess = () => {
  return {
    type: ACTION_TYPES.DELETE_POST_COMMENT_SUCCESS,
  };
};

export const deletePostCommentFail = (err) => {
  return {
    type: ACTION_TYPES.DELETE_POST_COMMENT_FAIL,
    payload: err,
  };
};

export const setCommentEditable = (id) => {
  return {
    type: ACTION_TYPES.SET_COMMENT_EDITABLE,
    payload: id,
  };
};

export const submitPostCommentRequest = () => {
  return {
    type: ACTION_TYPES.SUBMIT_POST_COMMENT_REQUEST,
  };
};

export const submitPostCommentSuccess = () => {
  return {
    type: ACTION_TYPES.SUBMIT_POST_COMMENT_SUCCESS,
  };
};

export const submitPostCommentFail = (err) => {
  return {
    type: ACTION_TYPES.SUBMIT_POST_COMMENT_FAIL,
    payload: err,
  };
};

export const updatePostCommentRequest = () => {
  return {
    type: ACTION_TYPES.UPDATE_POST_COMMENT_REQUEST,
  };
};

export const updatePostCommentSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_POST_COMMENT_SUCCESS,
  };
};

export const updatePostCommentFail = (err) => {
  return {
    type: ACTION_TYPES.UPDATE_POST_COMMENT_FAIL,
    payload: err,
  };
};

export const loginSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const logoutSuccess = () => {
  return {
    type: ACTION_TYPES.LOGOUT_SUCCESS,
  };
};

export const addA0Profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_A0_PROFILE,
    payload: profile,
  };
};

export const addDBProfile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_DB_PROFILE,
    payload: profile,
  };
};

export const removeA0Profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_A0_PROFILE,
  };
};
