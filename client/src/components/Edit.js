import React from "react";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

const Edit = ({ edit, onChange, displayEdit }) => {
  console.log(edit);
  function handleChange() {
    onChange(!displayEdit);
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        style={{ opacity: 0.2 }}
        onClick={handleChange}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{edit.title}</p>
          <button
            className="delete is-large"
            aria-label="close"
            onClick={handleChange}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div className="card-image">
              <figure className="image is-4by3">
                <Image publicId={edit.image_id}></Image>
              </figure>
            </div>
          </div>

          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <Image publicId={edit.avatar}></Image>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <p className="subtitle is-6">@{edit.username}</p>
                  {edit.body}
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
                    <span className="icon is-small">
                      <i className="fas fa-minus"></i>
                    </span>
                  </div>
                  <div className="level-item">
                    <button
                      className="button is-small is-danger"
                      // onClick={() => handleSubmit()}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="level-right">
                  <small>
                    {moment(edit.date_created).fromNow().toString()}
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
          {/* Add edit comment */}
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
                    <button
                      className="button is-info"
                      // onClick={() => handleSubmit()}
                    >
                      Submit
                    </button>
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
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Placeholder"
                />
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
