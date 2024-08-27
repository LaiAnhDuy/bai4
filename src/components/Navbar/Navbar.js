import React from "react";
import { Link, useLocation } from "react-router-dom";
import { paths } from "./config";
import './index.css'

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="container d-flex justify-content-center gap-3 my-3">
      {paths.map((path) => (
        <div key={path.pageName}>
          <Link
            to={path.path}
            className={`nav-link-custom ${
              location.pathname === path.path ? "active" : ""
            }`}
          >
            {path.pageName}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
