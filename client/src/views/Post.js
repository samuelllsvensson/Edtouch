import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";
import axios from "axios";

import PostComment from "../components/PostComment";
import Edit from "../components/Edit";
var moment = require("moment");

const Post = (props) => {
  const context = useContext(Context);

  const [stateLocal, setState] = useState({ post: null });

  useEffect(() => {
    if (!stateLocal.post) {
      axios
        .get(`/api/get/post/${props.match.params.post_id}`)
        .then((res) => {
          setState({
            ...stateLocal,
            post: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [context, stateLocal, props.match.params.post_id]);

  function renderTabs(value) {
    if (value === "comments") {
      return (
        <div className="column">
          <PostComment />
          <PostComment />
          <PostComment />
        </div>
      );
    } else if (value === "edits") {
      return (
        <div className="column">
          <Edit /> <Edit /> <Edit />
        </div>
      );
    }
  }
  function render() {
    console.log(stateLocal);
    if (stateLocal.post) {
      return (
        <div className="column is-centered is-half is-offset-one-quarter">
          <h1 className="title">{stateLocal.post.title}</h1>
          <figure className="image is-16by9">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder"
            />
          </figure>
          <br />
          {/* -------POST INFO-------- */}
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
                    {moment(stateLocal.post.date_created).fromNow().toString()}
                  </small>
                  <br />
                  {stateLocal.post.body}
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
                    {moment(stateLocal.post.date_created)
                      .format("h:m A · MMM D, YYYY")
                      .toString()}
                  </small>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <span className="tag is-primary">Art</span>
            </div>
          </article>
          {/* -------ADD COMMENT-------- */}
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
              <div className="field">
                <p className="control">
                  <textarea
                    type="textarea"
                    placeholder="Add a comment..."
                    style={{ width: "100%", height: "10vh" }}
                  ></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <a className="button is-info">Submit</a>
                  </div>
                </div>
              </nav>
            </div>
          </article>
          {/* -------TABS-------- */}
          <div className="tabs is-centered is-boxed">
            <ul>
              <li className="is-active">
                <a onClick={() => renderTabs("comments")}>
                  <span className="icon is-small">
                    <i className="far fa-comments" aria-hidden="true"></i>
                  </span>
                  <span>Comments</span>
                </a>
              </li>
              <li>
                <a onClick={() => renderTabs("edits")}>
                  <span className="icon is-small">
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </span>
                  <span>Edits</span>
                </a>
              </li>
            </ul>
          </div>
          {renderTabs("edits")}
        </div>
      );
    } else {
      return (
        <progress className="progress is-primary" max="100">
          Loading
        </progress>
      );
    }
  }
  return (
    <div className="container is-fluid">
      <div className="columns">{render()}</div>
    </div>
  );
};

export default Post;
