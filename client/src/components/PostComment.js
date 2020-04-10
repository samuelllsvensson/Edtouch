import React from "react";
import { Link } from "react-router-dom";
//var moment = require("moment");

const PostComment = (props) => {
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
            <strong>John Smith</strong> <small>@johnsmith</small>{" "}
            <small>
              {/* {moment(stateLocal.post.date_created).fromNow().toString()} */}
              timestamp
            </small>
            <br />
            comment body
            {/* {stateLocal.post.body} */}
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
              timestamp
              {/* {moment(stateLocal.post.date_created)
                .format("h:m A · MMM D, YYYY")
                .toString()} */}
            </small>
          </div>
        </nav>
      </div>
      <div className="media-right">
        <button className="button is-danger is-small is-focused is-rounded is-inverted">
          <span className="icon is-small">
            <i className="fas fa-flag"></i>
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostComment;
