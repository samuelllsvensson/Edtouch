import React, { useContext, useState } from "react";
import Context from "../utils/context";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

/**
 * The update edit comment component is rendered whenever the user clicks the edit button on an edit comment.
 * This renders a new form for the user to enter new data which will update the current edit comment.
 */
const UpdateEditComment = ({ comment }) => {
  const {
    postsState,
    handleUpdateEditComment,
    handleDeleteEditComment,
    setEditableEditComment,
  } = useContext(Context);

  const [value, setValue] = useState({ edit_comment: comment.body });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (action) => {
    if (action === "saveEditComment") {
      const user_id = postsState.post.user_id;
      const editCommentData = {
        comment: value,
        username: comment.username,
        user_id: user_id,
        edit_id: comment.edit_id,
        comment_id: comment.edit_comment_id,
      };
      handleUpdateEditComment(editCommentData);
    }
    if (action === "deleteEditComment") {
      const commentData = {
        edit_id: comment.edit_id,
        edit_comment_id: comment.edit_comment_id,
      };

      handleDeleteEditComment(commentData);
    }
    setEditableEditComment(-1);
  };
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <Image
            publicId={comment.avatar}
            dpr="auto"
            responsive
            width="auto"
            crop="scale"
            responsiveUseBreakpoints="true"
          >
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <strong>{comment.name}</strong> <small>@{comment.username}</small>{" "}
          <small>{moment(comment.date_created).fromNow().toString()}</small>
          <br />
          <div className="field">
            <p className="control">
              <textarea
                onChange={handleChange}
                value={value.edit_comment}
                placeholder=""
                style={{ width: "100%", height: "10vh" }}
                className="textarea is-primary"
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("saveEditComment")}
                  className={`button is-info ${
                    postsState.loadings["UPDATE_EDIT_COMMENT"]
                      ? "is-loading"
                      : ""
                  }`}
                >
                  Save
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => setEditableEditComment(-1)}
                  className="button is-info"
                >
                  Cancel
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("deleteEditComment")}
                  className={`button is-small ${
                    postsState.loadings["DELETE_EDIT_COMMENT"]
                      ? "is-loading"
                      : ""
                  } is-danger`}
                >
                  Delete
                </button>
              </div>
            </div>

            <nav className="level is-mobile">
              <div className="level-right">
                <small>
                  &nbsp;
                  {moment(comment.date_created)
                    .format("h:mm A · MMM D, YYYY")
                    .toString()}
                </small>
              </div>
            </nav>
          </nav>
        </div>
      </div>
    </article>
  );
};

export default UpdateEditComment;
