import React, { useContext, useEffect } from "react";
import Context from "../utils/context";
var moment = require("moment");

const EditComment = ({ comment, resetCallback }) => {
  const { postsState, handleEditComment } = useContext(Context);

  const handleSubmit = () => {
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

    handleEditComment(commentData);
    resetCallback();
  };
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Placeholder"
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{comment.name}</strong> <small>@{comment.username}</small>{" "}
            <small>{moment(comment.date_created).fromNow().toString()}</small>
            <br />
            <div className="field">
              <p className="control">
                <textarea
                  id="editCommentText"
                  type="textarea"
                  placeholder=""
                  style={{ width: "100%", height: "10vh" }}
                  className="textarea is-primary"
                >
                  {comment.body}
                </textarea>
              </p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <button
                    onClick={() => handleSubmit()}
                    className="button is-info"
                  >
                    Save
                  </button>
                </div>
                <div className="level-item">
                  <button
                    onClick={() => resetCallback()}
                    className="button is-info"
                  >
                    Cancel
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
          </p>
        </div>
      </div>
    </article>
  );
};

export default EditComment;
