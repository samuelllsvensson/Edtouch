import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";

import PostComment from "../components/PostComment";
import Edit from "../components/Edit";
var moment = require("moment");

const Post = (props) => {
  const {
    postsState,
    handleFetchPost,
    handleFetchPostComments,
    handlePostComment,
  } = useContext(Context);

  useEffect(() => {
    if (!postsState.post) handleFetchPost(props.match.params.post_id);
    if (!postsState.comments)
      handleFetchPostComments(props.match.params.post_id);
  }, [
    postsState,
    handleFetchPost,
    handleFetchPostComments,
    props.match.params.post_id,
  ]);

  const [stateLocal, setState] = useState({
    activeTab: "comments",
    comment: "",
  });
  // const handleCommentSubmit = (submitted_comment) => {
  //   if (postsState.comments) {
  //     console.log("hej");
  //     setState({
  //       ...postsState,
  //       comments_arr: [submitted_comment, ...postsState.comments],
  //     });
  //   } else {
  //     setState({ ...postsState, comments: [submitted_comment] });
  //   }
  // };
  const handleSubmit = () => {
    const comment = document.getElementById("postCommentText").value;
    const user_id = postsState.post.user_id;
    const username = postsState.post.username;
    const post_id = postsState.post.post_id;

    const data = {
      comment: comment,
      username: username,
      user_id: user_id,
      post_id: post_id,
    };

    handlePostComment(data);
  };

  function renderTabs() {
    if (stateLocal.activeTab === "comments") {
      if (!postsState.comments) return;
      return postsState.comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="column">
            <PostComment comment={comment} />
          </div>
        );
      });
    } else if (stateLocal.activeTab === "edits") {
      return (
        <div className="column">
          <Edit /> <Edit /> <Edit />
        </div>
      );
    }
  }
  function changeActiveTab() {
    if (stateLocal.activeTab === "comments") {
      document.getElementById("commentTab").parentElement.className = "";
      document.getElementById("editTab").parentElement.className = "is-active";
    } else if (stateLocal.activeTab === "edits") {
      document.getElementById("editTab").parentElement.className = "";
      document.getElementById("commentTab").parentElement.className =
        "is-active";
    }
  }

  function render() {
    console.log(postsState);
    if (postsState.post) {
      return (
        <div className="column is-centered is-half is-offset-one-quarter">
          <h1 className="title">{postsState.post.title}</h1>
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
                  <strong>{postsState.post.name}</strong>{" "}
                  <small>@{postsState.post.username}</small>{" "}
                  <small>
                    {moment(postsState.post.date_created).fromNow().toString()}
                  </small>
                  <br />
                  {postsState.post.body}
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
                    {moment(postsState.post.date_created)
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
                    id="postCommentText"
                    type="textarea"
                    placeholder="Add a comment..."
                    style={{ width: "100%", height: "10vh" }}
                    className="textarea is-primary"
                  ></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <a
                      className="button is-info"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </article>
          {/* -------TABS-------- */}
          <div className="tabs is-centered is-boxed">
            <ul>
              <li className="is-active">
                <a
                  id="commentTab"
                  onClick={() => {
                    changeActiveTab();
                    setState({ ...stateLocal, activeTab: "comments" });
                  }}
                >
                  <span className="icon is-small">
                    <i className="far fa-comments" aria-hidden="true"></i>
                  </span>
                  <span>Comments</span>
                </a>
              </li>
              <li>
                <a
                  id="editTab"
                  onClick={() => {
                    changeActiveTab();
                    setState({ ...stateLocal, activeTab: "edits" });
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-edit" aria-hidden="true"></i>
                  </span>
                  <span>Edits</span>
                </a>
              </li>
            </ul>
          </div>
          {renderTabs()}
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
