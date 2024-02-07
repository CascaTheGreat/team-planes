import React from "react";

const NavBar = () => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <div className="link-wrapper">
          <a href="/">Home</a>
        </div>
        <div className="link-wrapper">
          <a href="/search">Search</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
