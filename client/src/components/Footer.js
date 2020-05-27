import React from "react";
/**
 * The footer displays general information about the project and the course on the bottom of the application
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Edtouch</strong> by{" "}
          <a href="https://github.com/johanforslund">Johan Forslund</a> and{" "}
          <a href="https://samuelllsvensson.github.io/">Samuel Svensson</a> made
          for the course{" "}
          <a href="https://www.ida.liu.se/~TDDD27/">
            TDDD27 - Advanced web programming
          </a>{" "}
          at Linköping university 2020.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
