import React, { useContext } from "react";
import Context from "../utils/context";

const Profile = () => {
  const { authState } = useContext(Context);

  return (
    <div className="container">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-64x64">
            <img src={authState.dbProfile.avatar} />
          </figure>
        </div>
        <div className="level-item">
          <h1 className="title">{authState.dbProfile.username}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
