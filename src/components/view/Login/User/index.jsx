import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "components/custom/Form/LoginForm";
const User = props => {
  return (
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

User.propTypes = {};

export default User;
