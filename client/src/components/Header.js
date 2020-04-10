import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/" className="navbar-item">
            Documentation
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to="/" className="button is-light">
                <strong>Log in</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
