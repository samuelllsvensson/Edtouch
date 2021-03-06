import React, { useContext } from "react";
import Context from "../utils/context";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

/**
 * The post comment displays the commenting user's profile info as well as the comment on the post.
 * These are shown when clicking a specific post in the bottom.
 */
const PostComment = ({ comment }) => {
  const { setEditablePostComment, authState } = useContext(Context);

  function renderEditButton() {
    if (
      authState.dbProfile &&
      comment.username === authState.dbProfile.username
    ) {
      return (
        <button
          onClick={() => setEditablePostComment(comment.comment_id)}
          className="button is-small"
        >
          <span className="icon is-small">
            <i className="far fa-edit"></i>
          </span>
        </button>
      );
    }
  }

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
          <p>
            <strong>{comment.name}</strong> <small>@{comment.username}</small>{" "}
            <small>{moment(comment.date_created).fromNow().toString()}</small>
            <br />
            {comment.body}
            <br />
            <small>
              {moment(comment.date_created)
                .format("h:mm A · MMM D, YYYY")
                .toString()}
            </small>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-right"></div>
        </nav>
      </div>
      <div className="media-right">{renderEditButton()}</div>
    </article>
  );
};

export default PostComment;
