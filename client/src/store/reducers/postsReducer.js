import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  posts: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_POSTS_FAIL:
      return {
        ...state,
        posts: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
