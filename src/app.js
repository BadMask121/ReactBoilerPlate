import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import "../public/css/donorly.css";
import Test from "./components/view/HomePage";

const Login = lazy(() => import("containers/Login"));
const HomePage = lazy(() => import("containers/HomePage"));
const App = () => {
  return (
    <Switch>
      <Suspense fallback={<div>Loading</div>}>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
      </Suspense>
    </Switch>
  );
};

export default App;
