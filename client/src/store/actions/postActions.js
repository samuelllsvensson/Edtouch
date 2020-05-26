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

export const updatePostRequest = () => {
  return {
    type: ACTION_TYPES.UPDATE_POST_REQUEST,
  };
};

export const updatePostSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_POST_SUCCESS,
  };
};

export const updatePostFail = (err) => {
  return {
    type: ACTION_TYPES.UPDATE_POST_FAIL,
    payload: err,
  };
};

export const deletePostSuccess = (post) => {
  return {
    type: ACTION_TYPES.DELETE_POST_SUCCESS,
    payload: post,
  };
};

export const deletePostFail = (err) => {
  return {
    type: ACTION_TYPES.DELETE_POST_FAIL,
    payload: err,
  };
};

export const deletePostRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_POST_REQUEST,
  };
};

export const setPostEditable = (id) => {
  return {
    type: ACTION_TYPES.SET_POST_EDITABLE,
    payload: id,
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

export const setPostCommentEditable = (id) => {
  return {
    type: ACTION_TYPES.SET_POST_COMMENT_EDITABLE,
    payload: id,
  };
};
