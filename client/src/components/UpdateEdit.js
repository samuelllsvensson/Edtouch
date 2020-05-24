import React, { useState, useContext } from "react";
import { Image, Transformation } from "cloudinary-react";
import Context from "../utils/context";
import Edit from "./Edit";
var moment = require("moment");

const UpdateEdit = ({ edit, closeModal }) => {
  const {
    postsState,
    setIsEdit,
    handleUpdateEdit,
    handleDeleteEdit,
  } = useContext(Context);

  const [value, setValue] = useState({ description: edit.body });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (action) => {
    setIsEdit(edit.edit_id);
    if (action === "saveEdit") {
      const editData = {
        description: value,
        user_id: edit.user_id,
        post_id: edit.post_id,
        image_id: edit.image_id,
        edit_id: edit.edit_id,
      };
      console.log(editData);
      handleUpdateEdit(editData);
    }
    if (action === "deleteEdit") {
      const editData = {
        post_id: edit.post_id,
        edit_id: edit.edit_id,
      };

      handleDeleteEdit(editData);
    }
  };
  return (
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
          <strong>{edit.name}</strong> <small>@{edit.username}</small>{" "}
          <small>{moment(edit.date_created).fromNow().toString()}</small>
          <br />
          <div className="field">
            <p className="control">
              <textarea
                onChange={handleChange}
                value={value.description}
                placeholder=""
                style={{ width: "100%", height: "10vh" }}
                className="textarea is-primary"
              ></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  onClick={() => handleSubmit("saveEdit")}
                  className={`button is-info ${
                    postsState.loadings["UPDATE_EDIT"] ? "is-loading" : ""
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
                  onClick={() => {
                    handleSubmit("deleteEdit");
                    closeModal();
                  }}
                  className={`button is-small ${
                    postsState.loadings["DELETE_EDIT"] ? "is-loading" : ""
                  } is-danger`}
                >
                  Delete
                </button>
              </div>
            </div>

            <nav className="level is-mobile">
              <div className="level-right">
                <small>
                  Edit created: &nbsp;
                  {moment(edit.date_created)
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

export default UpdateEdit;
