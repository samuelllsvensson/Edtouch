import React, { useState, useContext } from "react";
import { openUploadWidget } from "../utils/CloudinaryService";
import Context from "../utils/context";
import { Image } from "cloudinary-react";

/**
 * The add edit button will be shown if the user is logged in below the post's information.
 * This component will send relevant information to the Cloudinary widget for image uploading.
 */
const AddEdit = ({ post_id, onChange, showAddEdit }) => {
  const [images, setImages] = useState([]);
  const { authState, handleAddEdit, handleFetchEdits } = useContext(Context);
  const [values, setValues] = useState({
    title: "",
    description: "",
    post_id: post_id,
  });

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

  function hideAddEdit() {
    onChange(!showAddEdit);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = authState.dbProfile.user_id;
    const post_id = values.post_id;
    const username = authState.dbProfile.username;

    const description = values.description;

    const image_id = images[0];

    if (!image_id) return;

    const postEdit = {
      post_id,
      user_id,
      username,
      description,
      image_id,
    };

    handleAddEdit(postEdit);
    hideAddEdit();
  };

  const renderUploadField = () => {
    if (images[0]) {
      return <Image width={"33%"} publicId={images[0]}></Image>;
    }
    return (
      <div className="field">
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
      </div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <h3 className="title">Add Edit</h3>
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
            {renderUploadField()}
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary">
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

export default AddEdit;
