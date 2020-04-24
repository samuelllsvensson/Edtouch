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

export const loginSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const loginFail = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const addProfile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile,
  };
};

export const removeProfile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE,
  };
};
