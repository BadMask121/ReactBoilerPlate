import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginView from "components/view/Login";
export default class extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <LoginView />;
  }
}
