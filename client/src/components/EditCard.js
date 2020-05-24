import React from "react";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

const EditCard = ({ edit }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <Image publicId={edit.image_id}></Image>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            {edit.username ? <p className="subtitle">@{edit.username}</p> : ""}
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {edit.body}
              <br />
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <h6 className="title is-6">
                      {moment(edit.date_created).fromNow().toString()}
                    </h6>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <span
                      style={{ marginRight: "5px" }}
                      className="icon is-small"
                    >
                      <i className="fas fa-heart"></i>
                    </span>
                    <strong>{edit.likes}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
