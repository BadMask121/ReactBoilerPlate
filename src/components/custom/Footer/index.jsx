import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footerContainer">
      <div className="copyright">&copy;{year} NGO</div>
      <div className="links">
        <p>
          <NavLink to="/">About</NavLink>
        </p>
        <p>
          <NavLink to="/">FAQ</NavLink>
        </p>
        <p>
          <NavLink to="/">Terms and Conditions</NavLink>
        </p>
      </div>
      <div className="social__media">
        <div>
          <i className="fa fa-twitter"></i>
        </div>
        <div>
          <i className="fa fa-linkedin" style={{ fontSize: 17 }}></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
