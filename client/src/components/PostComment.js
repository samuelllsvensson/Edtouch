import React from "react";
import { Link } from "react-router-dom";
var moment = require("moment");

const PostComment = ({ comment }) => {
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
            {comment.body}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <Link to="#" className="level-item">
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </Link>
            <Link to="#" className="level-item">
              <span className="icon is-small">
                <i className="fas fa-minus"></i>
              </span>
            </Link>
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
        <button className="button is-small">
          <span className="icon is-small">
            <i className="far fa-edit"></i>
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostComment;
