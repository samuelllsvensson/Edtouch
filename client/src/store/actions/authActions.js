import * as ACTION_TYPES from "./actionTypes";

/**
 * Exports all of the authentication associated actions and returns the payload.
 * Used in contextStateConfig.js
 */

export const fetchProfilePostsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_REQUEST,
  };
};

export const fetchProfilePostsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchProfilePostsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_FAIL,
    payload: err,
  };
};

export const fetchProfileEditsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_REQUEST,
  };
};

export const fetchProfileEditsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_SUCCESS,
    payload: posts,
  };
};

export const fetchProfileEditsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_FAIL,
    payload: err,
  };
};

export const changeProfileAvatarRequest = () => {
  return {
    type: ACTION_TYPES.CHANGE_PROFILE_AVATAR_REQUEST,
  };
};

export const changeProfileAvatarSuccess = (posts) => {
  return {
    type: ACTION_TYPES.CHANGE_PROFILE_AVATAR_SUCCESS,
    payload: posts,
  };
};

export const changeProfileAvatarFail = (err) => {
  return {
    type: ACTION_TYPES.CHANGE_PROFILE_AVATAR_FAIL,
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

export const fetchProfileLikesRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_LIKES_REQUEST,
  };
};

export const fetchProfileLikesSuccess = (likes) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_LIKES_SUCCESS,
    payload: likes,
  };
};

export const fetchProfileLikesFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_LIKES_FAIL,
    payload: err,
  };
};
