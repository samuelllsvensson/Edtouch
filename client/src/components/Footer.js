import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Photoshopify</strong> by{" "}
          <a href="https://github.com/johanforslund">Johan Forslund</a> and{" "}
          <a href="https://samuelllsvensson.github.io/">Samuel Svensson</a> made
          for the course{" "}
          <a href="https://www.ida.liu.se/~TDDD27/">
            TDDD27 - Advanced web programming
          </a>{" "}
          at Linköping university 2020. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
