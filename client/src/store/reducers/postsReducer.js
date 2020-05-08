import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  post: null,
  posts: [],
  comments: null,
  edits: [],
  errors: {},
  loadings: {},
  isEdit: -1,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Posts
    case ACTION_TYPES.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
      };

    case ACTION_TYPES.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };

    // Post comments
    case ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };

    case ACTION_TYPES.SET_COMMENT_EDITABLE:
      return {
        ...state,
        isEdit: action.payload,
      };

    case ACTION_TYPES.UPDATE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        isEdit: -1,
      };

    case ACTION_TYPES.FETCH_EDITS_SUCCESS:
      return {
        ...state,
        edits: action.payload,
      };

    default:
      return state;
  }
};
