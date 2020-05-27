import * as ACTION_TYPES from "./actionTypes";
// Edits
export const fetchEditSuccess = (edit) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_SUCCESS,
    payload: edit,
  };
};

export const fetchEditFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_FAIL,
    payload: err,
  };
};

export const fetchEditsRequest = () => {
  return {
    type: ACTION_TYPES.FETCH_EDITS_REQUEST,
  };
};

export const fetchEditsSuccess = (edits) => {
  return {
    type: ACTION_TYPES.FETCH_EDITS_SUCCESS,
    payload: edits,
  };
};

export const fetchEditsFail = (err) => {
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

export const setEditEditable = (id) => {
  return {
    type: ACTION_TYPES.SET_EDIT_EDITABLE,
    payload: id,
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

// Edit comments
export const fetchEditCommentsSuccess = (edit_comments) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_COMMENTS_SUCCESS,
    payload: edit_comments,
  };
};

export const fetchEditCommentsFail = (err) => {
  return {
    type: ACTION_TYPES.FETCH_EDIT_COMMENTS_FAIL,
    payload: err,
  };
};

export const submitEditCommentRequest = () => {
  return {
    type: ACTION_TYPES.SUBMIT_EDIT_COMMENT_REQUEST,
  };
};

export const submitEditCommentSuccess = () => {
  return {
    type: ACTION_TYPES.SUBMIT_EDIT_COMMENT_SUCCESS,
  };
};

export const submitEditCommentFail = (err) => {
  return {
    type: ACTION_TYPES.SUBMIT_EDIT_COMMENT_FAIL,
    payload: err,
  };
};

export const updateEditCommentRequest = () => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_COMMENT_REQUEST,
  };
};

export const updateEditCommentSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_COMMENT_SUCCESS,
  };
};

export const updateEditCommentFail = (err) => {
  return {
    type: ACTION_TYPES.UPDATE_EDIT_COMMENT_FAIL,
    payload: err,
  };
};

export const deleteEditCommentRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_COMMENT_REQUEST,
  };
};

export const deleteEditCommentSuccess = () => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_COMMENT_SUCCESS,
  };
};

export const deleteEditCommentFail = (err) => {
  return {
    type: ACTION_TYPES.DELETE_EDIT_COMMENT_FAIL,
    payload: err,
  };
};

export const setEditCommentEditable = (id) => {
  return {
    type: ACTION_TYPES.SET_EDIT_COMMENT_EDITABLE,
    payload: id,
  };
};
