// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { Image, Transformation } from "cloudinary-react";
import Context from "../utils/context";
import PostComment from "../components/PostComment";
import UpdatePostComment from "../components/UpdatePostComment";
import Edit from "../components/Edit";
import EditCard from "../components/EditCard";
import AddEdit from "../components/AddEdit";
import axios from "axios";

const Post = (props) => {
  const {
    postsState,
    handleFetchPost,
    handleFetchPostComments,
    handlePostComment,
    handleFetchEdit,
    handleFetchEdits,
    authState,
  } = useContext(Context);

  useEffect(() => {
    handleFetchPost(props.match.params.post_id);
    handleFetchEdits(props.match.params.post_id);
    handleFetchPostComments(props.match.params.post_id);
  }, []);

  const [stateLocal, setState] = useState({
    activeTab: "comments",
    comment: "",
    displayEdit: false,
    clickedEdit: -1,
    showAddEdit: false,
  });

  const handleSubmit = () => {
    const comment = document.getElementById("postCommentText").value;
    const user_id = authState.dbProfile.user_id;
    const username = authState.dbProfile.username;
    const post_id = postsState.post.post_id;
    const commentData = {
      comment: comment,
      username: username,
      user_id,
      post_id,
    };
    handlePostComment(commentData);
  };

  function handleChange() {
    setState({
      ...stateLocal,
      displayEdit: !stateLocal.displayEdit,
      clickedEdit: -1,
    });
  }
  function handleAddEditChange() {
    setState({
      ...stateLocal,
      showAddEdit: !stateLocal.showAddEdit,
    });
  }

  function renderTabs() {
    if (stateLocal.activeTab === "comments") {
      if (!postsState.comments) return;

      return postsState.comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="column">
            {postsState.isEdit !== comment.comment_id ? (
              <PostComment comment={comment} />
            ) : (
              <UpdatePostComment comment={comment} />
            )}
          </div>
        );
      });
    } else if (stateLocal.activeTab === "edits") {
      if (stateLocal.displayEdit) {
        return postsState.edits.map((edit) => {
          let res = postsState.edits.find(
            (edit) => edit.edit_id === stateLocal.clickedEdit
          );
          return (
            <div key={edit.edit_id} className="column is-one-third">
              <div
                style={{ padding: 0, cursor: "pointer" }}
                className="box"
                onClick={() => {
                  const data = {
                    post_id: edit.post_id,
                    edit_id: edit.edit_id,
                  };
                  handleFetchEdit(data);
                  setState({
                    ...stateLocal,
                    displayEdit: !stateLocal.displayEdit,
                    clickedEdit: edit.edit_id,
                  });
                }}
              >
                <EditCard edit={edit} />
              </div>
              <Edit
                edit={res}
                onChange={handleChange}
                displayEdit={stateLocal.displayEdit}
              />
            </div>
          );
        });
      }
      // Render edit cards behind modal
      return postsState.edits.map((edit) => {
        return (
          <div key={edit.edit_id} className="column is-one-third">
            <div
              style={{ padding: 0, cursor: "pointer" }}
              className="box"
              onClick={() => {
                const data = {
                  post_id: edit.post_id,
                  edit_id: edit.edit_id,
                };
                handleFetchEdit(data);
                setState({
                  ...stateLocal,
                  displayEdit: !stateLocal.displayEdit,
                  clickedEdit: edit.edit_id,
                });
              }}
            >
              <EditCard edit={edit} />
            </div>
          </div>
        );
      });
    }
  }

  function renderAddComment() {
    if (!authState.authenticated || !authState.dbProfile) return;
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <Image publicId={authState.dbProfile.avatar} />
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
                <button
                  className={`button is-info ${
                    postsState.loadings["SUBMIT_POST_COMMENT"]
                      ? "is-loading"
                      : ""
                  }`}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </nav>
        </div>
      </article>
    );
  }

  function renderAddEdit() {
    if (!authState.authenticated) return;
    if (stateLocal.clickedEdit === -1) {
      if (stateLocal.showAddEdit) {
        return (
          <div className="columns is-centered">
            <AddEdit
              post_id={props.match.params.post_id}
              onChange={handleAddEditChange}
              showAddEdit={stateLocal.showAddEdit}
            />
            <button
              onClick={() => {
                setState({
                  ...stateLocal,
                  showAddEdit: !stateLocal.showAddEdit,
                });
              }}
              className="button is-info"
            >
              Hide
            </button>
          </div>
        );
      } else {
        return (
          <div className="columns is-centered">
            <button
              onClick={() => {
                setState({
                  ...stateLocal,
                  showAddEdit: !stateLocal.showAddEdit,
                });
              }}
              className="button is-info"
            >
              Add Edit
            </button>
          </div>
        );
      }
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

  function upvote() {
    // Just for test. Should be in contextStateConfig
    axios.put(`/api/put/post/${postsState.post.post_id}/like`, {
      userId: authState.dbProfile.user_id,
    });
  }

  function render() {
    if (postsState.post) {
      return (
        <div className="column is-centered is-half is-offset-one-quarter">
          <h1 className="title">{postsState.post.title}</h1>
          <figure className="image is-16by9">
            <Image publicId={postsState.post.image_id}></Image>
          </figure>
          <br />
          {/* -------POST INFO-------- */}
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Image publicId={postsState.post.avatar} />
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
                  <div className="level-item">
                    <span onClick={() => upvote()} className="icon is-small">
                      <i className="fas fa-plus"></i>
                    </span>
                  </div>
                  <div className="level-item">
                    <b>{postsState.post.likes}</b>
                  </div>
                </div>
                <div className="level-right">
                  <small>
                    {moment(postsState.post.date_created)
                      .format("h:mm A · MMM D, YYYY")
                      .toString()}
                  </small>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <span className="tag is-primary">Art</span>
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
          {stateLocal.activeTab === "comments"
            ? renderAddComment()
            : renderAddEdit()}
          <div className="columns is-multiline">{renderTabs()}</div>
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
