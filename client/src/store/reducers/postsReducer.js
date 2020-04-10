import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  posts: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DB_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};
