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
            <p className="title is-4">{edit.title}</p>
            <p className="subtitle is-6">@{edit.username}</p>
            <h6 className="title is-6">
              {moment(edit.date_created).fromNow().toString()}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
