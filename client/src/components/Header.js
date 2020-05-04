import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../utils/context";

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

  return (
    <div className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Placeholder"
          />
        </a>

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
          <Link to="/add-post" className="navbar-item">
            Add request
          </Link>
          <Link to="/" className="navbar-item">
            Contact us
          </Link>
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Find a post"
                />
              </p>
              <p className="control">
                <button className="button">Search</button>
              </p>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">{renderLoginButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
