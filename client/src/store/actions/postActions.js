import * as ACTION_TYPES from "./actionTypes";

// Posts
export const fetchPostSuccess = (post) => {
  return {
    type: ACTION_TYPES.FETCH_POST_SUCCESS,
    payload: post,
  };
};

export const fetchPostFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_POST_FAIL,
    payload: err,
  };
};

export const fetchPostsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchPostsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_POSTS_FAIL,
    payload: err,
  };
};

export const addPostSuccess = (post) => {
  return {
    type: ACTION_TYPES.ADD_POST_SUCCESS,
    payload: post,
  };
};

export const addPostFail = (err) => {
  return {
    type: ACTION_TYPES.ADD_POST_FAIL,
    payload: err,
  };
};

// Post comments
export const fetchPostCommentsSuccess = (comments) => {
  return {
    type: ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const fetchPostCommentsFail = (err) => {
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