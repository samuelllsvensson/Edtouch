import React, { useContext, useEffect } from "react";
import Context from "../utils/context";
import PostCard from "../components/PostCard";
import EditCard from "../components/EditCard";
import { Link } from "react-router-dom";
import { fetchPhotos, openUploadWidget } from "../utils/CloudinaryService";
import { Image, Transformation } from "cloudinary-react";

const Profile = () => {
  const {
    authState,
    profileState,
    handleFetchProfilePosts,
    handleFetchProfileEdits,
    changeProfileAvatar,
  } = useContext(Context);

  useEffect(() => {
    handleFetchProfilePosts(authState.dbProfile.user_id);
    handleFetchProfileEdits(authState.dbProfile.user_id);
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

  function renderPostCards() {
    if (profileState.loadings["FETCH_PROFILE_POSTS"]) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return profileState.profilePosts.map((post) => {
      return (
        <div key={post.post_id} className="column is-two-fifths">
          <Link to={`/post/${post.post_id}`}>
            <PostCard post={post} />
          </Link>
        </div>
      );
    });
  }

  function renderEditCards() {
    if (profileState.loadings["FETCH_PROFILE_EDITS"]) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return profileState.profileEdits.map((edit) => {
      return (
        <div key={edit.edit_id} className="column is-two-fifths">
          <Link to={`/post/${edit.post_id}?showedit=${edit.edit_id}`}>
            <EditCard edit={edit} />
          </Link>
        </div>
      );
    });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "150px",
          backgroundColor: "#00d1b2",
          marginBottom: "35px",
        }}
      >
        <figure
          style={{
            marginTop: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            top: "32px",
          }}
          onClick={() => beginUpload("image")}
          className="image is-64x64"
        >
          <Image
            publicId={authState.dbProfile.avatar}
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
      <div className="container">
        <h2 className="has-text-centered subtitle">
          {authState.dbProfile.username}
        </h2>

        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Posts</p>
              <p className="title">{profileState.profilePosts.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Edits</p>
              <p className="title">{profileState.profileEdits.length}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Likes</p>
              <p className="title">{profileState.profileLikes}</p>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6 is-flex">
            <div
              style={{
                backgroundColor: "#fafafa",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <h1 className="has-text-centered title">Your posts</h1>
              <div style={{ overflow: "scroll" }} className="columns">
                {renderPostCards()}
              </div>
            </div>
          </div>
          <div className="column is-6 is-flex">
            <div
              style={{
                backgroundColor: "#fafafa",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <h1 className="has-text-centered title">Your edits</h1>
              <div style={{ overflow: "scroll" }} className="columns">
                {renderEditCards()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
