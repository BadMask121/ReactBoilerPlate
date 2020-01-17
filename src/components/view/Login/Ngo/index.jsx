import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "components/custom/Form/LoginForm";
const Ngo = props => {
  return (
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

Ngo.propTypes = {};

export default Ngo;
