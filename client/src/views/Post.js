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
import queryString from "query-string";
import { Link } from "react-router-dom";
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

  const { showedit } = queryString.parse(props.location.search);

  const [stateLocal, setState] = useState({
    activeTab: showedit ? "edits" : "comments",
    displayEdit: showedit ? true : false,
    clickedEdit: showedit ? parseInt(showedit) : -1,
    showAddEdit: false,
  });

  const [postComment, setPostComment] = useState("");
  const onCommentChange = (e) => {
    const { value } = e.target;
    setPostComment(value);
  };

  const onPostCommentSubmit = (e) => {
    // Prevents GET request/page refresh on submit
    e.preventDefault();
    const user_id = authState.dbProfile.user_id;
    const username = authState.dbProfile.username;
    const post_id = postsState.post.post_id;
    const commentData = {
      comment: postComment,
      username: username,
      user_id,
      post_id,
    };
    handlePostComment(commentData);
    setPostComment("");
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
          <div
            key={comment.comment_id}
            className="column is-6 is-offset-one-quarter"
          >
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
              <Link to={`?showedit=1`}>
                <div
                  style={{ padding: 0 }}
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
              </Link>
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
            <Link to={`?showedit=${edit.edit_id}`}>
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
            </Link>
          </div>
        );
      });
    }
  }

  function renderAddComment() {
    if (!authState.authenticated || !authState.dbProfile) return;
    return (
      <div className="column is-centered is-6 is-offset-one-quarter">
        <form onSubmit={onPostCommentSubmit}>
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
                    type="textarea"
                    onChange={onCommentChange}
                    value={postComment}
                    placeholder="Add a comment..."
                    className="textarea is-primary"
                  ></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button
                      type="submit"
                      className={`button is-info ${
                        postsState.loadings["SUBMIT_POST_COMMENT"]
                          ? "is-loading"
                          : ""
                      }`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </form>
      </div>
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

  function render() {
    if (postsState.post) {
      return (
        <div className="column is-centered is-half is-offset-one-quarter">
          <h1 className="title">{postsState.post.title}</h1>
          <figure className="image is-16by9">
            <Image
              publicId={postsState.post.image_id}
              dpr="auto"
              responsive
              width="auto"
              crop="scale"
              responsiveUseBreakpoints="true"
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </figure>
          <br />
          {/* -------POST INFO-------- */}
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Image
                  publicId={postsState.post.avatar}
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
                  <strong>{postsState.post.name}</strong>{" "}
                  <small>@{postsState.post.username}</small>{" "}
                  <small>
                    {moment(postsState.post.date_created).fromNow().toString()}
                  </small>
                  <br />
                  {postsState.post.body}
                </p>
              </div>
              <nav className="level is-mobile"></nav>
            </div>
            <div className="media-right">
              <span className="tag is-primary">Art</span>
            </div>
          </article>
          {/* -------TABS-------- */}
          <div className="tabs is-centered is-boxed">
            <ul>
              <li
                className={
                  stateLocal.activeTab === "comments" ? "is-active" : ""
                }
              >
                <a
                  id="commentTab"
                  onClick={() => {
                    setState({ ...stateLocal, activeTab: "comments" });
                  }}
                >
                  <span className="icon is-small">
                    <i className="far fa-comments" aria-hidden="true"></i>
                  </span>
                  <span>Comments</span>
                </a>
              </li>
              <li
                className={stateLocal.activeTab === "edits" ? "is-active" : ""}
              >
                <a
                  id="editTab"
                  onClick={() => {
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
