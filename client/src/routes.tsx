import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/router";
import Channel from "./containers/channel";
import Home from "./containers/home";
import Login from "./containers/login";
import Register from "./containers/register";
import { MeQuery, useMeQuery } from "./services/graphql/graphql";
import { userIdVar } from "./util/userId";

const Routes: React.FC = () => {
  const { loading } = useMeQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: (data: MeQuery) => {
      userIdVar(data.me!.id);
    },
  });
  if (loading) return <div>loading...</div>;
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/@me" />
          </Route>
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
