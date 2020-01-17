import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Header from "components/custom/Header";
import Ngo from "./Ngo";
import User from "./User";
const Login = props => {
  let { path, url, isExact } = useRouteMatch();
  let { location } = useHistory();
  const [, , currentPath] = location.pathname.split("/");

  return (
    <>
      <Header />
      <div className="content">
        <div className="loginContainer">
          <div className="titleContainer">
            <p>Sign in</p>
            <div className="__nav">
              <NavLink
                to={`${url}/ngo`}
                className={(currentPath === "ngo" || isExact) && "active"}
              >
                NGO
              </NavLink>
              <NavLink
                to={`${url}/user`}
                className={currentPath === "user" && "active"}
              >
                User
              </NavLink>
            </div>
          </div>
          {isExact ? (
            <Ngo />
          ) : (
            <Switch>
              <Route exact path={`${path}/:page`}>
                {history => {
                  switch (
                    history.match.params.hasOwnProperty("page") &&
                    history.match.params.page
                  ) {
                    case "ngo":
                      return <Ngo />;
                    case "user":
                      return <User />;
                    default:
                      return <Ngo />;
                  }
                }}
              </Route>
            </Switch>
          )}
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
