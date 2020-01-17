import React from "react";
import { NavLink } from "react-router-dom";
const index = () => {
  return (
    <div className="navbar __header">
      <div>Logo</div>
      <div className="__items">
        <div>
          <NavLink to="/">Explore NGOs</NavLink>
        </div>
        <div>
          <NavLink to="">Volunteers</NavLink>
        </div>
        <div className="__login-btn">
          <NavLink to="/login">Login</NavLink>
        </div>
        <div className="__signup-btn">
          <NavLink to="/signup">Create NGO Profile</NavLink>
        </div>
      </div>
    </div>
  );
};

export default index;
