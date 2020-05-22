import * as ACTION_TYPES from "./actionTypes";
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
