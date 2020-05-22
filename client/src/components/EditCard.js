import React from "react";
import { Image, Transformation } from "cloudinary-react";
var moment = require("moment");

const EditCard = ({ edit }) => {
  return (
    <div className="card">
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
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="subtitle">@{edit.username}</p>
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {edit.body}
              <br />
              <h6 className="title is-6">
                {moment(edit.date_created).fromNow().toString()}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
