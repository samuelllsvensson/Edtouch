import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  post: null,
  posts: null,
  comments: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_POST_FAIL:
      return {
        ...state,
        post: null,
        error: action.payload,
      };

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

    case ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_POST_COMMENTS_FAIL:
      return {
        ...state,
        comments: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
