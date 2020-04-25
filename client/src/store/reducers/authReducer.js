import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  authenticated: false,
  profile: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
      };
    case ACTION_TYPES.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ACTION_TYPES.REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
