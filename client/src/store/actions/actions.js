import * as ACTION_TYPES from "./actionTypes";

export const fetchDbPosts = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_DB_POSTS,
    payload: posts,
  };
};

export const FETCH_DB_POSTS_SUCCESS = {
  type: ACTION_TYPES.FETCH_DB_POSTS_SUCCESS,
};

export const FETCH_DB_POSTS_FAIL = {
  type: ACTION_TYPES.FETCH_DB_POSTS_FAIL,
};
