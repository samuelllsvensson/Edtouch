import React from "react";
import moment from "moment";
import { Image, Transformation } from "cloudinary-react";

const PostCard = ({ post }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <Image publicId={post.image_id}></Image>
        </figure>
      </div>
      <div className="card-content">
        {post.username ? (
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <Image publicId={post.avatar} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{post.title}</p>
              <p className="subtitle is-6">@{post.username}</p>
            </div>
          </div>
        ) : (
          <p className="title is-4">{post.title}</p>
        )}

        <div
          className="content"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {post.body}
          <br />
          <div className="level">
            <div className="level-left">
              <h6 className="title is-6">
                {moment(post.date_created).fromNow().toString()}
              </h6>
            </div>
            <div className="level-right">
              <h6 style={{ color: "green" }} className="title is-6">
                {post.likes}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
