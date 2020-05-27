import * as ACTION_TYPES from "../actions/actionTypes";

export const initialState = {
  post: null,
  posts: [],
  post_comments: null,
  edit: null,
  edits: [],
  edit_comments: null,
  errors: {},
  loadings: {},
  isPostEditable: -1,
  isEditEditable: -1,
  isPostCommentEditable: -1,
  isEditCommentEditable: -1,
};

/**
 * Reducer for handling all of the post associated states
 */
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

    case ACTION_TYPES.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isPostEditable: -1,
      };
    case ACTION_TYPES.SET_POST_EDITABLE:
      return {
        ...state,
        isPostEditable: action.payload,
      };

    // Post comments
    case ACTION_TYPES.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        post_comments: action.payload,
      };

    case ACTION_TYPES.UPDATE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        isPostCommentEditable: -1,
      };

    case ACTION_TYPES.SET_POST_COMMENT_EDITABLE:
      return {
        ...state,
        isPostCommentEditable: action.payload,
      };

    // Edits
    case ACTION_TYPES.FETCH_EDITS_SUCCESS:
      return {
        ...state,
        edits: action.payload,
      };

    case ACTION_TYPES.FETCH_EDIT_SUCCESS:
      return {
        ...state,
        edit: action.payload,
      };

    case ACTION_TYPES.UPDATE_EDIT_SUCCESS:
      return {
        ...state,
        isEditEditable: -1,
      };

    case ACTION_TYPES.SET_EDIT_EDITABLE:
      return {
        ...state,
        isEditEditable: action.payload,
      };

    // Edit comments
    case ACTION_TYPES.FETCH_EDIT_COMMENTS_SUCCESS:
      return {
        ...state,
        edit_comments: action.payload,
      };

    case ACTION_TYPES.UPDATE_EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        isEditCommentEditable: -1,
      };

    case ACTION_TYPES.SET_EDIT_COMMENT_EDITABLE:
      return {
        ...state,
        isEditCommentEditable: action.payload,
      };

    default:
      return state;
  }
};
