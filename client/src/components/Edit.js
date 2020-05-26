import React, { useContext, useState, useEffect } from "react";
import Context from "../utils/context";
import { Image, Transformation } from "cloudinary-react";
import EditComment from "../components/EditComment";
import UpdateEditComment from "../components/UpdateEditComment";
import UpdateEdit from "../components/UpdateEdit";
import moment from "moment";

const Edit = ({ edit, onChange, displayEdit }) => {
  const {
    postsState,
    authState,
    handleFetchEditComments,
    handleEditComment,
    handleLikeEdit,
    handleUnlikeEdit,
    setEditableEdit,
  } = useContext(Context);
  function closeModal() {
    onChange(!displayEdit);
  }

  useEffect(() => {
    handleFetchEditComments(edit.edit_id);
  }, []);
  function renderLikeButton() {
    if (
      authState.authenticated &&
      authState.dbProfile &&
      !edit.likes_users.includes(authState.dbProfile.user_id)
    ) {
      return (
        <div className="level-left">
          <div className="level-item">
            <span onClick={() => like()} className="icon is-small">
              <i className="far fa-heart"></i>
            </span>
          </div>
          <div className="level-item">
            <strong>{edit.likes}</strong>
          </div>
        </div>
      );
    }

    return (
      <div style={{ color: "#b71c1c" }} className="level-left">
        <div className="level-item">
          <span
            key={Math.random()}
            onClick={() => unlike()}
            className="icon is-small"
          >
            <i className="fas fa-heart"></i>
          </span>
        </div>
        <div className="level-item">
          <strong>{edit.likes}</strong>
        </div>
      </div>
    );
  }

  function like() {
    const data = {
      edit_id: edit.edit_id,
      post_id: postsState.post.post_id,
      user_id: authState.dbProfile.user_id,
    };
    handleLikeEdit(data);
  }

  function unlike() {
    const data = {
      edit_id: edit.edit_id,
      post_id: postsState.post.post_id,
      user_id: authState.dbProfile.user_id,
    };
    handleUnlikeEdit(data);
  }

  const [editComment, setEditComment] = useState("");

  const onEditCommentChange = (e) => {
    const { value } = e.target;
    setEditComment(value);
  };

  const onEditCommentSubmit = (e) => {
    e.preventDefault();
    const user_id = authState.dbProfile.user_id;
    const username = authState.dbProfile.username;
    const edit_id = edit.edit_id;
    const editCommentData = {
      comment: editComment,
      username: username,
      user_id: user_id,
      edit_id: edit_id,
    };
    handleEditComment(editCommentData);
    setEditComment("");
  };

  function renderAddEditComment() {
    if (!authState.authenticated || !authState.dbProfile) return;
    return (
      <form onSubmit={onEditCommentSubmit}>
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
                  onChange={onEditCommentChange}
                  value={editComment}
                  placeholder="Add an edit comment..."
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
                      postsState.loadings["SUBMIT_EDIT_COMMENT"]
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
    );
  }

  function renderEditComments() {
    if (!postsState.edit_comments) {
      console.log("hej");
      return (
        <div className="column is-two-thirds is-offset-2">
          <hr />
          <div style={{ textAlign: "center" }}>
            There are no edit comments on this edit yet
          </div>
        </div>
      );
    }
    return postsState.edit_comments.map((edit_comment) => {
      return (
        <div key={edit_comment.edit_comment_id} className="column">
          {postsState.isEditCommentEditable !== edit_comment.edit_comment_id ? (
            <EditComment comment={edit_comment} />
          ) : (
            <UpdateEditComment comment={edit_comment} />
          )}
        </div>
      );
    });
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        style={{ opacity: 0.2 }}
        onClick={closeModal}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button
            className="delete is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div className="card-image">
              <figure className="image is-4by3">
                <Image
                  publicId={edit.image_id}
                  dpr="auto"
                  responsive
                  width="auto"
                  crop="scale"
                  responsiveUseBreakpoints="true"
                >
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
              </figure>
            </div>
          </div>

          {postsState.isEditEditable !== edit.edit_id ? (
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <Image
                    publicId={edit.avatar}
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
                  <p className="subtitle is-6">@{edit.username}</p>
                  {edit.body}
                </div>
                <nav className="level is-mobile">
                  {renderLikeButton()}
                  <div className="level-right">
                    <small>
                      {moment(edit.date_created).fromNow().toString()}
                    </small>
                  </div>
                </nav>
              </div>
              <div className="media-right">
                <button
                  onClick={() => setEditableEdit(edit.edit_id)}
                  className="button is-small"
                >
                  <span className="icon is-small">
                    <i className="far fa-edit"></i>
                  </span>
                </button>
              </div>
            </article>
          ) : (
            <UpdateEdit edit={edit} closeModal={closeModal} />
          )}
          <div className="tabs is-centered is-boxed">
            <ul>
              <li className="is-active">
                <a id="commentTab">
                  <span className="icon is-small">
                    <i className="far fa-comments" aria-hidden="true"></i>
                  </span>
                  <span>Edit comments</span>
                </a>
              </li>
            </ul>
          </div>
          {renderAddEditComment()}
          {renderEditComments()}
        </section>
      </div>
    </div>
  );
};

export default Edit;
