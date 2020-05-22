import React, { useContext } from "react";
import Context from "../utils/context";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

const UpdatePostComment = ({ comment }) => {
  const {
    postsState,
    handleUpdatePostComment,
    handleDeleteComment,
    setIsEdit,
  } = useContext(Context);

  const handleSubmit = (action) => {
    if (action === "saveComment") {
      const editedComment = document.getElementById("editCommentText").value;
      const post_id = postsState.post.post_id;
      const user_id = postsState.post.user_id;
      const commentData = {
        comment: editedComment,
        username: comment.username,
        user_id: user_id,
        post_id: post_id,
        comment_id: comment.comment_id,
      };

      handleUpdatePostComment(commentData);
    }
    if (action === "deleteComment") {
      const post_id = postsState.post.post_id;
      const commentData = {
        post_id: post_id,
        comment_id: comment.comment_id,
      };

      handleDeleteComment(commentData);
    }
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
                id="editCommentText"
                type="textarea"
                placeholder=""
                defaultValue={comment.body}
                style={{ width: "100%", height: "10vh" }}
                className="textarea is-primary"
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("saveComment")}
                  className={`button is-info ${
                    postsState.loadings["UPDATE_POST_COMMENT"]
                      ? "is-loading"
                      : ""
                  }`}
                >
                  Save
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => setIsEdit(-1)}
                  className="button is-info"
                >
                  Cancel
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("deleteComment")}
                  className={`button is-small ${
                    postsState.loadings["DELETE_POST_COMMENT"]
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
                  Comment created: &nbsp;
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

export default UpdatePostComment;
