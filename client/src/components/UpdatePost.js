import React, { useState, useContext } from "react";
import { Image, Transformation } from "cloudinary-react";
import Context from "../utils/context";
var moment = require("moment");

const UpdatePost = ({ post }) => {
  const {
    postsState,
    setIsEdit,
    handleUpdatePost,
    handleDeletePost,
  } = useContext(Context);

  const [values, setValues] = useState({
    title: post.title,
    description: post.body,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (action) => {
    if (action === "savePost") {
      console.log(values);
      console.log(post);
      const postData = {
        title: values.title,
        description: values.description,
        user_id: post.user_id,
        post_id: post.post_id,
        image_id: post.image_id,
        edit_id: post.edit_id,
      };
      console.log("Edit post called");
      handleUpdatePost(postData);
    }
    if (action === "deletePost") {
      const postData = {
        post_id: post.post_id,
      };
      console.log("Delete post called");
      handleDeletePost(postData);
    }
    setIsEdit(-1);
  };
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <Image
            publicId={post.avatar}
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
          <strong>{post.name}</strong> <small>@{post.username}</small>{" "}
          <small>{moment(post.date_created).fromNow().toString()}</small>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                onChange={handleInputChange}
                value={values.title}
                className="input"
                type="text"
                name="title"
              />
            </div>
          </div>
          <br />
          <div className="field">
            <p className="control">
              <textarea
                onChange={handleInputChange}
                value={values.description}
                placeholder=""
                name="description"
                style={{ width: "100%", height: "10vh" }}
                className="textarea is-primary"
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("savePost")}
                  className={`button is-info ${
                    postsState.loadings["UPDATE_POST"] ? "is-loading" : ""
                  }`}
                >
                  Save
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => setIsEdit(-1)}
                  className="button is-info"
                >
                  Cancel
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("deletePost")}
                  className={`button is-small ${
                    postsState.loadings["DELETE_POST"] ? "is-loading" : ""
                  } is-danger`}
                >
                  Delete
                </button>
              </div>
            </div>

            <nav className="level is-mobile">
              <div className="level-right">
                <small>
                  Post created: &nbsp;
                  {moment(post.date_created)
                    .format("h:mm A · MMM D, YYYY")
                    .toString()}
                </small>
              </div>
            </nav>
          </nav>
        </div>
      </div>
    </article>
  );
};

export default UpdatePost;
