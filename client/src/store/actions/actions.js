import * as ACTION_TYPES from "./actionTypes";

// Posts
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

export const fetchDbProfilePostsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_REQUEST,
  };
};

export const fetchDbProfilePostsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchDbProfilePostsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_POSTS_FAIL,
    payload: err,
  };
};

export const fetchDbProfileEditsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_REQUEST,
  };
};

export const fetchDbProfileEditsSuccess = (posts) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_SUCCESS,
    payload: posts,
  };
};

export const fetchDbProfileEditsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_EDITS_FAIL,
    payload: err,
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

// Post comments
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

// Edits
export const fetchDbEditSuccess = (edit) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_SUCCESS,
    payload: edit,
  };
};

export const fetchDbEditFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_FAIL,
    payload: err,
  };
};

export const fetchDbEditsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_EDITS_REQUEST,
  };
};

export const fetchDbEditsSuccess = (edits) => {
  return {
    type: ACTION_TYPES.FETCH_EDITS_SUCCESS,
    payload: edits,
  };
};

export const fetchDbEditsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_EDITS_FAIL,
    payload: err,
  };
};

export const addEditSuccess = (edit) => {
  return {
    type: ACTION_TYPES.ADD_EDIT_SUCCESS,
    payload: edit,
  };
};

export const addEditFail = (err) => {
  return {
    type: ACTION_TYPES.ADD_EDIT_FAIL,
    payload: err,
  };
};

export const deleteEditSuccess = (edit) => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_SUCCESS,
    payload: edit,
  };
};

export const deleteEditFail = (err) => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_FAIL,
    payload: err,
  };
};

export const deleteEditRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_REQUEST,
  };
};

export const updateEditRequest = () => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_REQUEST,
  };
};

export const updateEditSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_SUCCESS,
  };
};

export const updateEditFail = (err) => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_FAIL,
    payload: err,
  };
};

export const likeEditRequest = () => {
  return {
    type: ACTION_TYPES.LIKE_EDIT_REQUEST,
  };
};

export const likeEditSuccess = () => {
  return {
    type: ACTION_TYPES.LIKE_EDIT_SUCCESS,
  };
};

export const likeEditFail = (err) => {
  return {
    type: ACTION_TYPES.LIKE_EDIT_FAIL,
    payload: err,
  };
};

export const unlikeEditRequest = () => {
  return {
    type: ACTION_TYPES.UNLIKE_EDIT_REQUEST,
  };
};

export const unlikeEditSuccess = () => {
  return {
    type: ACTION_TYPES.UNLIKE_EDIT_SUCCESS,
  };
};

export const unlikeEditFail = (err) => {
  return {
    type: ACTION_TYPES.UNLIKE_EDIT_FAIL,
    payload: err,
  };
};

// Auth
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
