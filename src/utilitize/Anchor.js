import React from "react";
import { NavLink } from "react-router-dom";

const Anchor = ({ children, to }) => {
  const navText =
    to === "/" ? "" : to.includes("/") ? to.split("/").join(">> ") : ">> " + to;

  function changePageTitle() {
    document.title = `cycle mart ${navText}`;
  }

  return (
    <NavLink onClick={changePageTitle} to={to}>
      {children}
    </NavLink>
  );
};

export default Anchor;
