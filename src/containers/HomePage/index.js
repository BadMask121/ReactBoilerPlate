import React, { Component } from "react";
import HomePageView from "components/view/HomePage";

import PropTypes from "prop-types";

export default class extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <HomePageView />;
  }
}
