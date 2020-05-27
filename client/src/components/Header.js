import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";

/**
 * The header contains the buttons for the home page as well as the add post button for creating a new post request.
 * It also shows the users username and likes. This can be clicked to see your profile page.
 * Lastly there is a log out button (if signed in) or a log in button.
 */
const Header = () => {
  const context = useContext(Context);

  function renderLoginButton() {
    if (!context.authState.authenticated) {
      return (
        <button
          className="button is-primary"
          onClick={() => context.authObj.login()}
        >
          <strong>Log in</strong>
        </button>
      );
    } else {
      return (
        <button
          className="button is-light"
          onClick={() => context.authObj.logout()}
        >
          <strong>Log out</strong>
        </button>
      );
    }
  }

  function renderAddPostButton() {
    if (!context.authState.authenticated) return;
    return (
      <Link to="/add-post" className="navbar-item">
        Add post
      </Link>
    );
  }

  function renderProfileButton() {
    if (!context.authState.dbProfile || !context.authState.authenticated)
      return;

    return (
      <Link to="/profile" className="navbar-item">
        {context.authState.dbProfile.username} (
        <strong>{context.profileState.profileLikes || 0}</strong>)
      </Link>
    );
  }

  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <img src="https://i.imgur.com/7XYhAyP.png" alt="logo" width="150" />
        </div>
        <label
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          htmlFor="nav-toggle-state"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </label>
      </div>
      <input type="checkbox" id="nav-toggle-state" />

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          {renderAddPostButton()}
        </div>

        <div className="navbar-end">
          {renderProfileButton()}
          <div className="navbar-item">
            <div className="buttons">{renderLoginButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
