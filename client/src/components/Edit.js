import React from "react";
// var moment = require("moment");

const Edit = (props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder"
              />
            </figure>
          </div>
          <div className="media-content">
            {/* <p className="title is-4">{props.post.title}</p> */}
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div
          className="content"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {/* {props.post.body} */}
          EDIT BODY
          <br />
          <h6 className="title is-6">
            {/* {moment(props.post.date_created).fromNow().toString()} */}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Edit;
