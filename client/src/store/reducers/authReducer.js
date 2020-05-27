import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  authenticated: false,
  profile: null,
  dbProfile: null,
};

/**
 * Reducer for handling all of the authentication associated states
 */
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
      };
    case ACTION_TYPES.ADD_A0_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ACTION_TYPES.ADD_DB_PROFILE:
      return {
        ...state,
        dbProfile: action.payload,
      };
    case ACTION_TYPES.REMOVE_A0_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
