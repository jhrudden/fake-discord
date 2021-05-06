import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/router";
import Channel from "./containers/channel";
import Home from "./containers/home";
import Login from "./containers/login";
import Register from "./containers/register";

const Routes: React.FC = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <ProtectedRoute exact path="/@me" component={Home} />
          <ProtectedRoute exact path="/channels/:id" component={Channel} />
          <Route path="/register" exact component={Register} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
