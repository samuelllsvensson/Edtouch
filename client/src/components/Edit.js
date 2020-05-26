import React, { useContext } from "react";
import Context from "../utils/context";
import { Image, Transformation } from "cloudinary-react";
import UpdateEdit from "../components/UpdateEdit";
import moment from "moment";

const Edit = ({ edit, onChange, displayEdit }) => {
  const {
    setIsEdit,
    postsState,
    authState,
    handleLikeEdit,
    handleUnlikeEdit,
  } = useContext(Context);
  function closeModal() {
    onChange(!displayEdit);
  }

  function renderLikeButton() {
    if (
      authState.authenticated &&
      authState.dbProfile &&
      !edit.likes_users.includes(authState.dbProfile.user_id)
    ) {
      return (
        <div className="level-left">
          <div className="level-item">
            <span
              onClick={() => like()}
              className="icon is-small"
              style={{ cursor: "pointer" }}
              key={Math.random()}
            >
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
            style={{ cursor: "pointer" }}
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

          {postsState.isEdit !== edit.edit_id ? (
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
              {authState.dbProfile &&
              authState.dbProfile.user_id === edit.user_id ? (
                <div className="media-right">
                  <button
                    onClick={() => setIsEdit(edit.edit_id)}
                    className="button is-small"
                  >
                    <span className="icon is-small">
                      <i className="far fa-edit"></i>
                    </span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </article>
          ) : (
            <UpdateEdit edit={edit} closeModal={closeModal} />
          )}

          {/* Add edit comment */}
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
                    <button className="button is-info">Submit</button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
          <div className="tabs is-centered is-boxed">
            <ul>
              <li className="is-active">
                <a
                  id="commentTab"
                  onClick={() => {
                    // changeActiveTab();
                    // setState({ ...stateLocal, activeTab: "comments" });
                  }}
                >
                  <span className="icon is-small">
                    <i className="far fa-comments" aria-hidden="true"></i>
                  </span>
                  <span>Comments</span>
                </a>
              </li>
            </ul>
          </div>
          {/* {renderTabs()} */}
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
                <p>
                  <strong>name</strong> {/*  {comment.name} */}
                  <small>@username</small> {/* {comment.username} */}
                  <small>
                    timestamp
                    {/* {moment(comment.date_created).fromNow().toString()} */}
                  </small>
                  <br />
                  comment body text
                  {/* {comment.body} */}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-right">
                  <small>
                    {/* {moment(comment.date_created)
                .format("h:mm A · MMM D, YYYY")
                .toString()} */}
                  </small>
                </div>
              </nav>
            </div>
            <div className="media-right">
              <button
                // onClick={() => setIsEdit(comment.comment_id)}
                className="button is-small"
              >
                <span className="icon is-small">
                  <i className="far fa-edit"></i>
                </span>
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Edit;
