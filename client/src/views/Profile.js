import React, { useContext, useEffect } from "react";
import Context from "../utils/context";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { fetchPhotos, openUploadWidget } from "../utils/CloudinaryService";
import { Image, Transformation } from "cloudinary-react";

const Profile = () => {
  const {
    authState,
    profileState,
    handleFetchProfilePosts,
    changeProfileAvatar,
  } = useContext(Context);

  useEffect(() => {
    handleFetchProfilePosts(authState.dbProfile.user_id);
  }, []);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "dhsmpulab",
      tags: [tag, "anImage"],
      uploadPreset: "ln6xughb",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          changeProfileAvatar({
            userId: authState.dbProfile.user_id,
            url: photos.info.public_id,
          });
        }
      } else {
        console.log(error);
      }
    });
  };

  function onChangeAvatar() {
    changeProfileAvatar({
      userId: authState.dbProfile.user_id,
      url: "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
    });
  }

  function renderPostCards() {
    if (profileState.loadings["FETCH_PROFILE_POSTS"]) {
      return (
        <div className="column is-one-quarter">
          <h1>Loading...</h1>
        </div>
      );
    }
    return profileState.profilePosts.map((post) => {
      return (
        <div key={post.post_id} className="column is-one-quarter">
          <Link to={`/post/${post.post_id}`}>
            <PostCard post={post} />{" "}
          </Link>{" "}
        </div>
      );
    });
  }

  return (
    <div className="container">
      <div className="level-left">
        <div className="level-item">
          <figure
            onClick={() => beginUpload("image")}
            className="image is-64x64"
          >
            <Image publicId={authState.dbProfile.avatar} />
          </figure>
        </div>
        <div className="level-item">
          <h2 className="subtitle">{authState.dbProfile.username}</h2>
        </div>
      </div>
      <h1 className="title">Your posts</h1>
      <div className="columns is-multiline">{renderPostCards()}</div>
    </div>
  );
};

export default Profile;
