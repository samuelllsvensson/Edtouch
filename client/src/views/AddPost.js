import React, { useState, useContext } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../utils/CloudinaryService";
import Context from "../utils/context";

const AddPost = () => {
  const [images, setImages] = useState([]);
  const { authState, handleAddPost } = useContext(Context);
  const [values, setValues] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "dhsmpulab",
      tags: [tag, "anImage"],
      uploadPreset: "ln6xughb",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImages([...images, photos.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = authState.dbProfile.user_id;
    const username = authState.dbProfile.username;

    const title = values.title;
    const description = values.description;

    const image_id = images[0]; // TODO: Handle more than one image

    if (!image_id) return;

    const postData = {
      user_id,
      username,
      title,
      description,
      image_id,
    };

    handleAddPost(postData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  onChange={handleInputChange}
                  className="input"
                  type="text"
                  name="title"
                  value={values.title}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  onChange={handleInputChange}
                  className="textarea"
                  name="description"
                  value={values.description}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="file" onClick={() => beginUpload("image")}>
                <label className="file-label">
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
