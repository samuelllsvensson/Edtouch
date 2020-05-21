import React, { useContext } from "react";
import Context from "../utils/context";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

const PostComment = ({ comment }) => {
  const { setIsEdit } = useContext(Context);
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <Image publicId={comment.avatar} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{comment.name}</strong> <small>@{comment.username}</small>{" "}
            <small>{moment(comment.date_created).fromNow().toString()}</small>
            <br />
            {comment.body}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <div className="level-item">
              <b>0</b>
            </div>
          </div>
          <div className="level-right">
            <small>
              {moment(comment.date_created)
                .format("h:mm A · MMM D, YYYY")
                .toString()}
            </small>
          </div>
        </nav>
      </div>
      <div className="media-right">
        <button
          onClick={() => setIsEdit(comment.comment_id)}
          className="button is-small"
        >
          <span className="icon is-small">
            <i className="far fa-edit"></i>
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostComment;
