import React, { useContext, useEffect } from "react";
import Context from "../utils/context";
import PostCard from "../components/PostCard";
import EditCard from "../components/EditCard";
import { Link } from "react-router-dom";
import { openUploadWidget } from "../utils/CloudinaryService";
import { Image, Transformation } from "cloudinary-react";

/**
 * The profile component displays all of the currently logged in user's information such as
 * its posts, edits and amount of likes. The component is rendered when clicking the username button in the header.
 * The user can also change his/hers profile picture (avatar) and click any of the posts/edits that have been created by that profile.
 */
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
      return <h1>Loading...</h1>;
    }

    if (profileState.profilePosts.length === 0) {
      return (
        <p className="has-text-centered column">
          You have not submitted any posts
        </p>
      );
    }

    return profileState.profilePosts.map((post) => {
      return (
        <div key={post.post_id} className="column is-half">
          <Link to={`/post/${post.post_id}`}>
            <PostCard post={post} />
          </Link>
        </div>
      );
    });
  }

  function renderEditCards() {
    if (profileState.loadings["FETCH_PROFILE_EDITS"]) {
      return <h1>Loading...</h1>;
    }

    if (profileState.profileEdits.length === 0) {
      return (
        <p className="has-text-centered column">
          You have not submitted any edits
        </p>
      );
    }

    return profileState.profileEdits.map((edit) => {
      return (
        <div key={edit.edit_id} className="column is-half">
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
            width="64"
            height="64"
            crop="scale"
            responsiveUseBreakpoints="true"
          >
            <Transformation quality="auto" fetchFormat="auto" />
            <Transformation radius="max" />
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
              <p className="title">{profileState.profileLikes || 0}</p>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-half">
            <div
              style={{
                backgroundColor: "#e8e8e8",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <h1 className="has-text-centered title">Your posts</h1>
              <div className="columns is-multiline">{renderPostCards()}</div>
            </div>
          </div>
          <div className="column is-half">
            <div
              style={{
                backgroundColor: "#e8e8e8",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <h1 className="has-text-centered title">Your edits</h1>
              <div className="columns is-multiline">{renderEditCards()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
