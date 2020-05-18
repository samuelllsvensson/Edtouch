import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  profilePosts: [],
  errors: {},
  loadings: {},
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        profilePosts: action.payload,
      };

    default:
      return state;
  }
};
