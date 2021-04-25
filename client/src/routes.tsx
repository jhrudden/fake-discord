import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/router";
import Bye from "./containers/bye";
import Home from "./containers/home";
import Login from "./containers/login";
import Register from "./containers/register";
import { useCurrentUserQuery } from "./services/graphql/graphql";

const Routes: React.FC = () => {
  const { data, loading } = useCurrentUserQuery();
  let user: any = null;
  if (loading) return <div>loading...</div>;
  if (data && data.currentUser) {
    user = data.currentUser;
  }
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute user={user} exact path="/" component={Home} />
          <ProtectedRoute user={user} exact path="/bye" component={Bye} />
          <Route path="/register" exact component={Register} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
